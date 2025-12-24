// src/__tests__/integration/AppWithHooks.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../app/components/App";

// mock fetch – hranice FE/BE
global.fetch = jest.fn();

describe("App integration (App + hooks)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("performs search and renders results", async () => {
    // backend response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            title: "Test result",
            url: "https://example.com",
            description: "Some description",
          },
        ],
      }),
    });

    render(<App />);

    // input
    const input = screen.getByLabelText("search-input");
    fireEvent.change(input, { target: { value: "test" } });

    // button
    const button = screen.getByRole("button", { name: "search-button" });
    fireEvent.click(button);

    // fetch called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/search",
        expect.objectContaining({
          method: "POST",
        })
      );
    });

    // result rendered
    expect(await screen.findByText("Test result")).toBeInTheDocument();
    expect(screen.getByText("Some description")).toBeInTheDocument();
  });
});
