import Image from "next/image";
import Link from "next/link";
import { findServiceComparison } from "@/data/service-utils";
import { type CloudProvider, type HuaweiService, type NonHuaweiService } from "@/data/services";
import { getCatalogServices } from "@/lib/catalog-store";

type ProviderKey = CloudProvider;

type ProviderMeta = {
  key: ProviderKey;
  name: string;
  logo: string;
  cardTint: string;
  borderTint: string;
};

const providerMeta: Record<ProviderKey, ProviderMeta> = {
  aws: {
    key: "aws",
    name: "AWS",
    logo: "/logos/aws.svg",
    cardTint: "bg-[#FF9900]/[0.07]",
    borderTint: "border-[#FF9900]/35"
  },
  azure: {
    key: "azure",
    name: "Azure",
    logo: "/logos/azure.svg",
    cardTint: "bg-[#0078D4]/[0.08]",
    borderTint: "border-[#0078D4]/35"
  },
  gcp: {
    key: "gcp",
    name: "Google Cloud",
    logo: "/logos/gcp.svg",
    cardTint: "bg-[#4285F4]/[0.08]",
    borderTint: "border-[#4285F4]/35"
  },
  huawei: {
    key: "huawei",
    name: "Huawei Cloud",
    logo: "/logos/huawei.svg",
    cardTint: "bg-[#CF0A2C]/[0.08]",
    borderTint: "border-[#CF0A2C]/35"
  }
};

export const dynamic = "force-dynamic";

export default async function ComparisonPage({ searchParams }: { searchParams: { serviceId?: string } }) {
  const services = await getCatalogServices();
  const { source, huawei } = findServiceComparison(services, searchParams.serviceId);

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-8 md:px-10">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Comparison route</p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Single service comparison</h1>
          </div>
          <Link href="/" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Back to main page
          </Link>
        </div>

        {!source ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-700">No service selected. Go back and click any AWS, Azure, or GCP service in the table.</p>
          </section>
        ) : (
          <article className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">{source.generalFunction}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{source.name}</h2>
              <p className="mt-3 max-w-3xl text-base text-slate-600 md:text-lg">{source.description}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <SourceProviderColumn service={source} provider={providerMeta[source.cloudProvider]} />
              <HuaweiProviderColumn services={huawei} />
            </div>
          </article>
        )}
      </div>
    </main>
  );
}

function SourceProviderColumn({ service, provider }: { service: NonHuaweiService; provider: ProviderMeta }) {
  return (
    <div className={`rounded-2xl border p-5 ${provider.borderTint} ${provider.cardTint}`}>
      <div className="mb-4 flex items-center gap-2">
        <Image src={provider.logo} alt={`${provider.name} logo`} width={20} height={20} />
        <h3 className="font-semibold text-slate-900">{provider.name}</h3>
      </div>

      <div className="space-y-3 border-b border-slate-300/40 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Service information</p>
        <div className="flex items-center gap-2">
          <Image src={service.imageUrl} alt={`${service.name} icon`} width={18} height={18} className="rounded-sm" />
          <span className="text-sm font-medium text-slate-800">{service.name}</span>
        </div>
        <p className="text-sm text-slate-700">Shortname: {service.shortName}</p>
        <p className="text-sm text-slate-700">Huawei equivalent shortnames: {service.huaweiEquivalentShortNames.length > 0 ? service.huaweiEquivalentShortNames.join(", ") : "None"}</p>
        <p className="text-sm text-slate-700">Keywords: {service.keywords.join(", ")}</p>
      </div>

      <div className="mt-4 space-y-2 border-b border-slate-300/40 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Differences vs Huawei</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {service.differencesFromHuawei.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Migration to Huawei</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {service.migrationToHuawei.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HuaweiProviderColumn({ services }: { services: HuaweiService[] }) {
  const provider = providerMeta.huawei;

  return (
    <div className={`rounded-2xl border p-5 ${provider.borderTint} ${provider.cardTint}`}>
      <div className="mb-4 flex items-center gap-2">
        <Image src={provider.logo} alt={`${provider.name} logo`} width={20} height={20} />
        <h3 className="font-semibold text-slate-900">{provider.name}</h3>
      </div>

      {services.length > 0 ? (
        <>
          {services.map((service, index) => (
            <div key={service.id} className={index === services.length - 1 ? "space-y-2" : "mb-4 space-y-2 border-b border-slate-300/40 pb-4"}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Huawei equivalent service</p>
              <div className="flex items-center gap-2">
                <Image src={service.imageUrl} alt={`${service.name} icon`} width={18} height={18} className="rounded-sm" />
                <span className="text-sm font-medium text-slate-800">{service.name}</span>
              </div>
              <p className="text-sm text-slate-700">Shortname: {service.shortName}</p>
              <p className="text-sm text-slate-700">General function: {service.generalFunction}</p>
              <p className="text-sm leading-relaxed text-slate-700">{service.description}</p>
              <p className="text-sm text-slate-700">Keywords: {service.keywords.join(", ")}</p>
            </div>
          ))}
        </>
      ) : (
        <p className="text-sm text-slate-700">No Huawei equivalent is defined for this service in the data file.</p>
      )}
    </div>
  );
}
