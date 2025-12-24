import { Router } from "express";
import { search } from "../services/search.service";
import { fetchSuggestions } from "../services/suggestions";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Backend běží" });
});

router.post("/", async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const data = await search(query);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});

router.get("/suggestions", async (req, res) => {
  const q = req.query.q as string;
  if (!q) return res.json([]);

  try {
    const suggestions = await fetchSuggestions(q);
    res.json(suggestions);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
});

export default router;
