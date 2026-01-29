import type { SearchResult } from "../types";

// V devu (localhost) se použije /api (díky tvé proxy ve vite.config)
// V produkci (Vercel) se použije plná URL z environment variables
const isDev = import.meta.env.DEV;
const BASE_URL = isDev ? '/api' : (import.meta.env.VITE_API_URL || '');

export async function search(query: string): Promise<SearchResult[]> {
  const res = await fetch(`${BASE_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error("Failed to fetch search results");

  return res.json();
}