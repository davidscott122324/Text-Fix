import React from "react";
import { db } from "@/lib/db";
import CorrectionCard from "@/components/CorrectionCard";
import { Search, Filter } from "lucide-react";

export const metadata = {
  title: "Global Search — TextFix",
  description: "Search across Ethiopian New Curriculum textbook statements, page numbers, and corrections.",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; severity?: string; page?: string };
}) {
  const query = searchParams.q || "";
  const category = searchParams.category as any;
  const severity = searchParams.severity as any;
  const pageNum = searchParams.page ? parseInt(searchParams.page, 10) : undefined;

  const { items: results, total } = db.getCorrections({
    query: query || undefined,
    category: category || undefined,
    severity: severity || undefined,
    pageNumber: pageNum,
    publicationStatus: "Published",
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Search Corrections</h1>
          <p className="text-slate-600 text-sm mt-1">
            Search textbook statements, concepts (e.g. GPS, Eastgate, CITS, electrophoresis), reference codes, or page numbers.
          </p>
        </div>

        {/* Search bar form */}
        <form method="GET" action="/search" className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search words, original statements, ref code (e.g. P8-02), or concept..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Result summary */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
          <span className="text-sm font-medium text-slate-700">
            Found <strong>{total}</strong> {total === 1 ? "correction" : "corrections"}
            {query && <span> for &ldquo;{query}&rdquo;</span>}
          </span>
        </div>

        {/* Results grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((c) => (
              <CorrectionCard key={c.id} correction={c} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <Filter className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No matching corrections found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
              Try searching for a simpler term such as &ldquo;GPS&rdquo;, &ldquo;Eastgate&rdquo;, &ldquo;Grammar&rdquo;, or browsing Unit 1.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
