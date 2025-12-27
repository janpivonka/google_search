import { useUI } from "../../app/hooks/useUI";

describe("useUI hook", () => {
  let resetResultsMock: jest.Mock;

  beforeEach(() => {
    resetResultsMock = jest.fn();
  });

  it("handleTitleClick should reset query and results", () => {
    const { handleTitleClick } = useUI(1, resetResultsMock);
    const setQueryMock = jest.fn();

    document.body.innerHTML = `<div class="container shifted"></div>`;
    handleTitleClick(setQueryMock);

    const container = document.querySelector(".container");
    expect(container?.classList.contains("shifted")).toBe(false);
    expect(setQueryMock).toHaveBeenCalledWith("");
    expect(resetResultsMock).toHaveBeenCalled();
  });

  it("handleSearchWithShift should add class and call handleSearch", () => {
    const { handleSearchWithShift } = useUI(0, resetResultsMock);
    const handleSearchMock = jest.fn();
    const query = "test query";

    document.body.innerHTML = `<div class="container"></div>`;
    const container = document.querySelector(".container");

    handleSearchWithShift(query, handleSearchMock);

    expect(container?.classList.contains("shifted")).toBe(true);
    expect(handleSearchMock).toHaveBeenCalledWith(query);
  });

  it("selectSuggestion should update query, clear suggestions and call handleSearchWithShift", () => {
    const { selectSuggestion } = useUI(0, resetResultsMock);
    const setQueryMock = jest.fn();
    const fetchSuggestionsMock = jest.fn();
    const handleSearchWithShiftMock = jest.fn();
    const handleSearchMock = jest.fn();

    const suggestion = "my suggestion";

    selectSuggestion(
      suggestion,
      setQueryMock,
      fetchSuggestionsMock,
      handleSearchWithShiftMock,
      handleSearchMock
    );

    expect(setQueryMock).toHaveBeenCalledWith(suggestion);
    expect(fetchSuggestionsMock).toHaveBeenCalledWith("");
    expect(handleSearchWithShiftMock).toHaveBeenCalledWith(suggestion, handleSearchMock);
  });
});
