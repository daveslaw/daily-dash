import * as cheerio from "cheerio";

export async function GET() {
  try {
    const timestamp = Date.now();
    const res = await fetch(
      `https://ph.yhb.org.il/wp-content/plugins/db-connect/pninayomit-2025/he_py.php?date=${timestamp}`,
      { next: { revalidate: 0 } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    const dateHeading = $("#ym-head h3").text().trim();
    const lessonTitle = $("#ym-head h4").text().trim();
    const title = [dateHeading, lessonTitle].filter(Boolean).join(" — ");

    // First lesson link and its content
    const firstLessonHref = $("#ym-hala01 h3 a").first().attr("href") ?? "https://ph.yhb.org.il/pninayomit/";
    const firstLessonTitle = $("#ym-hala01 h3 a").first().text().trim();

    // Grab paragraph text from the lesson
    const paragraphs: string[] = [];
    $("#ym-hala01 p, #ym-hala-1 p").each((_, el) => {
      const t = $(el).text().trim();
      if (t.length > 20) paragraphs.push(t);
    });

    const excerpt = paragraphs.slice(0, 2).join(" ").slice(0, 400) || firstLessonTitle;

    if (!title && !excerpt) throw new Error("Could not parse lesson content");

    return Response.json({
      data: {
        title: title || firstLessonTitle,
        excerpt,
        url: firstLessonHref,
      },
    });
  } catch (err) {
    return Response.json({ error: String(err) });
  }
}
