import request from "supertest";
import { app } from "../../app";
import fetch from "node-fetch";

jest.mock("node-fetch");
const { Response } = jest.requireActual("node-fetch");

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("POST /search", () => {

  beforeEach(() => {
    mockedFetch.mockReset();
  });

  it("returns 400 if query is missing", async () => {
    const res = await request(app).post("/search").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("returns search results with correct structure", async () => {
    // 1️⃣ SerpAPI response
    mockedFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          organic_results: [
            {
              position: 1,
              title: "Test result",
              link: "https://example.com",
              snippet: "Description"
            }
          ]
        })
      )
    );

    // 2️⃣ Google Image API response
    mockedFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          items: [{ link: "https://example.com/image.jpg" }]
        })
      )
    );

    const res = await request(app)
      .post("/search")
      .send({ query: "typescript" });

    expect(res.status).toBe(200);

    expect(res.body).toMatchObject({
      source: "google",
      page: 1,
      type: "organic",
      query: "typescript"
    });

    expect(Array.isArray(res.body.results)).toBe(true);

    const item = res.body.results[0];
    if ("image" in item) {
      expect(typeof item.image).toBe("string");
    }
  });
});
