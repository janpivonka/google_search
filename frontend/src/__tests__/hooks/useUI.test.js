// src/__tests__/hooks/useUI.test.ts
import { useUI } from "../../app/hooks/useUI";
describe("useUI hook", () => {
    let resetResultsMock;
    beforeEach(() => {
        resetResultsMock = jest.fn();
    });
    it("handleTitleClick should reset query and results", () => {
        const { handleTitleClick } = useUI(1, resetResultsMock);
        const setQueryMock = jest.fn();
        // Přidáme container do documentu pro test
        document.body.innerHTML = `<div class="container shifted"></div>`;
        handleTitleClick(setQueryMock);
        const container = document.querySelector(".container");
        expect(container === null || container === void 0 ? void 0 : container.classList.contains("shifted")).toBe(false);
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
        expect(container === null || container === void 0 ? void 0 : container.classList.contains("shifted")).toBe(true);
        expect(handleSearchMock).toHaveBeenCalledWith(query);
    });
    it("selectSuggestion should update query, clear suggestions and call handleSearchWithShift", () => {
        const { selectSuggestion } = useUI(0, resetResultsMock);
        const setQueryMock = jest.fn();
        const fetchSuggestionsMock = jest.fn();
        const handleSearchWithShiftMock = jest.fn();
        const handleSearchMock = jest.fn();
        const suggestion = "my suggestion";
        selectSuggestion(suggestion, setQueryMock, fetchSuggestionsMock, handleSearchWithShiftMock, handleSearchMock);
        expect(setQueryMock).toHaveBeenCalledWith(suggestion);
        expect(fetchSuggestionsMock).toHaveBeenCalledWith(""); // vyčistí dropdown
        expect(handleSearchWithShiftMock).toHaveBeenCalledWith(suggestion, handleSearchMock);
    });
});
