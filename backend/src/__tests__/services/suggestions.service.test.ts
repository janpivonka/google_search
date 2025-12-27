import { fetchSuggestions } from "../../services/suggestions";
import fetch from "node-fetch";

jest.mock("node-fetch");
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("suggestions service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return suggestions array if API succeeds", async () => {
    const mockData = ["query", ["result1", "result2"]];
    const mockResponse = {
      ok: true,
      arrayBuffer: jest.fn().mockResolvedValue(Buffer.from(JSON.stringify(mockData))),
    };

    mockedFetch.mockResolvedValue(mockResponse as any);

    const results = await fetchSuggestions("query");
    expect(results).toEqual(["result1", "result2"]);
  });

  it("should return empty array if data[1] is missing", async () => {
    const mockData = ["query"];
    const mockResponse = {
      ok: true,
      arrayBuffer: jest.fn().mockResolvedValue(Buffer.from(JSON.stringify(mockData))),
    };

    mockedFetch.mockResolvedValue(mockResponse as any);

    const results = await fetchSuggestions("query");
    expect(results).toEqual([]);
  });

  it("should throw 'Suggestions request failed' if fetch fails", async () => {
    mockedFetch.mockRejectedValue(new Error("fail"));

    await expect(fetchSuggestions("query")).rejects.toThrow("Suggestions request failed");
  });

  it("should throw 'Suggestions request failed' if response.ok is false", async () => {
    const mockResponse = {
      ok: false,
      arrayBuffer: jest.fn(),
    };

    mockedFetch.mockResolvedValue(mockResponse as any);

    await expect(fetchSuggestions("query")).rejects.toThrow("Suggestions request failed");
  });
});
