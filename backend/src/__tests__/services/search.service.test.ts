// src/__tests__/search.service.test.ts
import { search } from "../../services/search.service";
import * as googleImages from "../../services/googleImages";
import fetch from "node-fetch";

jest.mock("node-fetch");
jest.mock("../../services/googleImages");

const { Response } = jest.requireActual("node-fetch");
const mockedFetchImage = googleImages.fetchImageForResult as jest.Mock;
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("search.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return search results with images from googleImages service", async () => {
    mockedFetchImage.mockResolvedValue("https://example.com/image.jpg");

    mockedFetch.mockResolvedValue(
      new Response(
        JSON.stringify({
          organic_results: [
            {
              position: 1,
              title: "Test result",
              link: "https://example.com",
              snippet: "Description",
            },
          ],
        })
      ) as any
    );

    const result = await search("typescript");

    expect(result.results).toHaveLength(1);
    expect(result.results[0]).toMatchObject({
      position: 1,
      title: "Test result",
      url: "https://example.com",
      description: "Description",
    });
    expect(result.results[0].image).toBe("https://example.com/image.jpg");
    expect(mockedFetchImage).toHaveBeenCalledWith("Test result Description");
  });

  it("should handle empty results gracefully", async () => {
    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify({ organic_results: [] })) as any
    );

    const result = await search("nothing");
    expect(result.results).toHaveLength(0);
  });

  it("should handle image service returning null", async () => {
    mockedFetchImage.mockResolvedValue(null);

    mockedFetch.mockResolvedValue(
      new Response(
        JSON.stringify({
          organic_results: [
            {
              position: 1,
              title: "Test result",
              link: "https://example.com",
              snippet: "Description",
            },
          ],
        })
      ) as any
    );

    const result = await search("typescript");
    expect(result.results[0].image).toBe("/placeholder.png");
  });
});
