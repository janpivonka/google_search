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
import { render } from "@testing-library/react";
import { act } from "react";
import { useSearch } from "../../app/hooks/useSearch";
// Wrapper komponenta pro test hooku
function TestHook({ callback }) {
    const hook = useSearch();
    callback(hook);
    return null;
}
describe("useSearch hook", () => {
    let hookResult = null;
    beforeEach(() => {
        hookResult = null;
    });
    it("should initialize with empty state", () => {
        render(_jsx(TestHook, { callback: (hook) => { hookResult = hook; } }));
        expect(hookResult.results).toEqual([]);
        expect(hookResult.suggestions).toEqual([]);
        expect(hookResult.loading).toBe(false);
        expect(hookResult.error).toBeNull();
    });
    it("resetResults clears state", () => {
        render(_jsx(TestHook, { callback: (hook) => { hookResult = hook; } }));
        act(() => {
            // naplníme nějaká data
            hookResult.results.push({ title: "x", url: "https://x.com", description: "desc" });
            hookResult.suggestions.push("sugg");
            hookResult.error = "error";
        });
        act(() => {
            hookResult.resetResults();
        });
        expect(hookResult.results).toEqual([]);
        expect(hookResult.suggestions).toEqual([]);
        expect(hookResult.error).toBeNull();
    });
    it("handleSearch sets results and clears suggestions", () => __awaiter(void 0, void 0, void 0, function* () {
        // mock fetch
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ results: [{ title: "res", url: "https://x.com", description: "desc" }] }),
        }));
        render(_jsx(TestHook, { callback: (hook) => { hookResult = hook; } }));
        yield act(() => __awaiter(void 0, void 0, void 0, function* () {
            yield hookResult.handleSearch("query");
        }));
        expect(hookResult.results.length).toBe(1);
        expect(hookResult.suggestions).toEqual([]);
        expect(hookResult.error).toBeNull();
    }));
    it("fetchSuggestions sets suggestions", () => __awaiter(void 0, void 0, void 0, function* () {
        // mock fetch
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(["sugg1", "sugg2"]),
        }));
        render(_jsx(TestHook, { callback: (hook) => { hookResult = hook; } }));
        yield act(() => __awaiter(void 0, void 0, void 0, function* () {
            hookResult.fetchSuggestions("query");
            // čekáme déle než debounce (300ms)
            yield new Promise(r => setTimeout(r, 350));
        }));
        expect(hookResult.suggestions).toEqual(["sugg1", "sugg2"]);
    }));
});
