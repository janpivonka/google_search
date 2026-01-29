import type { SearchResult } from "../types";

// 1. Definujeme adresu natvrdo, dokud nezjistíme, proč Vercel nebere proměnné
// Vyměň 'https://tvuj-novy-backend.vercel.app' za skutečnou URL, kterou ti dal Vercel pro backend
const BACKEND_URL = 'https://google-search-backend-mu.vercel.app/';

export async function search(query: string): Promise<SearchResult[]> {
  // 2. Použijeme BACKEND_URL přímo v fetch
  const res = await fetch(`${BACKEND_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error("Failed to fetch search results");
  return res.json();
}

// Pokud máš v tomto souboru i funkci pro suggestions, uprav ji stejně:
export async function getSuggestions(query: string): Promise<string[]> {
  const res = await fetch(`${BACKEND_URL}/search/suggestions?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Suggestions fetch failed");
  return res.json();
}