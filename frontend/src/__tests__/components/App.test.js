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
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../app/components/App";
// --- Mock fetch ---
const mockResults = [
    {
        title: "Test result 1",
        url: "https://example.com/1",
        description: "Description 1",
        image: "https://example.com/image1.png",
    },
    {
        title: "Test result 2",
        url: "https://example.com/2",
        description: "Description 2",
        image: "",
    },
];
global.fetch = jest.fn((url, options) => {
    if (url.includes("/search/suggestions")) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(["suggestion1", "suggestion2"]),
        });
    }
    return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: mockResults }),
    });
});
describe("App component with hooks", () => {
    beforeEach(() => {
        fetch.mockClear();
    });
    it("renders title and search input", () => {
        render(_jsx(App, {}));
        expect(screen.getByText(/Peony Google Search Mock/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Co dnes budeme hledat/i)).toBeInTheDocument();
        expect(screen.getByText(/Hledat/i)).toBeInTheDocument();
    });
    it("performs search and renders results", () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(App, {}));
        const input = screen.getByPlaceholderText(/Co dnes budeme hledat/i);
        fireEvent.change(input, { target: { value: "test query" } });
        const button = screen.getByText(/Hledat/i);
        fireEvent.click(button);
        yield waitFor(() => {
            expect(fetch).toHaveBeenCalledWith("http://localhost:3001/search", expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: "test query" }),
            }));
        });
        yield waitFor(() => {
            expect(screen.getByText("Test result 1")).toBeInTheDocument();
            expect(screen.getByText("Description 2")).toBeInTheDocument();
        });
    }));
    it("fetches suggestions when typing", () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(App, {}));
        const input = screen.getByPlaceholderText(/Co dnes budeme hledat/i);
        fireEvent.change(input, { target: { value: "sugg" } });
        yield waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/search/suggestions?q=sugg"));
        });
    }));
    it("clears results when title is clicked", () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(App, {}));
        // nejdřív proveď search
        const input = screen.getByPlaceholderText(/Co dnes budeme hledat/i);
        fireEvent.change(input, { target: { value: "test" } });
        fireEvent.click(screen.getByText(/Hledat/i));
        yield waitFor(() => {
            expect(screen.getByText("Test result 1")).toBeInTheDocument();
        });
        // klik na title
        fireEvent.click(screen.getByText(/Peony Google Search Mock/i));
        yield waitFor(() => {
            expect(screen.queryByText("Test result 1")).not.toBeInTheDocument();
            expect(input.value).toBe("");
        });
    }));
});
