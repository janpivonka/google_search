// frontend/src/app/components/App.tsx
import { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { downloadResultsAsJSON } from "../services/download.service";
import { ResultItem } from "./ResultItem";
import { useUI } from "../hooks/useUI";

export default function App() {
  const [query, setQuery] = useState("");
  const { results, loading, error, suggestions, handleSearch, fetchSuggestions, resetResults } = useSearch();
  const { handleTitleClick, handleSearchWithShift, selectSuggestion } = useUI(results.length, resetResults);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.classList.add("pulse-once");
    setTimeout(() => input.classList.remove("pulse-once"), 800);
  };

  return (
    <>
      {/* Loader */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}

      <div className="container">
        {/* Title */}
        <h1
          className={`title ${results.length > 0 ? "title-clickable" : ""}`}
          onClick={() => handleTitleClick(setQuery)}
        >
          Peony Google Search Mock
        </h1>

        {/* Search bar */}
        <div className="search-bar-wrapper">
          <div className="search-bar">
            <div className="input-wrapper">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
                onFocus={handleFocus}
                onKeyDown={(e) => e.key === "Enter" && handleSearchWithShift(query, handleSearch)}
                aria-label="search-input"
                placeholder="Co dnes budeme hledat?"
                className="search-input clickable"
              />
              {/* Suggestions */}
              {suggestions.length > 0 && (
                <ul className="suggestions-list open">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="suggestion-item clickable"
                      onClick={() =>
                        selectSuggestion(s, setQuery, fetchSuggestions, handleSearchWithShift, handleSearch)
                      }
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button onClick={() => handleSearchWithShift(query, handleSearch)}
            aria-label="search-button"
            className="search-button clickable">
              Hledat
            </button>
          </div>
        </div>

        {/* Error */}
        {error && <p className="error">{error}</p>}

        {/* Results */}
        {results.length > 0 && (
          <>
            <div className="results">
              {results.map((r, i) => (
                <ResultItem key={i} result={r} index={i} />
              ))}
            </div>

            <button onClick={() => downloadResultsAsJSON(results, query)} className="download-button clickable">
              Stáhnout JSON
            </button>
          </>
        )}
      </div>
    </>
  );
}
