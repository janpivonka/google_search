// src/__tests__/googleImages.test.ts
import { fetchImageForResult } from "../../services/googleImages";
import fetch from "node-fetch";

jest.mock("node-fetch");
const { Response } = jest.requireActual("node-fetch");
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("googleImages service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GOOGLE_API_KEY = "dummy_key";
    process.env.GOOGLE_CX = "dummy_cx";
  });

  it("should return image URL from API", async () => {
    mockedFetch.mockResolvedValue(
      new Response(
        JSON.stringify({
          items: [{ link: "https://example.com/image.jpg" }],
        })
      ) as any
    );

    const result = await fetchImageForResult("test query");
    expect(result).toBe("https://example.com/image.jpg");
    expect(mockedFetch).toHaveBeenCalled();
  });

  it("should return placeholder if API returns no items", async () => {
    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify({ items: [] })) as any
    );

    const result = await fetchImageForResult("test query");
    expect(result).toBe("/placeholder.png");
  });

  it("should return placeholder if fetch throws", async () => {
    mockedFetch.mockRejectedValue(new Error("fail"));

    const result = await fetchImageForResult("test query");
    expect(result).toBe("/placeholder.png");
  });

  it("should return placeholder if credentials are missing", async () => {
    delete process.env.GOOGLE_API_KEY;
    delete process.env.GOOGLE_CX;

    const result = await fetchImageForResult("test query");
    expect(result).toBe("/placeholder.png");
  });
});
