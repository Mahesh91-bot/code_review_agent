export const API_BASE_URL = "http://localhost:3001";

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
