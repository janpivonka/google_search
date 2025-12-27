var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../app/components/App";
// Mock useSearch hook
jest.mock("../../app/hooks/useSearch", () => ({
    useSearch: () => ({
        results: [],
        loading: false,
        error: null,
        suggestions: ["test suggestion"],
        handleSearch: jest.fn(),
        fetchSuggestions: jest.fn(),
        resetResults: jest.fn(),
    }),
}));
// Mock useUI hook
jest.mock("../../app/hooks/useUI", () => ({
    useUI: () => ({
        handleTitleClick: jest.fn(),
        handleSearchWithShift: jest.fn(),
        selectSuggestion: jest.fn(),
    }),
}));
describe("App E2E", () => {
    it("renders input, button, and title", () => {
        render(_jsx(App, {}));
        expect(screen.getByPlaceholderText(/co dnes budeme hledat/i)).toBeInTheDocument();
        expect(screen.getByText(/peony google search mock/i)).toBeInTheDocument();
        expect(screen.getByText(/hledat/i)).toBeInTheDocument();
    });
    it("renders suggestion items when typing", () => {
        render(_jsx(App, {}));
        expect(screen.getByText("test suggestion")).toBeInTheDocument();
    });
    it("allows clicking on a suggestion", () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(App, {}));
        const suggestion = screen.getByText("test suggestion");
        yield userEvent.click(suggestion);
        // zde by se mohlo ověřit volání mock funkce selectSuggestion
    }));
});
