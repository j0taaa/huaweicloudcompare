"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { serviceMappings, type CloudMapping } from "@/data/services";

type ProviderKey = "aws" | "azure" | "gcp";
type CompareProviderKey = ProviderKey | "huawei";

type ProviderMeta = {
  key: CompareProviderKey;
  name: string;
  logo: string;
  chipClass: string;
  cardTint: string;
  borderTint: string;
};

const providerMeta: Record<CompareProviderKey, ProviderMeta> = {
  aws: {
    key: "aws",
    name: "AWS",
    logo: "/logos/aws.svg",
    chipClass: "bg-[#232F3E] text-[#FF9900]",
    cardTint: "bg-[#FF9900]/[0.07]",
    borderTint: "border-[#FF9900]/35"
  },
  azure: {
    key: "azure",
    name: "Azure",
    logo: "/logos/azure.svg",
    chipClass: "bg-[#0078D4] text-white",
    cardTint: "bg-[#0078D4]/[0.08]",
    borderTint: "border-[#0078D4]/35"
  },
  gcp: {
    key: "gcp",
    name: "Google Cloud",
    logo: "/logos/gcp.svg",
    chipClass: "bg-[#4285F4] text-white",
    cardTint: "bg-[#4285F4]/[0.08]",
    borderTint: "border-[#4285F4]/35"
  },
  huawei: {
    key: "huawei",
    name: "Huawei Cloud",
    logo: "/logos/huawei.svg",
    chipClass: "bg-[#CF0A2C] text-white",
    cardTint: "bg-[#CF0A2C]/[0.08]",
    borderTint: "border-[#CF0A2C]/35"
  }
};

const providers = [providerMeta.aws, providerMeta.azure, providerMeta.gcp, providerMeta.huawei] as const;
const compareOptions: ProviderKey[] = ["aws", "azure", "gcp"];

const serviceIcons: Record<string, string> = {
  "Amazon EC2": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/compute/ec2.png",
  "Amazon EKS": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/compute/elastic-kubernetes-service.png",
  "Amazon S3": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/storage/simple-storage-service-s3.png",
  "Amazon RDS": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/database/rds.png",
  "AWS Lambda": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/compute/lambda.png",
  "Amazon CloudFront": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/cloudfront.png",
  "Azure Virtual Machines": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/compute/vm.png",
  "Azure Kubernetes Service (AKS)": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/compute/kubernetes-services.png",
  "Azure Blob Storage": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/storage/blob-storage.png",
  "Azure SQL Database": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/database/sql-databases.png",
  "Azure Database for PostgreSQL": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/database/database-for-postgresql-servers.png",
  "Azure Functions": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/compute/function-apps.png",
  "Azure Front Door": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/network/front-doors.png",
  "Azure CDN": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/network/cdn-profiles.png",
  "Compute Engine": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/compute-engine.png",
  "Google Kubernetes Engine (GKE)": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/kubernetes-engine.png",
  "Cloud Storage": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/storage/storage.png",
  "Cloud SQL": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/database/sql.png",
  "Cloud Functions": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/functions.png",
  "Cloud CDN": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/cdn.png",
  "Elastic Cloud Server (ECS)": "/service-icons/huawei-ecs.svg",
  "Cloud Container Engine (CCE)": "/service-icons/huawei-cce.svg",
  "Object Storage Service (OBS)": "/service-icons/huawei-obs.svg",
  "Relational Database Service (RDS)": "/service-icons/huawei-rds.svg",
  FunctionGraph: "/service-icons/huawei-functiongraph.svg",
  "Content Delivery Network (CDN)": "/service-icons/huawei-cdn.svg"
};

