import { ServiceComparison } from "@/components/service-comparison";
import { getCatalogServices } from "@/lib/catalog-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const services = await getCatalogServices();
  return <ServiceComparison services={services} />;
}
