const GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
const PRIMARY_MODEL_NAME = "qwen/qwen3-32b";
const FALLBACK_MODEL_NAME = "openai/gpt-oss-120b";

const JSON_REVIEW_FORMAT = `{ "issues": ["issue 1"], "suggestions": ["sugg 1"], "teamNotes": ["note 1"], "score": "90/100" }`;

/**
 * Strip optional ```json fences if the model disobeys formatting.
 */
function stripMarkdownFences(text) {
  let t = String(text || "").trim();
  if (t.startsWith("```")) {
    const openEnd = t.indexOf("\n");
    const close = t.lastIndexOf("```");
    if (close > 0 && close !== t.indexOf("```")) {
      t = t.slice(openEnd >= 0 ? openEnd + 1 : 0, close);
    } else {
      t = t.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/s, "");
    }
  }
  return t.trim();
}

function toStringArray(value) {
  if (Array.isArray(value)) {
    return value.map((x) => String(x).trim()).filter(Boolean);
  }
  if (value != null && String(value).trim()) {
    return [String(value).trim()];
  }
  return [];
}

/**
 * Parse Groq message content into the canonical review object.
 */
function parseGroqReviewJson(content) {
  const stripped = stripMarkdownFences(content);
  let obj;
  try {
    obj = JSON.parse(stripped);
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Model did not return valid JSON (${errMsg}). First chars: ${stripped.slice(0, 160)}`
    );
  }

  return {
    issues: toStringArray(obj.issues),
    suggestions: toStringArray(obj.suggestions),
    teamNotes: toStringArray(obj.teamNotes ?? obj.team_notes),
    score: obj.score != null && String(obj.score).trim() ? String(obj.score).trim() : "N/A"
  };
}

/**
 * Convert raw memory search results into readable prompt text.
 */
function buildMemoryContext(memories) {
  const candidates = memories?.results || memories?.data || memories?.memories || [];

  if (!Array.isArray(candidates) || candidates.length === 0) {
    return "No past team memories found.";
  }

  return candidates
    .map((item, index) => {
      const memoryText =
        item.content || item.text || item.memory || JSON.stringify(item);
      return `${index + 1}. ${memoryText}`;
    })
    .join("\n");
}

/**
 * Ask Groq for a code review, enriched with the team's learned history.
 */
async function reviewCodeWithGroq({
  code,
  language,
  filename,
  teamName,
  memorySearchResult
}) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error("Missing GROQ_API_KEY in environment variables.");
    }

    const memoryContext = buildMemoryContext(memorySearchResult);

    const systemPrompt = [
      "You are an expert code reviewer who has been working with this team for months.",
      `Institutional knowledge about their codebase and common mistakes:\n${memoryContext}`,
      "Use this knowledge to give hyper-specific feedback. Reference past mistakes when relevant.",
      "",
      "You must respond ONLY with a valid JSON object in this exact format:",
      JSON_REVIEW_FORMAT,
      "Use string arrays for issues, suggestions, and teamNotes (each item one concise string).",
      "score must be a string like \"8/10\" or \"85/100\" reflecting overall quality.",
      "Do not wrap the JSON in markdown formatting. Do not add any text before or after the JSON object."
    ].join("\n");

    const userPrompt = [
      `Filename: ${filename}`,
      `Language: ${language}`,
      "",
      "Code:",
      "```",
      code,
      "```"
    ].join("\n");

    const baseRequestBody = {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2
    };

    async function callGroq(modelName, extra = {}) {
      return fetch(GROQ_CHAT_COMPLETIONS_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...baseRequestBody,
          ...extra,
          model: modelName
        })
      });
    }

    console.log("Sending to Groq...");
    const attempts = [
      { model: PRIMARY_MODEL_NAME, extra: { response_format: { type: "json_object" } } },
      { model: FALLBACK_MODEL_NAME, extra: { response_format: { type: "json_object" } } },
      { model: PRIMARY_MODEL_NAME, extra: {} },
      { model: FALLBACK_MODEL_NAME, extra: {} }
    ];

    let response;
    let lastErrorText = "";
    for (let i = 0; i < attempts.length; i += 1) {
      const { model, extra } = attempts[i];
      response = await callGroq(model, extra);
      if (response.ok) break;
      lastErrorText = await response.text();
      if (i === 1) {
        console.warn(
          "Groq json_object mode failed; retrying without response_format if needed."
        );
      }
      console.error(`🚨 Groq attempt ${i + 1} failed (${model}):`, lastErrorText);
    }

    if (!response.ok) {
      throw new Error(`Groq API error (${response.status}): ${lastErrorText}`);
    }

    const data = await response.json();
    const rawContent = data?.choices?.[0]?.message?.content;
    if (!rawContent || !String(rawContent).trim()) {
      throw new Error("Groq returned an empty review message.");
    }

    const review = parseGroqReviewJson(rawContent);

    return {
      review,
      raw: data
    };
  } catch (error) {
    console.error("🚨 BACKEND ERROR:", error);
    throw error;
  }
}

module.exports = {
  reviewCodeWithGroq
};
