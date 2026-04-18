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
  return hindsightRequest("/memories", {
    content,
    metadata: {
      teamName,
      memoryType,
      createdAt: new Date().toISOString(),
      ...metadata
    }
  });
}

/**
 * Search memories for a team.
 */
async function searchMemories({ teamName, query, topK = 5 }) {
  const result = await hindsightRequest("/memories/recall", {
    query,
    top_k: topK,
    filter: {
      teamName
    }
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

module.exports = {
  storeMemory,
  searchMemories,
  getTeamMemories
};
