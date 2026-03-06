"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { type CloudProvider, type ServiceInfo } from "@/data/services";

type FormState = {
  type: "edit" | "add";
  targetServiceId: string;
  submitterName: string;
  submitterEmail: string;
  summary: string;
  rationale: string;
  id: string;
  cloudProvider: CloudProvider;
  name: string;
  shortName: string;
  generalFunction: string;
  description: string;
  imageUrl: string;
  keywords: string;
  huaweiEquivalentShortNames: string;
  differencesFromHuawei: string;
  migrationToHuawei: string;
};

const emptyForm: FormState = {
  type: "edit",
  targetServiceId: "",
  submitterName: "",
  submitterEmail: "",
  summary: "",
  rationale: "",
  id: "",
  cloudProvider: "aws",
  name: "",
  shortName: "",
  generalFunction: "",
  description: "",
  imageUrl: "",
  keywords: "",
  huaweiEquivalentShortNames: "",
  differencesFromHuawei: "",
  migrationToHuawei: ""
};

function toDelimitedList(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function applyServiceToForm(service: ServiceInfo): Partial<FormState> {
  return {
    targetServiceId: service.id,
    cloudProvider: service.cloudProvider,
    id: service.id,
    name: service.name,
    shortName: service.shortName,
    generalFunction: service.generalFunction,
    description: service.description,
    imageUrl: service.imageUrl,
    keywords: service.keywords.join(", "),
    huaweiEquivalentShortNames: service.cloudProvider === "huawei" ? "" : service.huaweiEquivalentShortNames.join(", "),
    differencesFromHuawei: service.cloudProvider === "huawei" ? "" : service.differencesFromHuawei.join("\n"),
    migrationToHuawei: service.cloudProvider === "huawei" ? "" : service.migrationToHuawei.join("\n")
  };
}

export function SuggestionForm({ services }: { services: ServiceInfo[] }) {
  const [form, setForm] = useState<FormState>(() => {
    const first = services[0];
    return first ? { ...emptyForm, ...applyServiceToForm(first) } : emptyForm;
  });
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error" | "submitting"; message?: string }>({ kind: "idle" });

  const selectedService = useMemo(() => services.find((service) => service.id === form.targetServiceId) ?? services[0], [form.targetServiceId, services]);
  const requiresHuaweiMapping = form.type === "add" ? form.cloudProvider !== "huawei" : selectedService?.cloudProvider !== "huawei";

  useEffect(() => {
    if (form.type === "edit" && selectedService) {
      setForm((current) => ({
        ...current,
        ...applyServiceToForm(selectedService)
      }));
    }
  }, [form.type, selectedService]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "submitting", message: "Submitting suggestion..." });

    const payload = {
      type: form.type,
      targetServiceId: form.type === "edit" ? form.targetServiceId : undefined,
      submitterName: form.submitterName,
      submitterEmail: form.submitterEmail,
      summary: form.summary,
      rationale: form.rationale,
      proposal: {
        id: form.type === "add" ? form.id || undefined : undefined,
        cloudProvider: form.type === "add" ? form.cloudProvider : undefined,
        name: form.name,
        shortName: form.shortName,
        generalFunction: form.generalFunction,
        description: form.description,
        imageUrl: form.imageUrl,
        keywords: toDelimitedList(form.keywords),
        huaweiEquivalentShortNames: requiresHuaweiMapping ? toDelimitedList(form.huaweiEquivalentShortNames) : undefined,
        differencesFromHuawei: requiresHuaweiMapping ? toDelimitedList(form.differencesFromHuawei) : undefined,
        migrationToHuawei: requiresHuaweiMapping ? toDelimitedList(form.migrationToHuawei) : undefined
      }
    };

    const response = await fetch("/api/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({ error: "Unexpected response." }));
    if (!response.ok) {
      setStatus({ kind: "error", message: result.error ?? "Failed to submit suggestion." });
      return;
    }

    setStatus({ kind: "success", message: "Suggestion submitted for review." });
    const first = services[0];
    setForm(first ? { ...emptyForm, ...applyServiceToForm(first) } : emptyForm);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#CF0A2C]">Community Edits</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Suggest a change</h1>
          <p className="mt-3 max-w-3xl text-slate-600">Submit structured edits or propose a new service. Every suggestion is reviewed before it becomes part of the public catalog.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Suggestion type
            <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as FormState["type"] }))} className="w-full rounded-xl border border-slate-300 px-4 py-3">
              <option value="edit">Edit existing service</option>
              <option value="add">Add new service</option>
            </select>
          </label>

          {form.type === "edit" ? (
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Target service
              <select value={form.targetServiceId} onChange={(event) => setForm((current) => ({ ...current, targetServiceId: event.target.value }))} className="w-full rounded-xl border border-slate-300 px-4 py-3">
                {services.map((service) => (
                  <option key={service.id} value={service.id}>{service.name} ({service.shortName})</option>
                ))}
              </select>
            </label>
          ) : (
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Provider
              <select value={form.cloudProvider} onChange={(event) => setForm((current) => ({ ...current, cloudProvider: event.target.value as CloudProvider }))} className="w-full rounded-xl border border-slate-300 px-4 py-3">
                <option value="aws">AWS</option>
                <option value="azure">Azure</option>
                <option value="gcp">Google Cloud</option>
                <option value="huawei">Huawei Cloud</option>
              </select>
            </label>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Your name" value={form.submitterName} onChange={(value) => setForm((current) => ({ ...current, submitterName: value }))} required />
          <Input label="Email (optional)" value={form.submitterEmail} onChange={(value) => setForm((current) => ({ ...current, submitterEmail: value }))} />
          <Input label="Short summary" value={form.summary} onChange={(value) => setForm((current) => ({ ...current, summary: value }))} required className="md:col-span-2" />
        </div>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Why should this change be made?
          <textarea value={form.rationale} onChange={(event) => setForm((current) => ({ ...current, rationale: event.target.value }))} required rows={4} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Service ID (optional for new service)" value={form.id} onChange={(value) => setForm((current) => ({ ...current, id: value }))} disabled={form.type === "edit"} />
          <Input label="Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} required={form.type === "add"} />
          <Input label="Short name" value={form.shortName} onChange={(value) => setForm((current) => ({ ...current, shortName: value }))} required={form.type === "add"} />
          <Input label="General function" value={form.generalFunction} onChange={(value) => setForm((current) => ({ ...current, generalFunction: value }))} required={form.type === "add"} />
          <Input label="Image URL" value={form.imageUrl} onChange={(value) => setForm((current) => ({ ...current, imageUrl: value }))} required={form.type === "add"} className="md:col-span-2" />
        </div>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Description
          <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} rows={4} required={form.type === "add"} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
        </label>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Keywords
          <textarea value={form.keywords} onChange={(event) => setForm((current) => ({ ...current, keywords: event.target.value }))} rows={3} required={form.type === "add"} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
          <span className="text-xs text-slate-500">Separate values with commas or new lines.</span>
        </label>

        {requiresHuaweiMapping ? (
          <div className="grid gap-4">
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Huawei equivalent short names
              <textarea value={form.huaweiEquivalentShortNames} onChange={(event) => setForm((current) => ({ ...current, huaweiEquivalentShortNames: event.target.value }))} rows={2} required={form.type === "add"} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            </label>
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Differences from Huawei
              <textarea value={form.differencesFromHuawei} onChange={(event) => setForm((current) => ({ ...current, differencesFromHuawei: event.target.value }))} rows={4} required={form.type === "add"} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            </label>
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Migration to Huawei
              <textarea value={form.migrationToHuawei} onChange={(event) => setForm((current) => ({ ...current, migrationToHuawei: event.target.value }))} rows={4} required={form.type === "add"} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            </label>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className={`text-sm ${status.kind === "error" ? "text-red-700" : status.kind === "success" ? "text-green-700" : "text-slate-500"}`}>
            {status.message ?? ""}
          </div>
          <button type="submit" disabled={status.kind === "submitting"} className="rounded-full bg-[#CF0A2C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B10725] disabled:cursor-not-allowed disabled:opacity-60">
            {status.kind === "submitting" ? "Submitting..." : "Submit suggestion"}
          </button>
        </div>
      </form>

      <aside className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">How it works</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-600">
            <li>Submit a structured proposal.</li>
            <li>The suggestion is reviewed privately.</li>
            <li>If approved, the live catalog updates and Git sync is attempted when configured.</li>
          </ol>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Useful links</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm font-semibold">
            <Link href="/docs/api" className="text-[#B10725] hover:underline">API docs</Link>
            <Link href="/api/openapi" className="text-[#B10725] hover:underline">OpenAPI JSON</Link>
            <Link href="/" className="text-[#B10725] hover:underline">Back to catalog</Link>
          </div>
        </section>
      </aside>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  required,
  disabled,
  className
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <label className={`space-y-2 text-sm font-medium text-slate-700 ${className ?? ""}`}>
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} required={required} disabled={disabled} className="w-full rounded-xl border border-slate-300 px-4 py-3 disabled:bg-slate-100" />
    </label>
  );
}
