import { useState, useRef } from "react";
import type { SearchResult } from "../types";

// Dynamicky nastavíme API URL podle prostředí
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://googlesearch-production.up.railway.app"
    : "http://localhost:3001";

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async (query: string) => {
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Backend error");

      setResults(data.results || []);
      setSuggestions([]);
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = (query: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (!query) return setSuggestions([]);
      try {
        const res = await fetch(
          `${API_URL}/search/suggestions?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setSuggestions(data || []);
      } catch (err) {
        console.error("Suggestions fetch failed:", err);
        setSuggestions([]);
      }
    }, 300);
  };

  const resetResults = () => {
    setResults([]);
    setError(null);
    setSuggestions([]);
  };

  return {
    results,
    loading,
    error,
    suggestions,
    handleSearch,
    fetchSuggestions,
    resetResults,
  };
}
