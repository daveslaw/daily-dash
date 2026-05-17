import { fetchPnineiHalacha } from "@/lib/pninei-halacha";

export async function GET() {
  return Response.json(await fetchPnineiHalacha());
}
