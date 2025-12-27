import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from "@testing-library/react";
import { ResultItem } from "../../app/components/ResultItem";
describe("ResultItem component", () => {
    const mockResult = {
        title: "Test title",
        url: "https://example.com",
        description: "Test description",
        image: "https://example.com/image.jpg",
    };
    it("renders title, url and description", () => {
        render(_jsx(ResultItem, { result: mockResult, index: 0 }));
        expect(screen.getByText("Test title")).toBeInTheDocument();
        expect(screen.getByText("https://example.com")).toBeInTheDocument();
        expect(screen.getByText("Test description")).toBeInTheDocument();
    });
    it("renders image when image url is provided", () => {
        render(_jsx(ResultItem, { result: mockResult, index: 0 }));
        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", mockResult.image);
        expect(image).toHaveAttribute("alt", mockResult.title);
    });
    it("does not render image when image is missing", () => {
        const resultWithoutImage = Object.assign(Object.assign({}, mockResult), { image: undefined });
        render(_jsx(ResultItem, { result: resultWithoutImage, index: 0 }));
        expect(screen.queryByRole("img")).toBeNull();
    });
    it("opens link in new tab on click", () => {
        const openSpy = jest
            .spyOn(window, "open")
            .mockImplementation(() => null);
        render(_jsx(ResultItem, { result: mockResult, index: 0 }));
        const link = screen.getByRole("link");
        fireEvent.click(link);
        expect(openSpy).toHaveBeenCalledWith(mockResult.url, "_blank", "noopener,noreferrer");
        openSpy.mockRestore();
    });
    it("applies animation delay based on index", () => {
        render(_jsx(ResultItem, { result: mockResult, index: 3 }));
        const link = screen.getByRole("link");
        const style = link.getAttribute("style") || "";
        // Regex match pro bezpečné porovnání desetinných čísel
        expect(style).toMatch(/animation-delay:\s*0\.3\d*s/);
    });
});
