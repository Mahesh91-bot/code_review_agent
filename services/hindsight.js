const HINDSIGHT_BASE_URL = "https://api.hindsight.vectorize.io/v1";

/**
 * Small helper for making authenticated requests to Hindsight.
 */
async function hindsightRequest(path, body) {
  try {
    const apiKey = process.env.HINDSIGHT_API_KEY;
    const bankId = process.env.HINDSIGHT_BANK_ID;

    if (!apiKey || !bankId) {
      throw new Error(
        "Missing Hindsight environment variables. Check HINDSIGHT_API_KEY and HINDSIGHT_BANK_ID."
      );
    }

    // Hindsight v1 expects the bank ID in the URL path.
    const bankScopedBaseUrl = `${HINDSIGHT_BASE_URL}/default/banks/${bankId}`;

    const response = await fetch(`${bankScopedBaseUrl}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hindsight API error (${response.status}): ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error("🚨 BACKEND ERROR:", error);
    throw error;
  }
}

/**
 * Save one memory item for a team.
 */
async function storeMemory({ teamName, content, memoryType, metadata = {} }) {
  const memoryContentString = content;
  const resolvedType = metadata.type || memoryType || "note";
  const metadataObject = {
    teamName,
    type: resolvedType,
    timestamp: metadata.timestamp || new Date().toISOString(),
    ...metadata
  };

  return hindsightRequest("/memories", {
    items: [
      {
        content: memoryContentString,
        metadata: metadataObject
      }
    ]
  });
}

/**
 * Search memories for a team.
 */
async function searchMemories({ teamName, language, query, topK = 5 }) {
  const filter = {
    teamName
  };

  // Include language as a filter when available to retrieve tech-stack-specific memories.
  if (language) {
    filter.language = language;
  }

  const result = await hindsightRequest("/memories/recall", {
    query,
    top_k: topK,
    filter
  });

  return result;
}

/**
 * Return what the agent has learned for a team.
 * We search for broad keywords to retrieve standards, mistakes, and feedback.
 */
async function getTeamMemories(teamName) {
  const result = await searchMemories({
    teamName,
    query: "coding standards mistakes bugs style feedback review",
    topK: 50
  });

  return result;
}

/** Alias for callers that expect `saveMemory`; same as `storeMemory`. */
const saveMemory = storeMemory;

module.exports = {
  storeMemory,
  saveMemory,
  searchMemories,
  getTeamMemories
};
