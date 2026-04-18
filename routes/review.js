const express = require("express");
const { randomUUID } = require("crypto");
const {
  storeMemory,
  searchMemories,
  getTeamMemories
} = require("../services/hindsight");
const { reviewCodeWithGroq } = require("../services/llm");

const router = express.Router();

function inferSeverityFromReview(reviewText) {
  const lowered = (reviewText || "").toLowerCase();
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

function inferPatternFromReview(reviewText) {
  const firstLine = (reviewText || "")
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
    const severity = inferSeverityFromReview(reviewResult.review);
    const pattern = inferPatternFromReview(reviewResult.review);

    // 3) Save this review back into memory so future reviews improve.
    await storeMemory({
      teamName,
      memoryType: "code_issue",
      content: [
        `Team ${teamName} recurring issue in ${filename} (${language}).`,
        `Pattern: ${pattern}`,
        `Severity: ${severity}`,
        "Summary of reviewer findings recorded for future team-specific recall."
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
      review: reviewResult.review,
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
 * Saves user feedback so the agent gets better over time.
 */
router.post("/feedback", async (req, res) => {
  try {
    const { reviewId, wasHelpful, corrections, teamName } = req.body;

    if (!reviewId || typeof wasHelpful !== "boolean") {
      return res.status(400).json({
        error: "Missing required fields. Expected: reviewId, wasHelpful (boolean)."
      });
    }

    await storeMemory({
      // teamName is optional here because the requested payload does not require it.
      // If missing, we still store the feedback under a shared bucket.
      teamName: teamName || "unknown-team",
      memoryType: !wasHelpful || corrections ? "correction" : "feedback",
      content: [
        `Feedback for Review ID: ${reviewId}`,
        `Helpful: ${wasHelpful}`,
        `Corrections: ${corrections || "No corrections provided"}`
      ].join("\n"),
      metadata: {
        type: !wasHelpful || corrections ? "correction" : "feedback",
        teamName: teamName || "unknown-team",
        pattern: corrections || "General feedback on review quality.",
        severity: !wasHelpful ? "high" : "low",
        timestamp: new Date().toISOString(),
        reviewId,
        wasHelpful
      }
    });

    return res.status(200).json({
      message: "Feedback saved successfully."
    });
  } catch (error) {
    console.error("🚨 BACKEND ERROR:", error);
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