export function ServiceComparison() {
  const [query, setQuery] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<ProviderKey>("aws");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const matchedMappings = useMemo(() => {
    if (!normalizedQuery) return [];
    return serviceMappings.filter((mapping) => {
      const candidates = [mapping.capability, ...mapping.aws, ...mapping.azure, ...mapping.gcp, ...mapping.huawei];
      return candidates.some((candidate) => candidate.toLowerCase().includes(normalizedQuery));
    });
  }, [normalizedQuery]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 md:p-10">
        <header className="rounded-3xl border border-white/70 bg-white p-6 shadow-lg md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#CF0A2C]">Huawei-focused cloud comparison</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Compare one provider against Huawei Cloud</h1>
          <p className="mt-3 max-w-3xl text-slate-600">Choose one cloud, search any service/capability, then open the fullscreen column layout (Huawei always highlighted as the main target and shown on the right).</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {providers.map((provider) => (
              <div key={provider.key} className={`flex items-center gap-3 rounded-xl border px-3 py-2 shadow-sm ${provider.borderTint} ${provider.cardTint}`}>
                <Image src={provider.logo} alt={`${provider.name} logo`} width={26} height={26} />
                <span className="font-semibold text-slate-800">{provider.name}</span>
              </div>
            ))}
          </div>
        </header>

        <section className="sticky top-4 z-10 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lg backdrop-blur">
          <label htmlFor="service-search" className="mb-2 block text-sm font-semibold text-slate-700">Search by service name or capability</label>
          <div className="flex flex-col gap-3 md:flex-row">
            <input id="service-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: EC2, Azure Functions, Cloud SQL, OBS, FunctionGraph" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-cyan-200 transition focus:border-cyan-500 focus:ring" />
            {query ? <button type="button" onClick={() => setQuery("")} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Clear</button> : null}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <label htmlFor="provider-select" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Compared provider</label>
            <select id="provider-select" value={selectedProvider} onChange={(e) => setSelectedProvider(e.target.value as ProviderKey)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
              {compareOptions.map((providerKey) => (
                <option key={providerKey} value={providerKey}>{providerMeta[providerKey].name}</option>
              ))}
            </select>
          </div>
        </section>

        {normalizedQuery ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Detailed comparison results</h2>
                <p className="text-sm text-slate-600">{matchedMappings.length > 0 ? `Found ${matchedMappings.length} capability match(es).` : `No equivalent service mapping found for "${query}".`}</p>
              </div>
              {matchedMappings.length > 0 ? <button type="button" onClick={() => setIsFullscreen(true)} className="rounded-full bg-[#CF0A2C] px-5 py-2 text-sm font-semibold text-white hover:bg-[#b70825]">Open fullscreen comparison</button> : null}
            </div>
          </section>
        ) : null}
      </div>

      {isFullscreen ? <FullscreenComparison mappings={matchedMappings} selectedProvider={selectedProvider} onClose={() => setIsFullscreen(false)} /> : null}
    </main>
  );
}

function FullscreenComparison({ mappings, selectedProvider, onClose }: { mappings: CloudMapping[]; selectedProvider: ProviderKey; onClose: () => void }) {
  const leftProvider = providerMeta[selectedProvider];
  const rightProvider = providerMeta.huawei;

  return (
    <section className="fixed inset-0 z-50 overflow-y-auto bg-[#f5f5f7]">
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Fullscreen comparison</p>
            <h3 className="text-xl font-bold text-slate-900">{leftProvider.name} vs Huawei Cloud (Huawei on the right)</h3>
          </div>
          <button onClick={onClose} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Close</button>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-12 px-6 py-8 md:px-10">
        {mappings.map((mapping) => (
          <article key={`${mapping.capability}-fullscreen`} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">{mapping.category}</p>
              <h4 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{mapping.capability}</h4>
              <p className="mt-3 max-w-3xl text-base text-slate-600 md:text-lg">{mapping.details.summary}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <ProviderFeatureColumn mapping={mapping} provider={leftProvider} />
              <ProviderFeatureColumn mapping={mapping} provider={rightProvider} huaweiMain />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProviderFeatureColumn({ mapping, provider, huaweiMain = false }: { mapping: CloudMapping; provider: ProviderMeta; huaweiMain?: boolean }) {
  const services = provider.key === "aws" ? mapping.aws : provider.key === "azure" ? mapping.azure : provider.key === "gcp" ? mapping.gcp : mapping.huawei;

  const relativeText =
    provider.key === "aws"
      ? mapping.details.relativeComparison.aws
      : provider.key === "azure"
        ? mapping.details.relativeComparison.azure
        : provider.key === "gcp"
          ? mapping.details.relativeComparison.gcp
          : "Huawei Cloud target service set for this capability.";

  const points = huaweiMain ? mapping.details.huaweiStrengths : mapping.details.notableDifferences;

  return (
    <div className={`rounded-2xl border p-5 ${provider.borderTint} ${provider.cardTint}`}>
      <div className="mb-4 flex items-center gap-2">
        <Image src={provider.logo} alt={`${provider.name} logo`} width={20} height={20} />
        <h5 className="font-semibold text-slate-900">{provider.name}</h5>
      </div>

      <div className="space-y-3 border-b border-slate-300/40 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Service</p>
        {services.map((service) => (
          <div key={service} className="flex items-center gap-2">
            <Image src={serviceIcons[service] ?? "/service-icons/huawei-cloud.svg"} alt={`${service} icon`} width={18} height={18} className="rounded-sm" />
            <span className="text-sm font-medium text-slate-800">{service}</span>
          </div>
        ))}
      </div>

      {!huaweiMain ? (
        <div className="mt-4 space-y-2 border-b border-slate-300/40 pb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Comparison vs Huawei</p>
          <p className="text-sm leading-relaxed text-slate-700">{relativeText}</p>
        </div>
      ) : null}

      <div className="mt-4 space-y-2 border-b border-slate-300/40 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{huaweiMain ? "Huawei strengths" : "Key differences"}</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {points.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Migration notes</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {mapping.details.migrationTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
