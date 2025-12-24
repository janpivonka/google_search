import React from "react";
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
    render(<App />);
    expect(screen.getByPlaceholderText(/co dnes budeme hledat/i)).toBeInTheDocument();
    expect(screen.getByText(/peony google search mock/i)).toBeInTheDocument();
    expect(screen.getByText(/hledat/i)).toBeInTheDocument();
  });

  it("renders suggestion items when typing", () => {
    render(<App />);
    expect(screen.getByText("test suggestion")).toBeInTheDocument();
  });

  it("allows clicking on a suggestion", async () => {
    render(<App />);
    const suggestion = screen.getByText("test suggestion");
    await userEvent.click(suggestion);
    // zde by se mohlo ověřit volání mock funkce selectSuggestion
  });
});
