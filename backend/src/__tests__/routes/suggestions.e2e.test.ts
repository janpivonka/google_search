import request from "supertest";
import { app } from "../../app";
import * as suggestionsService from "../../services/suggestions";

jest.mock("../../services/suggestions");

describe("GET /search/suggestions E2E", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return suggestions array from service", async () => {
    const mockResults = ["result1", "result2"];
    (suggestionsService.fetchSuggestions as jest.Mock).mockResolvedValue(mockResults);

    const res = await request(app).get("/search/suggestions?q=test");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockResults);
    expect(suggestionsService.fetchSuggestions).toHaveBeenCalledWith("test");
  });

  it("should return empty array when query is missing", async () => {
    const res = await request(app).get("/search/suggestions");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should handle service failure gracefully", async () => {
    (suggestionsService.fetchSuggestions as jest.Mock).mockRejectedValue(new Error("fail"));

    const res = await request(app).get("/search/suggestions?q=test");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
