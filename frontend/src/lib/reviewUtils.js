export const API_BASE_URL = "http://localhost:3001";

/** Absolute URL for feedback so submissions always hit the Express API (avoids relative /api on Vite). */
export const FEEDBACK_API_URL = "http://localhost:3001/api/feedback";

export const TEAM_NAME_STORAGE_KEY = "sage_team_name";

/** Canonical empty shape from POST /api/review. */
export const EMPTY_STRUCTURED_REVIEW = {
  issues: [],
  suggestions: [],
  teamNotes: [],
  score: "N/A"
};

/**
 * Normalize API `review` field (object or legacy JSON string) into arrays + score.
 */
export function normalizeStructuredReview(review) {
  if (!review) {
    return { ...EMPTY_STRUCTURED_REVIEW };
  }
  let obj = review;
  if (typeof review === "string") {
    try {
      obj = JSON.parse(review);
    } catch {
      return { ...EMPTY_STRUCTURED_REVIEW };
    }
  }
  if (typeof obj !== "object" || obj === null) {
    return { ...EMPTY_STRUCTURED_REVIEW };
  }

  const toArr = (v) => {
    if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
    if (v != null && String(v).trim()) return [String(v).trim()];
    return [];
  };

  return {
    issues: toArr(obj.issues),
    suggestions: toArr(obj.suggestions),
    teamNotes: toArr(obj.teamNotes ?? obj.team_notes),
    score: obj.score != null && String(obj.score).trim() ? String(obj.score).trim() : "N/A"
  };
}

/**
 * Build markdown for the detail panel from structured review.
 */
export function formatStructuredReviewAsMarkdown(review) {
  const r = normalizeStructuredReview(review);
  const lines = ["## Issues", ""];
  if (r.issues.length === 0) lines.push("_No issues listed._", "");
  else r.issues.forEach((i) => lines.push(`- ${i}`));
  lines.push("", "## Suggestions", "");
  if (r.suggestions.length === 0) lines.push("_No suggestions listed._", "");
  else r.suggestions.forEach((s) => lines.push(`- ${s}`));
  lines.push("", "## Team notes", "");
  if (r.teamNotes.length === 0) lines.push("_No team notes listed._", "");
  else r.teamNotes.forEach((n) => lines.push(`- ${n}`));
  lines.push("", "## Score", "", r.score);
  return lines.join("\n");
}

export const INITIAL_FORM = {
  teamName: "",
  language: "JavaScript",
  filename: "",
  code: ""
};

export const DEMO_SAMPLE = {
  teamName: "Payments Team",
  language: "JavaScript",
  filename: "checkoutController.js",
  code: `async function processCheckout(req, res) {
  const userId = req.body.userId;
  const cartTotal = req.body.cartTotal;

  if (!userId) {
    res.status(400).json({ error: "Missing user" });
  }

  const user = await db.users.findById(userId);
  if (user.isBlocked) {
    return res.status(403).json({ error: "Blocked user" });
  }

  // TODO: improve this logic
  if (cartTotal > 1000) {
    await db.auditLogs.insert({ userId, reason: "high value checkout" });
  }

  const result = await paymentGateway.charge({
    userId,
    amount: cartTotal
  });

  return res.json({ ok: true, paymentId: result.id });
}`
};

export function extractSection(markdown, headingText) {
  if (!markdown) return "";

  const escapedHeading = headingText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sectionRegex = new RegExp(
    `(?:^|\\n)#{1,6}\\s*${escapedHeading}\\s*\\n([\\s\\S]*?)(?=\\n#{1,6}\\s|$)`,
    "i"
  );
  const match = markdown.match(sectionRegex);
  return match?.[1]?.trim() || "";
}

export function extractFirstSection(markdown, headings) {
  for (const h of headings) {
    const text = extractSection(markdown, h);
    if (text) return text;
  }
  return "";
}

export function parseReviewSections(reviewMarkdown) {
  const issues = extractFirstSection(reviewMarkdown, [
    "Issues (with severity)",
    "Issues Found",
    "Issues"
  ]);
  const suggestions = extractFirstSection(reviewMarkdown, ["Suggestions"]);
  const teamNotes = extractFirstSection(reviewMarkdown, [
    "Team-Specific Notes",
    "Standards Violations"
  ]);

  const scoreSection = extractFirstSection(reviewMarkdown, ["Score"]);
  let overallScore = "N/A";
  if (scoreSection) {
    const m = scoreSection.match(/([1-9]|10)(?:\s*\/\s*10)?/);
    if (m) overallScore = m[1];
  }
  if (overallScore === "N/A") {
    const scoreMatch = reviewMarkdown.match(
      /overall\s*score[^0-9]*([1-9]|10)(?:\s*\/\s*10)?/i
    );
    overallScore = scoreMatch?.[1] || "N/A";
  }

  return { issues, suggestions, standards: teamNotes, overallScore };
}
