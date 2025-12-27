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
// mock fetch – hranice FE/BE
global.fetch = jest.fn();
describe("App integration (App + hooks)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("performs search and renders results", () => __awaiter(void 0, void 0, void 0, function* () {
        // backend response
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => __awaiter(void 0, void 0, void 0, function* () {
                return ({
                    results: [
                        {
                            title: "Test result",
                            url: "https://example.com",
                            description: "Some description",
                        },
                    ],
                });
            }),
        });
        render(_jsx(App, {}));
        // input
        const input = screen.getByLabelText("search-input");
        fireEvent.change(input, { target: { value: "test" } });
        // button
        const button = screen.getByRole("button", { name: "search-button" });
        fireEvent.click(button);
        // fetch called
        yield waitFor(() => {
            expect(fetch).toHaveBeenCalledWith("http://localhost:3001/search", expect.objectContaining({
                method: "POST",
            }));
        });
        // result rendered
        expect(yield screen.findByText("Test result")).toBeInTheDocument();
        expect(screen.getByText("Some description")).toBeInTheDocument();
    }));
});
