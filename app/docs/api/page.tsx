import Link from "next/link";
import { getOpenApiSpec } from "@/lib/openapi";

export const dynamic = "force-dynamic";

export default function ApiDocsPage() {
  const spec = getOpenApiSpec();
  const examples = spec["x-providerExamples"] as string[];

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900 md:px-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#CF0A2C]">OpenAPI + Docs</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight">API Documentation</h1>
              <p className="mt-3 max-w-3xl text-slate-600">The website exposes public service lookup APIs, the row-search API, and a public community suggestion API. The full OpenAPI document is available as JSON.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/api/openapi" className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                OpenAPI JSON
              </Link>
              <Link href="/" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                Back Home
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Provider Lookup</h2>
            <p className="mt-2 text-sm text-slate-600">One route per provider. The service segment accepts full names, short names, and fuzzy aliases.</p>
            <div className="mt-4 space-y-2 rounded-2xl bg-slate-950 p-4 font-mono text-sm text-slate-100">
              {examples.map((example) => (
                <div key={example}>{example}</div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Row Search</h2>
            <p className="mt-2 text-sm text-slate-600">This matches the website search bar and returns the service rows from the comparison table.</p>
            <div className="mt-4 rounded-2xl bg-slate-950 p-4 font-mono text-sm text-slate-100">
              <div>/api/search?query=ecs</div>
              <div>/api/search?q=codearts</div>
            </div>
          </article>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Community Suggestions</h2>
            <p className="mt-2 text-sm text-slate-600">Users can submit structured edit or add-service suggestions through `/api/suggestions` or the `/suggest` page. Suggestions are reviewed privately before publication.</p>
            <div className="mt-4 rounded-2xl bg-slate-950 p-4 font-mono text-sm text-slate-100">
              <div>POST /api/suggestions</div>
              <div>Content-Type: application/json</div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Publication Flow</h2>
            <p className="mt-2 text-sm text-slate-600">Approved changes update the live catalog and can optionally be pushed back to GitHub when server-side Git sync is configured.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
