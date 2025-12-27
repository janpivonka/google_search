import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import { useSearch } from "../../app/hooks/useSearch";

function TestHook({ callback }: { callback: (hook: ReturnType<typeof useSearch>) => void }) {
  const hook = useSearch();
  callback(hook);
  return null;
}

describe("useSearch hook", () => {
  let hookResult: ReturnType<typeof useSearch> | null = null;

  beforeEach(() => {
    hookResult = null;
  });

  it("should initialize with empty state", () => {
    render(<TestHook callback={(hook) => { hookResult = hook; }} />);
    expect(hookResult!.results).toEqual([]);
    expect(hookResult!.suggestions).toEqual([]);
    expect(hookResult!.loading).toBe(false);
    expect(hookResult!.error).toBeNull();
  });

  it("resetResults clears state", () => {
    render(<TestHook callback={(hook) => { hookResult = hook; }} />);
    act(() => {
      hookResult!.results.push({ title: "x", url: "https://x.com", description: "desc" });
      hookResult!.suggestions.push("sugg");
      hookResult!.error = "error";
    });
    act(() => {
      hookResult!.resetResults();
    });

    expect(hookResult!.results).toEqual([]);
    expect(hookResult!.suggestions).toEqual([]);
    expect(hookResult!.error).toBeNull();
  });

  it("handleSearch sets results and clears suggestions", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: [{ title: "res", url: "https://x.com", description: "desc" }] }),
      })
    ) as any;

    render(<TestHook callback={(hook) => { hookResult = hook; }} />);

    await act(async () => {
      await hookResult!.handleSearch("query");
    });

    expect(hookResult!.results.length).toBe(1);
    expect(hookResult!.suggestions).toEqual([]);
    expect(hookResult!.error).toBeNull();
  });

  it("fetchSuggestions sets suggestions", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(["sugg1", "sugg2"]),
      })
    ) as any;

    render(<TestHook callback={(hook) => { hookResult = hook; }} />);

    await act(async () => {
      hookResult!.fetchSuggestions("query");
      await new Promise(r => setTimeout(r, 350));
    });

    expect(hookResult!.suggestions).toEqual(["sugg1", "sugg2"]);
  });
});
