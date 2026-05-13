import { getDailyCalendarInfo } from "@/lib/hebrew-calendar";

export async function GET() {
  const { hebrewDate, gregorianDate } = getDailyCalendarInfo(new Date());
  return Response.json({
    data: {
      hebrewDate,
      gregorianDate,
      url: "https://www.chabad.org/dailystudy/hayomyom.asp",
    },
  });
}
