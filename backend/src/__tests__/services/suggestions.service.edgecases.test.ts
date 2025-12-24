// src/__tests__/services/suggestions.service.edgecases.test.ts
import { fetchSuggestions } from "../../services/suggestions";
import fetch from "node-fetch";

jest.mock("node-fetch");
const { Response } = jest.requireActual("node-fetch");
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("suggestions service - edge cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return empty array for empty string", async () => {
    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify(["", []]), { status: 200 }) as any
    );

    const results = await fetchSuggestions("");
    expect(results).toEqual([]);
  });

  it("should return empty array for string with only spaces", async () => {
    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify(["   ", []]), { status: 200 }) as any
    );

    const results = await fetchSuggestions("   ");
    expect(results).toEqual([]);
  });

  it("should throw 'Suggestions request failed' if fetch fails", async () => {
    mockedFetch.mockRejectedValue(new Error("fail"));

    await expect(fetchSuggestions("query")).rejects.toThrow(
      "Suggestions request failed"
    );
  });

  it("should throw 'Suggestions request failed' if response.ok is false", async () => {
    mockedFetch.mockResolvedValue(
      new Response(new ArrayBuffer(0), { status: 500 }) as any
    );

    await expect(fetchSuggestions("query")).rejects.toThrow(
      "Suggestions request failed"
    );
  });

  it("should handle unexpected API structure gracefully", async () => {
    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify({ notExpected: true }), { status: 200 }) as any
    );

    const results = await fetchSuggestions("query");
    expect(results).toEqual([]);
  });

  it("should handle special characters and diacritics", async () => {
    const specialQuery = "české znaky é á í";
    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify([specialQuery, ["result1", "result2"]]), { status: 200 }) as any
    );

    const results = await fetchSuggestions(specialQuery);
    expect(results).toEqual(["result1", "result2"]);
  });
});
