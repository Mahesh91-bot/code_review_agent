const GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
const PRIMARY_MODEL_NAME = "qwen/qwen3-32b";
const FALLBACK_MODEL_NAME = "openai/gpt-oss-120b";

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

    const systemPrompt = `You are an expert code reviewer who has been working with this team for months. You have the following institutional knowledge about their codebase and common mistakes: ${memoryContext}. Use this knowledge to give hyper-specific feedback. Reference past mistakes you've seen. If this team has made this exact mistake before, point that out. Organize your review as: Issues (with severity), Suggestions, Team-Specific Notes, Score.`;

    const userPrompt = [
      `Filename: ${filename}`,
      `Language: ${language}`,
      "",
      "Code:",
      "```",
      code,
      "```"
    ].join("\n");

    const requestBody = {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2
    };

    console.log("Sending to Groq...");
    let response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...requestBody,
        model: PRIMARY_MODEL_NAME
      })
    });

    if (!response.ok) {
      const primaryErrorText = await response.text();
      console.error(
        `🚨 BACKEND ERROR: Primary Groq model failed (${PRIMARY_MODEL_NAME}).`,
        primaryErrorText
      );

      response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...requestBody,
          model: FALLBACK_MODEL_NAME
        })
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const reviewText = data?.choices?.[0]?.message?.content || "No review generated.";

    return {
      review: reviewText,
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
