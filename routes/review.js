const express = require("express");
const { randomUUID } = require("crypto");
const {
  storeMemory,
  saveMemory,
  searchMemories,
  getTeamMemories
} = require("../services/hindsight");
const { reviewCodeWithGroq } = require("../services/llm");

const router = express.Router();

function reviewObjectToPlainText(review) {
  if (!review || typeof review !== "object") {
    return String(review || "");
  }
  const parts = [
    ...(Array.isArray(review.issues) ? review.issues : []),
    ...(Array.isArray(review.suggestions) ? review.suggestions : []),
    ...(Array.isArray(review.teamNotes) ? review.teamNotes : [])
  ];
  return parts.join("\n");
}

function inferSeverityFromReview(review) {
  const lowered = reviewObjectToPlainText(review).toLowerCase();
  if (
    lowered.includes("critical") ||
    lowered.includes("security") ||
    lowered.includes("vulnerability") ||
    lowered.includes("high")
  ) {
    return "high";
  }
  if (lowered.includes("medium") || lowered.includes("warning")) {
    return "medium";
  }
  return "low";
}

function inferPatternFromReview(review) {
  if (review && typeof review === "object" && Array.isArray(review.issues)) {
    const first = review.issues.find((line) => String(line).trim().length > 0);
    if (first) return String(first).trim();
  }
  const text = reviewObjectToPlainText(review);
  const firstLine = text
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0);

  return firstLine || "General code-quality and standards issues found.";
}

/**
 * POST /api/review
 * Accepts code and returns an AI review that uses team memory context.
 */
router.post("/review", async (req, res) => {
  try {
    const { code, language, filename, teamName } = req.body;

    if (!code || !language || !filename || !teamName) {
      return res.status(400).json({
        error: "Missing required fields. Expected: code, language, filename, teamName."
      });
    }

    // 1) Retrieve memories so the review can learn from team history.
    const memories = await searchMemories({
      teamName,
      language,
      query: [
        `Team: ${teamName}`,
        `Language: ${language}`,
        `Filename: ${filename}`,
        "Recall past mistakes, coding standards, and recurring bug patterns for this stack."
      ].join(" | "),
      topK: 8
    });

    // 2) Ask Groq to review code with memory context included in system prompt.
    const reviewResult = await reviewCodeWithGroq({
      code,
      language,
      filename,
      teamName,
      memorySearchResult: memories
    });

    const reviewId = randomUUID();
    const review = reviewResult.review;
    const severity = inferSeverityFromReview(review);
    const pattern = inferPatternFromReview(review);

    const memorySummaryLines = [
      ...(Array.isArray(review.issues) ? review.issues.map((i) => `Issue: ${i}`) : []),
      ...(Array.isArray(review.suggestions)
        ? review.suggestions.map((s) => `Suggestion: ${s}`)
        : []),
      ...(Array.isArray(review.teamNotes)
        ? review.teamNotes.map((n) => `Team note: ${n}`)
        : [])
    ];

    // 3) Save this review back into memory so future reviews improve.
    await storeMemory({
      teamName,
      memoryType: "code_issue",
      content: [
        `Team ${teamName} recurring issue in ${filename} (${language}).`,
        `Pattern: ${pattern}`,
        `Severity: ${severity}`,
        `Score: ${review.score || "N/A"}`,
        memorySummaryLines.length > 0
          ? memorySummaryLines.join("\n")
          : "Summary of reviewer findings recorded for future team-specific recall."
      ].join("\n"),
      metadata: {
        type: "code_issue",
        teamName,
        language,
        pattern,
        severity,
        timestamp: new Date().toISOString(),
        filename,
        reviewId
      }
    });

    return res.status(200).json({
      reviewId,
      teamName,
      review: {
        issues: review.issues || [],
        suggestions: review.suggestions || [],
        teamNotes: review.teamNotes || [],
        score: review.score != null ? String(review.score) : "N/A"
      },
      memoriesUsed: memories?.results?.length || memories?.data?.length || 0
    });
  } catch (error) {
    console.error("🚨 BACKEND ERROR:", error);
    return res.status(500).json({
      error: "Failed to generate code review.",
      details: error.message
    });
  }
});

/**
 * POST /api/feedback
 * Saves user corrections to Hindsight (and optional thumbs-up ack without a memory write).
 * Body: teamName, language, originalIssue, correction (required for corrections),
 *       optional reviewId, wasHelpful for UI flows.
 */
router.post("/feedback", async (req, res) => {
  try {
    const {
      teamName,
      language,
      originalIssue,
      correction,
      reviewId,
      wasHelpful
    } = req.body;

    const correctionText =
      correction !== undefined && correction !== null
        ? String(correction).trim()
        : "";

    const hasCorrection = correctionText.length > 0;

    if (!hasCorrection) {
      if (wasHelpful === true) {
        return res.status(200).json({
          message: "Thanks — glad this review was helpful.",
          savedToMemory: false
        });
      }
      if (wasHelpful === false) {
        return res.status(400).json({
          error:
            "When the review needs work, please add a correction explaining what the agent should learn."
        });
      }
      return res.status(400).json({
        error:
          "Send wasHelpful (boolean) or a non-empty correction. For thumbs down, include correction text."
      });
    }

    const resolvedTeam = (teamName && String(teamName).trim()) || "unknown-team";
    const resolvedLanguage = (language && String(language).trim()) || "Unknown";
    const resolvedIssue =
      (originalIssue && String(originalIssue).trim()) ||
      "Original issue context not provided.";

    const timestamp = new Date().toISOString();
    const memoryContent = `Correction: ${correctionText}. Original context: ${resolvedIssue}`;
    const memoryMetadata = {
      type: "correction",
      teamName: resolvedTeam,
      language: resolvedLanguage,
      timestamp
    };

    await saveMemory({
      teamName: resolvedTeam,
      memoryType: "correction",
      content: memoryContent,
      metadata: memoryMetadata
    });

    return res.status(200).json({
      message: "Correction saved. The agent will learn from this.",
      savedToMemory: true,
      reviewId: reviewId || undefined
    });
  } catch (error) {
    console.error("🚨 FEEDBACK ERROR:", error);
    return res.status(500).json({
      error: "Failed to save feedback.",
      details: error.message
    });
  }
});

/**
 * GET /api/memories/:teamName
 * Returns the stored learning context for a specific team.
 */
router.get("/memories/:teamName", async (req, res) => {
  try {
    const { teamName } = req.params;

    if (!teamName) {
      return res.status(400).json({
        error: "Missing teamName in route parameter."
      });
    }

    const memories = await getTeamMemories(teamName);
    return res.status(200).json({
      teamName,
      memories
    });
  } catch (error) {
    console.error("🚨 BACKEND ERROR:", error);
    return res.status(500).json({
      error: "Failed to fetch team memories.",
      details: error.message
    });
  }
});

module.exports = router;
