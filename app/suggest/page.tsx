import { SuggestionForm } from "@/components/suggestion-form";
import { getCatalogServices } from "@/lib/catalog-store";

export const dynamic = "force-dynamic";

export default async function SuggestPage() {
  const services = await getCatalogServices();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SuggestionForm services={services} />
      </div>
    </main>
  );
}
