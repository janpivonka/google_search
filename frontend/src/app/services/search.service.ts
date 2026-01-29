import type { SearchResult } from "../types";

// ✅ Sjednocená URL (bez lomítka na konci)
const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://google-search-backend-mu.vercel.app';

export async function search(query: string): Promise<SearchResult[]> {
  const res = await fetch(`${BACKEND_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error("Failed to fetch search results");
  return res.json();
}

export async function getSuggestions(query: string): Promise<string[]> {
  // ✅ fetch automaticky posílá GET, pokud není řečeno jinak
  const res = await fetch(`${BACKEND_URL}/search/suggestions?q=${encodeURIComponent(query)}`);

  if (!res.ok) throw new Error("Suggestions fetch failed");
  return res.json();
}