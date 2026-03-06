import { handleProviderLookup } from "@/lib/api-responses";

export async function GET(_: Request, { params }: { params: { service: string } }) {
  return handleProviderLookup("azure", params.service);
}
