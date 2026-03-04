import { DirectComparisonPage } from "@/components/direct-comparison-page";

export default function ComparePage({
  searchParams
}: {
  searchParams?: { provider?: string; q?: string };
}) {
  return (
    <DirectComparisonPage
      providerParam={searchParams?.provider}
      initialQuery={searchParams?.q}
    />
  );
}
