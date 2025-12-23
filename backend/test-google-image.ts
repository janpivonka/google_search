import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.GOOGLE_API_KEY;
const cx = process.env.GOOGLE_CX;

if (!key || !cx) {
  console.error("❌ Google API credentials missing in .env");
  process.exit(1);
}

const query = "test image";

async function testImageAPI() {
  try {
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      query
    )}&cx=${cx}&searchType=image&num=1&key=${key}`;

    const res = await fetch(url);
    const data = await res.json();

    console.log("Raw API response:", JSON.stringify(data, null, 2));

    if (data.error) {
      console.error("❌ API returned an error:", data.error);
    } else if (data.items && data.items.length > 0) {
      console.log("✅ API returned image link:", data.items[0].link);
    } else {
      console.warn("⚠️ API returned no images.");
    }
  } catch (err) {
    console.error("❌ Failed to fetch image:", err);
  }
}

testImageAPI();
