"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { services, type CloudProvider, type HuaweiService, type NonHuaweiService } from "@/data/services";

type CompareProviderKey = CloudProvider;

type ProviderMeta = {
  key: CompareProviderKey;
  name: string;
  logo: string;
  cardTint: string;
  borderTint: string;
};

type ServiceMatrixRow = {
  category: string;
  generalFunction: string;
  aws: NonHuaweiService[];
  azure: NonHuaweiService[];
  gcp: NonHuaweiService[];
  huawei: HuaweiService[];
  searchableText: string;
};

const providerMeta: Record<CompareProviderKey, ProviderMeta> = {
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

const providers = [providerMeta.aws, providerMeta.azure, providerMeta.gcp, providerMeta.huawei] as const;

const categoryOrder = [
  "Compute and Containers",
  "Data and Analytics",
  "Databases",
  "AI and IoT",
  "Application and DevOps",
  "Observability and Management",
  "Networking and Connectivity",
  "Security",
  "Storage and Backup",
  "Migration",
  "Marketplace and Workspace",
  "Other"
] as const;

function categoryRank(category: string): number {
  const idx = categoryOrder.indexOf(category as (typeof categoryOrder)[number]);
  return idx === -1 ? categoryOrder.length : idx;
}

function getFunctionCategory(generalFunction: string): string {
  const normalized = generalFunction.toLowerCase();

  if (normalized.includes("security") || normalized.includes("identity") || normalized.includes("audit") || normalized.includes("cdn and security")) {
    return "Security";
  }
  if (normalized.includes("virtual machines") || normalized.includes("kubernetes") || normalized.includes("container") || normalized.includes("dedicated compute") || normalized.includes("compute")) {
    return "Compute and Containers";
  }
  if (
    normalized.includes("data warehouse") ||
    normalized.includes("data lake") ||
    normalized.includes("data integration") ||
    normalized.includes("big data") ||
    normalized.includes("business intelligence") ||
    normalized.includes("search")
  ) {
    return "Data and Analytics";
  }
  if (normalized.includes("database") || normalized.includes("caching") || normalized.includes("graph")) {
    return "Databases";
  }
  if (normalized.includes("machine learning") || normalized.includes("iot")) {
    return "AI and IoT";
  }
  if (
    normalized.includes("devops") ||
    normalized.includes("code quality") ||
    normalized.includes("ci") ||
    normalized.includes("pipeline") ||
    normalized.includes("artifact") ||
    normalized.includes("test management") ||
    normalized.includes("application platform") ||
    normalized.includes("api management") ||
    normalized.includes("event bus")
  ) {
    return "Application and DevOps";
  }
  if (
    normalized.includes("observability") ||
    normalized.includes("monitoring") ||
    normalized.includes("log management") ||
    normalized.includes("notification") ||
    normalized.includes("operations") ||
    normalized.includes("image management")
  ) {
    return "Observability and Management";
  }
  if (normalized.includes("network")) {
    return "Networking and Connectivity";
  }
  if (
    normalized.includes("storage") ||
    normalized.includes("backup") ||
    normalized.includes("disaster recovery") ||
    normalized.includes("block storage") ||
    normalized.includes("file storage") ||
    normalized.includes("object storage")
  ) {
    return "Storage and Backup";
  }
  if (normalized.includes("migration")) {
    return "Migration";
  }
  if (normalized.includes("marketplace") || normalized.includes("workspace")) {
    return "Marketplace and Workspace";
  }

  return "Other";
}

export function ServiceComparison() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const serviceMatrixRows = useMemo<ServiceMatrixRow[]>(() => {
    const grouped = new Map<string, ServiceMatrixRow>();

    services.forEach((service) => {
      const key = service.generalFunction;
      if (!grouped.has(key)) {
        grouped.set(key, {
          category: getFunctionCategory(key),
          generalFunction: key,
          aws: [],
          azure: [],
          gcp: [],
          huawei: [],
          searchableText: ""
        });
      }

      const row = grouped.get(key)!;
      if (service.cloudProvider === "aws") row.aws.push(service);
      if (service.cloudProvider === "azure") row.azure.push(service);
      if (service.cloudProvider === "gcp") row.gcp.push(service);
      if (service.cloudProvider === "huawei") row.huawei.push(service);
    });

    return Array.from(grouped.values())
      .map((row) => ({
        ...row,
        searchableText: [
          row.generalFunction,
          ...row.aws.map((s) => `${s.name} ${s.shortName} ${s.keywords.join(" ")}`),
          ...row.azure.map((s) => `${s.name} ${s.shortName} ${s.keywords.join(" ")}`),
          ...row.gcp.map((s) => `${s.name} ${s.shortName} ${s.keywords.join(" ")}`),
          ...row.huawei.map((s) => `${s.name} ${s.shortName} ${s.keywords.join(" ")}`)
        ]
          .join(" ")
          .toLowerCase()
      }))
      .sort((a, b) => {
        const catDiff = categoryRank(a.category) - categoryRank(b.category);
        if (catDiff !== 0) return catDiff;
        return a.generalFunction.localeCompare(b.generalFunction);
      })
      .filter((row) => (normalizedQuery ? row.searchableText.includes(normalizedQuery) : true));
  }, [normalizedQuery]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 md:p-10">
        <header className="rounded-3xl border border-white/70 bg-white p-6 shadow-lg md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#CF0A2C]">Huawei-focused cloud comparison</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Compare provider services against Huawei Cloud</h1>
          <p className="mt-3 max-w-3xl text-slate-600">Click any AWS/Azure/GCP service in the table to open a single-service comparison route against Huawei Cloud equivalent services.</p>
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
          <label htmlFor="service-search" className="mb-2 block text-sm font-semibold text-slate-700">Search services</label>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              id="service-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try: ECS, DWS, Security, CodeArts"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-cyan-200 transition focus:border-cyan-500 focus:ring"
            />
            {query ? (
              <button type="button" onClick={() => setQuery("")} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                Clear
              </button>
            ) : null}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900">All service equivalents table</h2>
            <p className="text-sm text-slate-600">{serviceMatrixRows.length > 0 ? `${serviceMatrixRows.length} capability row${serviceMatrixRows.length === 1 ? "" : "s"}` : `No services found for "${query}".`}</p>
          </div>

          <div className="md:hidden space-y-4">
            {serviceMatrixRows.map((row, index) => {
              const showCategoryHeader = index === 0 || serviceMatrixRows[index - 1].category !== row.category;

              return (
                <div key={row.generalFunction}>
                  {showCategoryHeader ? (
                    <p className="mb-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600">{row.category}</p>
                  ) : null}
                  <article className="rounded-xl border border-slate-200 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{row.generalFunction}</h3>
                    <div className="mt-3 space-y-3">
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">AWS</p>
                        {renderProviderServices(row.aws, true)}
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Azure</p>
                        {renderProviderServices(row.azure, true)}
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Google Cloud</p>
                        {renderProviderServices(row.gcp, true)}
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Huawei Cloud</p>
                        {renderProviderServices(row.huawei, false)}
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-3 py-3">General function</th>
                  <th className="px-3 py-3">AWS</th>
                  <th className="px-3 py-3">Azure</th>
                  <th className="px-3 py-3">Google Cloud</th>
                  <th className="px-3 py-3">Huawei Cloud</th>
                </tr>
              </thead>
              <tbody>
                {serviceMatrixRows.flatMap((row, index) => {
                  const showCategoryHeader = index === 0 || serviceMatrixRows[index - 1].category !== row.category;
                  const rows: JSX.Element[] = [];
                  if (showCategoryHeader) {
                    rows.push(
                      <tr key={`${row.category}-header`} className="bg-slate-50 border-y border-slate-200">
                        <td colSpan={5} className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600">{row.category}</td>
                      </tr>
                    );
                  }
                  rows.push(
                    <tr key={row.generalFunction} className="border-b border-slate-100 align-top">
                      <td className="px-3 py-3 font-semibold text-slate-800">{row.generalFunction}</td>
                      <td className="px-3 py-3">{renderProviderServices(row.aws, true)}</td>
                      <td className="px-3 py-3">{renderProviderServices(row.azure, true)}</td>
                      <td className="px-3 py-3">{renderProviderServices(row.gcp, true)}</td>
                      <td className="px-3 py-3">{renderProviderServices(row.huawei, false)}</td>
                    </tr>
                  );
                  return rows;
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function renderProviderServices(items: Array<NonHuaweiService | HuaweiService>, clickable: boolean) {
  if (items.length === 0) return <span className="text-slate-400">-</span>;

  return (
    <div className="space-y-2">
      {items.map((service) => {
        const isClickable = clickable && service.cloudProvider !== "huawei";
        const content = (
          <>
            <Image src={service.imageUrl} alt={`${service.name} icon`} width={18} height={18} className="mt-0.5 rounded-sm" />
            <div>
              <p className={`font-medium ${isClickable ? "text-[#CF0A2C] hover:underline" : "text-slate-800"}`}>{service.name}</p>
              <p className="text-xs text-slate-500">{service.shortName}</p>
            </div>
          </>
        );

        if (isClickable) {
          return (
            <Link key={service.id} href={`/comparison?serviceId=${encodeURIComponent(service.id)}`} className="flex items-start gap-2 rounded-md px-1 py-1 transition hover:bg-slate-100">
              {content}
            </Link>
          );
        }

        return (
          <div key={service.id} className="flex items-start gap-2 rounded-md px-1 py-1">
            {content}
          </div>
        );
      })}
    </div>
  );
}
