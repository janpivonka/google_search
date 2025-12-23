import fetch from "node-fetch";

async function testSearch() {
  const res = await fetch("http://localhost:3001/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "řízek" }),
  });
  const data = await res.json();
  console.log(data);
}

testSearch();
