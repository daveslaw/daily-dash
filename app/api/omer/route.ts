import { getDailyCalendarInfo } from "@/lib/hebrew-calendar";
import { resolveOmerVideo } from "@/lib/omer-video";

export async function GET() {
  const { omerDay } = getDailyCalendarInfo(new Date());
  if (!omerDay) return Response.json({ data: null });
  const video = resolveOmerVideo(omerDay);
  return Response.json({ data: video });
}
