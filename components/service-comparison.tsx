"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { serviceMappings } from "@/data/services";

type ProviderKey = "aws" | "azure" | "gcp";

const quickSearches = ["EC2", "AKS", "Cloud SQL", "OBS", "FunctionGraph"];

const providerMeta: Record<ProviderKey | "huawei", { name: string; logo: string; chipClass: string }> = {
  aws: { name: "AWS", logo: "/logos/aws.svg", chipClass: "bg-[#232F3E] text-[#FF9900]" },
  azure: { name: "Azure", logo: "/logos/azure.svg", chipClass: "bg-[#0078D4] text-white" },
  gcp: { name: "Google Cloud", logo: "/logos/gcp.svg", chipClass: "bg-[#4285F4] text-white" },
  huawei: { name: "Huawei Cloud", logo: "/logos/huawei.svg", chipClass: "bg-[#CF0A2C] text-white" }
};

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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#CF0A2C]">Cloud service equivalency</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Compare AWS, Azure, Google Cloud, and Huawei Cloud</h1>
          <p className="mt-3 max-w-3xl text-slate-600">Use this table for full equivalency discovery. For direct Apple-style side-by-side migration comparison, open the separate comparison page.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(["aws", "azure", "gcp", "huawei"] as const).map((key) => (
              <div key={key} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <Image src={providerMeta[key].logo} alt={`${providerMeta[key].name} logo`} width={24} height={24} />
                <span className="font-semibold text-slate-800">{providerMeta[key].name}</span>
              </div>
            ))}
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lg">
          <label htmlFor="service-search" className="mb-2 block text-sm font-semibold text-slate-700">Search by service name or capability</label>
          <div className="flex flex-col gap-3 md:flex-row">
            <input id="service-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: EC2, Azure Functions, Cloud SQL, OBS, FunctionGraph" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-cyan-200 transition focus:border-cyan-500 focus:ring" />
            {query ? <button type="button" onClick={() => setQuery("")} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Clear</button> : null}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {quickSearches.map((quickSearch) => (
              <button key={quickSearch} type="button" onClick={() => setQuery(quickSearch)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200">{quickSearch}</button>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">Capability</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">AWS</th>
                  <th className="px-4 py-3 font-semibold">Azure</th>
                  <th className="px-4 py-3 font-semibold">GCP</th>
                  <th className="px-4 py-3 font-semibold">Huawei</th>
                </tr>
              </thead>
              <tbody>
                {serviceMappings.map((mapping, index) => (
                  <tr key={mapping.capability} className={`align-top border-b border-slate-100 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{mapping.capability}</td>
                    <td className="px-4 py-3 text-slate-600">{mapping.category}</td>
                    <td className="px-4 py-3"><ServiceList services={mapping.aws} /></td>
                    <td className="px-4 py-3"><ServiceList services={mapping.azure} /></td>
                    <td className="px-4 py-3"><ServiceList services={mapping.gcp} /></td>
                    <td className="px-4 py-3"><ServiceList services={mapping.huawei} huawei /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {normalizedQuery ? (
          <section className="space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Detailed comparison results</h2>
                <p className="text-sm text-slate-600">{matchedMappings.length > 0 ? `Found ${matchedMappings.length} capability match(es).` : `No equivalent service mapping found for "${query}".`}</p>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="provider-select" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Direct compare with</label>
                <select id="provider-select" value={selectedProvider} onChange={(event) => setSelectedProvider(event.target.value as ProviderKey)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                  <option value="aws">AWS</option>
                  <option value="azure">Azure</option>
                  <option value="gcp">Google Cloud</option>
                </select>
                <Link href={`/compare?provider=${selectedProvider}&q=${encodeURIComponent(query)}`} className="rounded-full bg-[#CF0A2C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b70825]">Open direct comparison page</Link>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {matchedMappings.map((mapping) => (
                <article key={mapping.capability} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-900">{mapping.capability}</h3>
                    <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">{mapping.category}</span>
                  </div>
                  <p className="text-sm text-slate-600">{mapping.details.summary}</p>
                  <div className="mt-4 space-y-3">
                    <ProviderRow name="AWS" services={mapping.aws} providerClass={providerMeta.aws.chipClass} />
                    <ProviderRow name="Azure" services={mapping.azure} providerClass={providerMeta.azure.chipClass} />
                    <ProviderRow name="GCP" services={mapping.gcp} providerClass={providerMeta.gcp.chipClass} />
                    <ProviderRow name="Huawei Cloud" services={mapping.huawei} providerClass={providerMeta.huawei.chipClass} />
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function ProviderRow({ name, services, providerClass }: { name: string; services: string[]; providerClass: string }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${providerClass}`}>{name}</span>
      <ServiceList services={services} compact />
    </div>
  );
}

function ServiceList({ services, huawei = false, compact = false }: { services: string[]; huawei?: boolean; compact?: boolean }) {
  return (
    <div className={`${compact ? "space-y-1 text-right" : "space-y-2"}`}>
      {services.map((service) => (
        <div key={service} className={`flex items-center gap-2 ${compact ? "justify-end" : ""}`}>
          <Image src={serviceIcons[service] ?? "/service-icons/huawei-cloud.svg"} alt={`${service} icon`} width={18} height={18} className="rounded-sm" />
          <span className={`text-sm ${huawei ? "font-medium text-[#CF0A2C]" : "text-slate-700"}`}>{service}</span>
        </div>
      ))}
    </div>
  );
}
