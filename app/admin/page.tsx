import Link from "next/link";
import { cookies } from "next/headers";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getGitSyncStatus } from "@/lib/git-sync";
import { listSuggestions } from "@/lib/moderation-store";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams
}: {
  searchParams?: { message?: string; error?: string };
}) {
  const cookieStore = cookies();
  const authenticated = await isAdminAuthenticated(cookieStore);

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-10 md:px-10">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#CF0A2C]">Admin</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Moderation login</h1>
          <p className="mt-3 text-sm text-slate-600">Default password: `admin123`. Change it immediately after logging in.</p>

          {searchParams?.error ? (
            <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{searchParams.error}</p>
          ) : null}

          <form action="/api/admin/login" method="post" className="mt-6 space-y-4">
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Password
              <input type="password" name="password" required className="w-full rounded-xl border border-slate-300 px-4 py-3" />
            </label>
            <button type="submit" className="rounded-full bg-[#CF0A2C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B10725]">
              Log in
            </button>
          </form>

          <div className="mt-6 text-sm font-semibold">
            <Link href="/" className="text-[#B10725] hover:underline">Back to catalog</Link>
          </div>
        </div>
      </main>
    );
  }

  const [suggestions, gitSync] = await Promise.all([listSuggestions(), getGitSyncStatus()]);
  const pending = suggestions.filter((suggestion) => suggestion.status === "pending");
  const reviewed = suggestions.filter((suggestion) => suggestion.status !== "pending");

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#CF0A2C]">Admin</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Community moderation</h1>
              <p className="mt-3 max-w-3xl text-slate-600">Approve or deny suggestions, rotate the admin password, and monitor whether approved changes can sync back to GitHub.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/suggest" className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Suggest page</Link>
              <Link href="/docs/api" className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">API docs</Link>
              <form action="/api/admin/logout" method="post">
                <button type="submit" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Log out</button>
              </form>
            </div>
          </div>

          {searchParams?.message ? (
            <p className="mt-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{searchParams.message}</p>
          ) : null}
          {searchParams?.error ? (
            <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{searchParams.error}</p>
          ) : null}
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Password</h2>
            <form action="/api/admin/password" method="post" className="mt-4 space-y-4">
              <label className="block space-y-2 text-sm font-medium text-slate-700">
                New password
                <input type="password" name="password" required minLength={8} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
              </label>
              <button type="submit" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                Change password
              </button>
            </form>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">GitHub sync</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
              <p><span className="font-semibold text-slate-800">Enabled:</span> {gitSync.enabled ? "Yes" : "No"}</p>
              <p><span className="font-semibold text-slate-800">Branch:</span> {gitSync.branch}</p>
              <p><span className="font-semibold text-slate-800">Remote:</span> {gitSync.remote}</p>
              <p><span className="font-semibold text-slate-800">Token configured:</span> {gitSync.tokenConfigured ? "Yes" : "No"}</p>
            </div>
            <p className="mt-4 text-sm text-slate-600">Automatic push is attempted only when `GIT_SYNC_ENABLED=true` or `GITHUB_PUSH_TOKEN` is available in the server environment.</p>
          </article>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Pending suggestions</h2>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">{pending.length}</span>
          </div>

          {pending.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">No pending suggestions.</div>
          ) : (
            pending.map((suggestion) => (
              <article key={suggestion.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CF0A2C]">{suggestion.type} suggestion</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-900">{suggestion.summary}</h3>
                    <p className="mt-2 text-sm text-slate-600">Submitted by {suggestion.submitterName}{suggestion.submitterEmail ? ` (${suggestion.submitterEmail})` : ""} on {new Date(suggestion.createdAt).toLocaleString()}</p>
                    {suggestion.targetServiceId ? <p className="mt-1 text-sm text-slate-600">Target service: {suggestion.targetServiceId}</p> : null}
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">Pending</span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-700">{suggestion.rationale}</p>
                <pre className="mt-4 overflow-auto rounded-2xl bg-slate-950 p-4 text-xs text-slate-100">{JSON.stringify(suggestion.proposal, null, 2)}</pre>

                <form action="/api/admin/review" method="post" className="mt-4 space-y-4">
                  <input type="hidden" name="suggestionId" value={suggestion.id} />
                  <label className="block space-y-2 text-sm font-medium text-slate-700">
                    Review notes
                    <textarea name="notes" rows={3} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button type="submit" name="decision" value="approved" className="rounded-full bg-[#CF0A2C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B10725]">Approve</button>
                    <button type="submit" name="decision" value="denied" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">Deny</button>
                  </div>
                </form>
              </article>
            ))
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Recent reviews</h2>
          {reviewed.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">No reviewed suggestions yet.</div>
          ) : (
            reviewed.map((suggestion) => (
              <article key={suggestion.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{suggestion.summary}</h3>
                    <p className="text-sm text-slate-600">{suggestion.review?.decision} on {suggestion.review ? new Date(suggestion.review.reviewedAt).toLocaleString() : "-"}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${suggestion.status === "approved" ? "bg-green-100 text-green-800" : "bg-slate-200 text-slate-700"}`}>{suggestion.status}</span>
                </div>
                {suggestion.review?.notes ? <p className="mt-3 text-sm text-slate-700">{suggestion.review.notes}</p> : null}
                {suggestion.review?.gitSync ? <p className="mt-2 text-sm text-slate-600">Git sync: {suggestion.review.gitSync.message}</p> : null}
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
