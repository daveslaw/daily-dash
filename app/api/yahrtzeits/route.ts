import { fetchYahrtzeits } from "@/lib/yahrtzeits";

export async function GET() {
  return Response.json(await fetchYahrtzeits());
}
