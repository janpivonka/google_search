import fetch from "node-fetch";

export async function fetchSuggestions(q: string): Promise<string[]> {
  if (!q || !q.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(q)}`
    );

    if (!response.ok) {
      throw new Error("Suggestions request failed");
    }

    const buffer = await response.arrayBuffer();
    const text = Buffer.from(buffer).toString("latin1");
    const data = JSON.parse(text);

    return data[1] || [];
  } catch (err) {
    throw new Error("Suggestions request failed");
  }
}
