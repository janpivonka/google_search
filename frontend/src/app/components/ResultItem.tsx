// frontend/src/app/components/ResultItem.tsx
import type { SearchResult } from "../types";
import type { MouseEvent } from "react";
import { useState } from "react";

interface Props {
  result: SearchResult;
  index: number;
}

export function ResultItem({ result, index }: Props) {
  const [loaded, setLoaded] = useState(false);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(result.url, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={result.url}
      className="result-item clickable"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={handleClick}
    >
      {result.image && (
        <img
          src={result.image}
          alt={result.title}
          className={`result-image ${loaded ? "fade-in" : ""}`}
          onLoad={() => setLoaded(true)}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
      <div className="result-text">
        <div className="result-title">{result.title}</div>
        <div className="result-link">{result.url}</div>
        <p className="result-snippet">{result.description}</p>
      </div>
    </a>
  );
}
