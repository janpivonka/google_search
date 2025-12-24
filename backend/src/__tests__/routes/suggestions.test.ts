// backend/src/__tests__/suggestions.test.ts
import request from "supertest";
import { app } from "../../app";
import * as suggestionsService from "../../services/suggestions";

// mockujeme fetchSuggestions, aby test nevolal reálné API
jest.mock("../../services/suggestions");

describe("GET /search/suggestions", () => {
  const mockedFetchSuggestions = suggestionsService.fetchSuggestions as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return empty array if query is missing", async () => {
    const res = await request(app).get("/search/suggestions");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should return suggestions array for a query", async () => {
    mockedFetchSuggestions.mockResolvedValue(["apple", "apricot"]);

    const res = await request(app).get("/search/suggestions?q=ap");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(["apple", "apricot"]);
    expect(mockedFetchSuggestions).toHaveBeenCalledWith("ap");
  });

  it("should return empty array if service throws", async () => {
    mockedFetchSuggestions.mockRejectedValue(new Error("fail"));

    const res = await request(app).get("/search/suggestions?q=test");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
