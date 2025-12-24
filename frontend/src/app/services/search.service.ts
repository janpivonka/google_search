import type { SearchResult } from "../types";

const API_URL = '/api/search';

export async function search(query: string): Promise<SearchResult[]> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error("Failed to fetch search results");

  return res.json();
}
