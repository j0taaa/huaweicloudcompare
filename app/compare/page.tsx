import { DirectComparisonPage } from "@/components/direct-comparison-page";
import { getCatalogServices } from "@/lib/catalog-store";

export const dynamic = "force-dynamic";

export default async function ComparePage({
  searchParams
}: {
  searchParams?: { provider?: string; q?: string };
}) {
  const services = await getCatalogServices();

  return (
    <DirectComparisonPage
      services={services}
      providerParam={searchParams?.provider}
      initialQuery={searchParams?.q}
    />
  );
}
