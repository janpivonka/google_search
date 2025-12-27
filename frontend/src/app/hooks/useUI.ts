export function useUI(resultsLength: number, resetResults: () => void) {
  const handleTitleClick = (setQuery: (q: string) => void) => {
    if (resultsLength === 0) return;
    const container = document.querySelector(".container");
    container?.classList.remove("shifted");
    setQuery("");
    resetResults();
  };

  const handleSearchWithShift = (query: string, handleSearch: (q: string) => void) => {
    if (!query) return;
    const container = document.querySelector(".container");
    if (container && !container.classList.contains("shifted")) {
      container.classList.add("shifted");
    }
    handleSearch(query);
  };

  const selectSuggestion = (
    suggestion: string,
    setQuery: (q: string) => void,
    fetchSuggestions: (q: string) => void,
    handleSearchWithShift: (q: string, handleSearch: (q: string) => void) => void,
    handleSearch: (q: string) => void
  ) => {
    setQuery(suggestion);
    fetchSuggestions("");
    handleSearchWithShift(suggestion, handleSearch);
  };

  return { handleTitleClick, handleSearchWithShift, selectSuggestion };
}
