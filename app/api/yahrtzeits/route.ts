import * as cheerio from "cheerio";

export async function GET() {
  try {
    const res = await fetch("https://x.com/Yahrtzeits", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    // X renders tweets in <article> elements; grab the first post text
    const tweet = $("article").first().find('[data-testid="tweetText"]').text().trim();

    if (!tweet) throw new Error("Could not find tweet text — X may require JS rendering");
    return Response.json({ data: tweet });
  } catch (err) {
    return Response.json({ error: String(err) });
  }
}
