import fetch from "node-fetch";

export async function fetchImageForResult(query: string): Promise<string | null> {
  const key = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CX;

  if (!key || !cx) {
    console.warn("Google API credentials missing");
    return "/placeholder.png";
  }

  try {
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      query
    )}&cx=${cx}&searchType=image&num=1&key=${key}`;

    const res = await fetch(url);
    const data = await res.json();

    console.log("Image fetch result for query:", query, data);

    if (!data.items || !data.items[0] || !data.items[0].link) {
      console.warn(`⚠️ Žádný obrázek nalezen pro query: "${query}"`);
      return "/placeholder.png";
    }

    return data.items[0].link;
  } catch (err) {
    console.error("Failed to fetch image for query:", query, err);
    return "/placeholder.png";
  }
}
