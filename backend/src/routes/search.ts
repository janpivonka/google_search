import { Router, Request, Response } from "express";
import fetch from "node-fetch";
import he from "he";

interface SearchResult {
  position: number;
  title: string;
  url: string;
  description: string;
  image?: string;
}

const router = Router();

// info endpoint
router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Backend běží, použij POST /search s JSON tělem { query: '...' }",
  });
});

// hlavní vyhledávání přes SerpAPI + obrázky přes Google API
router.post("/", async (req: Request, res: Response) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    // 1️⃣ SerpAPI
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
        image: undefined, // doplníme později
      })
    );

    // 2️⃣ Dohledání obrázků přes Google API (asynchronně)
    await Promise.all(
      results.map(async (item) => {
        try {
          const queryImage = encodeURIComponent(
            `${item.title} ${item.description} site:${new URL(item.url).hostname}`
          );
          const imgRes = await fetch(
            `https://www.googleapis.com/customsearch/v1?q=${queryImage}&cx=${process.env.GOOGLE_CX}&searchType=image&num=1&key=${process.env.GOOGLE_API_KEY}`
          );
          const imgData = await imgRes.json();
          const imageUrl = imgData.items?.[0]?.link;
          if (imageUrl) item.image = imageUrl;
        } catch (err) {
          console.error("Image fetch failed for:", item.title, err);
        }
      })
    );

    res.json({ source: "google", page: 1, type: "organic", query, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});

// autocomplete suggestions
router.get("/suggestions", async (req: Request, res: Response) => {
  const q = req.query.q as string;
  if (!q) return res.json([]);

  try {
    const response = await fetch(
      `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
        q
      )}`
    );
    const buffer = await response.arrayBuffer();
    const text = Buffer.from(buffer).toString("latin1");
    const data = JSON.parse(text);
    const suggestions: string[] = data[1] || [];
    res.json(suggestions);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
});

export default router;
