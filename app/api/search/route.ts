import { handleRowSearch } from "@/lib/api-responses";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return handleRowSearch(searchParams.get("query") ?? searchParams.get("q"));
}
