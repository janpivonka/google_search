// backend/src/services/search.service.ts
import fetch from "node-fetch";
import he from "he";
import { fetchImageForResult } from "./googleImages";

export interface SearchResult {
  position: number;
  title: string;
  url: string;
  description: string;
  image?: string;
}

export async function search(query: string) {
  const serpRes = await fetch(
    `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(
      query
    )}&api_key=${process.env.SERP_API_KEY}&num=12`
  );

  const serpData = await serpRes.json();

  const results: SearchResult[] = (serpData.organic_results || []).map(
    (item: any) => ({
      position: item.position,
      title: he.decode(item.title),
      url: item.link,
      description: he.decode(item.snippet || ""),
      image: undefined,
    })
  );

  // fallback na "/placeholder.png" pokud fetchImageForResult vrátí null/undefined nebo při chybě
  await Promise.all(
    results.map(async (item) => {
      try {
        const image = await fetchImageForResult(
          `${item.title} ${item.description}`
        );
        item.image = image || "/placeholder.png";
      } catch (err) {
        console.error("Image fetch failed for:", item.title, err);
        item.image = "/placeholder.png";
      }
    })
  );

  return {
    source: "google",
    page: 1,
    type: "organic",
    query,
    results,
  };
}
