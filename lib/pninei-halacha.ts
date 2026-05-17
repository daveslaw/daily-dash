import * as cheerio from "cheerio";

export type PnineiHalachaData = {
  title: string;
  excerpt: string;
  url: string;
};

export async function fetchPnineiHalacha(): Promise<
  { data: PnineiHalachaData } | { error: string }
> {
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

    const firstLessonTitle = $("#ym-hala01 h3 a").first().text().trim();

    const paragraphs: string[] = [];
    $("#ym-hala01 p, #ym-hala-1 p").each((_, el) => {
      const t = $(el).text().trim();
      if (t.length > 20) paragraphs.push(t);
    });

    const excerpt =
      paragraphs.slice(0, 2).join(" ").slice(0, 400) || firstLessonTitle;

    if (!title && !excerpt) throw new Error("Could not parse lesson content");

    return {
      data: {
        title: title || firstLessonTitle,
        excerpt,
        url: "https://ph.yhb.org.il/pninayomit/",
      },
    };
  } catch (err) {
    return { error: String(err) };
  }
}
