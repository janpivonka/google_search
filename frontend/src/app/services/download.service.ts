import type { SearchResult } from "../types";

export function downloadResultsAsJSON(results: SearchResult[], query: string) {
  const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `results-${query}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}
