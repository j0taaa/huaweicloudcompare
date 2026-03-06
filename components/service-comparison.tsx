"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { buildServiceMatrixRows } from "@/data/service-utils";
import { type CloudProvider, type HuaweiService, type NonHuaweiService, type ServiceInfo } from "@/data/services";

type CompareProviderKey = CloudProvider;

type ProviderMeta = {
  key: CompareProviderKey;
  name: string;
  logo: string;
  cardTint: string;
  borderTint: string;
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

export function ServiceComparison({ services }: { services: ServiceInfo[] }) {
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const serviceMatrixRows = useMemo(() => buildServiceMatrixRows(services, query), [services, query]);

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 md:p-10">
        <header className="rounded-3xl border border-white/70 bg-white p-6 shadow-lg md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#CF0A2C]">Huawei-focused cloud comparison</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Compare provider services against Huawei Cloud</h1>
              <p className="mt-3 max-w-3xl text-slate-600">Click any AWS, Azure, or GCP service in the table to open a single-service comparison. Community members can also suggest data fixes for review.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/docs/api" className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                API Docs
              </Link>
              <Link href="/suggest" className="rounded-full border border-[#CF0A2C]/20 bg-[#CF0A2C]/5 px-4 py-2 text-sm font-semibold text-[#B10725] hover:bg-[#CF0A2C]/10">
                Suggest Changes
              </Link>
            </div>
          </div>
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
          <div className="mb-2 flex items-center justify-between gap-3">
            <label htmlFor="service-search" className="block text-sm font-semibold text-slate-700">Search services</label>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Ctrl + K</span>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              ref={searchInputRef}
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

          <div>
            <table className="w-full table-fixed border-collapse text-left text-[10px] leading-tight md:text-sm md:leading-normal">
              <colgroup>
                <col className="w-[22%]" />
                <col className="w-[19.5%]" />
                <col className="w-[19.5%]" />
                <col className="w-[19.5%]" />
                <col className="w-[19.5%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-slate-200 text-[9px] uppercase tracking-tight text-slate-500 md:text-xs md:tracking-wider">
                  <th className="px-1.5 py-2 md:px-3 md:py-3">General function</th>
                  <th className="px-1.5 py-2 md:px-3 md:py-3">AWS</th>
                  <th className="px-1.5 py-2 md:px-3 md:py-3">Azure</th>
                  <th className="px-1.5 py-2 md:px-3 md:py-3">Google Cloud</th>
                  <th className="px-1.5 py-2 md:px-3 md:py-3">Huawei Cloud</th>
                </tr>
              </thead>
              <tbody>
                {serviceMatrixRows.flatMap((row, index) => {
                  const showCategoryHeader = index === 0 || serviceMatrixRows[index - 1].category !== row.category;
                  const rows: JSX.Element[] = [];
                  if (showCategoryHeader) {
                    rows.push(
                      <tr key={`${row.category}-header`} className="border-y border-slate-200 bg-slate-50">
                        <td colSpan={5} className="px-1.5 py-1.5 text-[9px] font-bold uppercase tracking-tight text-slate-600 md:px-3 md:py-2 md:text-xs md:tracking-wider">{row.category}</td>
                      </tr>
                    );
                  }
                  rows.push(
                    <tr key={row.generalFunction} className="border-b border-slate-100 align-top">
                      <td className="break-words px-1.5 py-2 font-semibold text-slate-800 md:px-3 md:py-3">{row.generalFunction}</td>
                      <td className="break-words px-1.5 py-2 md:px-3 md:py-3">{renderProviderServices(row.aws, true)}</td>
                      <td className="break-words px-1.5 py-2 md:px-3 md:py-3">{renderProviderServices(row.azure, true)}</td>
                      <td className="break-words px-1.5 py-2 md:px-3 md:py-3">{renderProviderServices(row.gcp, true)}</td>
                      <td className="break-words px-1.5 py-2 md:px-3 md:py-3">{renderProviderServices(row.huawei, false)}</td>
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
    <div className="space-y-1 md:space-y-2">
      {items.map((service) => {
        const isClickable = clickable && service.cloudProvider !== "huawei";
        const content = (
          <>
            <Image src={service.imageUrl} alt={`${service.name} icon`} width={14} height={14} className="rounded-sm md:hidden" />
            <Image src={service.imageUrl} alt={`${service.name} icon`} width={18} height={18} className="mt-0.5 hidden rounded-sm md:block" />
            <div>
              <p className={`font-semibold md:hidden ${isClickable ? "text-[#CF0A2C] hover:underline" : "text-slate-800"}`}>{service.shortName}</p>
              <p className={`hidden font-medium md:block ${isClickable ? "text-[#CF0A2C] hover:underline" : "text-slate-800"}`}>{service.name}</p>
              <p className="hidden text-xs text-slate-500 md:block">{service.shortName}</p>
            </div>
          </>
        );

        if (isClickable) {
          return (
            <Link
              key={service.id}
              href={`/comparison?serviceId=${encodeURIComponent(service.id)}`}
              className="flex flex-col items-center gap-1 rounded-md px-0.5 py-0.5 text-center transition hover:bg-slate-100 md:flex-row md:items-start md:gap-2 md:px-1 md:py-1 md:text-left"
            >
              {content}
            </Link>
          );
        }

        return (
          <div key={service.id} className="flex flex-col items-center gap-1 rounded-md px-0.5 py-0.5 text-center md:flex-row md:items-start md:gap-2 md:px-1 md:py-1 md:text-left">
            {content}
          </div>
        );
      })}
    </div>
  );
}
