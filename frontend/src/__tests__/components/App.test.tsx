import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../app/components/App";

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
  if ((url as string).includes("/search/suggestions")) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(["suggestion1", "suggestion2"]),
    });
  }
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: mockResults }),
  });
}) as jest.Mock;

describe("App component with hooks", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("renders title and search input", () => {
    render(<App />);
    expect(screen.getByText(/Peony Google Search Mock/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Co dnes budeme hledat/i)).toBeInTheDocument();
    expect(screen.getByText(/Hledat/i)).toBeInTheDocument();
  });

  it("performs search and renders results", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Co dnes budeme hledat/i);
    fireEvent.change(input, { target: { value: "test query" } });

    const button = screen.getByText(/Hledat/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/search",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: "test query" }),
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Test result 1")).toBeInTheDocument();
      expect(screen.getByText("Description 2")).toBeInTheDocument();
    });
  });

  it("fetches suggestions when typing", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Co dnes budeme hledat/i);

    fireEvent.change(input, { target: { value: "sugg" } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/search/suggestions?q=sugg")
      );
    });
  });

  it("clears results when title is clicked", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Co dnes budeme hledat/i);
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByText(/Hledat/i));

    await waitFor(() => {
      expect(screen.getByText("Test result 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Peony Google Search Mock/i));

    await waitFor(() => {
      expect(screen.queryByText("Test result 1")).not.toBeInTheDocument();
      expect((input as HTMLInputElement).value).toBe("");
    });
  });
});
