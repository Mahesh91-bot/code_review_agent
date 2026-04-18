const express = require("express");
const { randomUUID } = require("crypto");
const {
  storeMemory,
  searchMemories,
  getTeamMemories
} = require("../services/hindsight");
const { reviewCodeWithGroq } = require("../services/llm");

const router = express.Router();

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
      query: `Past mistakes and coding standards for ${language} in ${filename}`,
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

    // 3) Save this review back into memory so future reviews improve.
    await storeMemory({
      teamName,
      memoryType: "review",
      content: [
        `Review ID: ${reviewId}`,
        `Filename: ${filename}`,
        `Language: ${language}`,
        "Generated Review:",
        reviewResult.review
      ].join("\n"),
      metadata: {
        reviewId,
        filename,
        language
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
      memoryType: "feedback",
      content: [
        `Feedback for Review ID: ${reviewId}`,
        `Helpful: ${wasHelpful}`,
        `Corrections: ${corrections || "No corrections provided"}`
      ].join("\n"),
      metadata: {
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
