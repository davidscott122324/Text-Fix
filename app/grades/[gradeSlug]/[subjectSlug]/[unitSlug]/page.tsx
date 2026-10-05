import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import CorrectionCard from "@/components/CorrectionCard";
import {
  BookOpen,
  Download,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Search,
  Filter,
  ArrowLeft,
  Info,
} from "lucide-react";

interface UnitPageProps {
  params: {
    gradeSlug: string;
    subjectSlug: string;
    unitSlug: string;
  };
  searchParams: {
    page?: string;
    category?: string;
    severity?: string;
    status?: string;
    q?: string;
  };
}

export async function generateMetadata({ params }: UnitPageProps) {
  const grade = db.getGradeBySlug(params.gradeSlug);
  const subject = db.getSubjectBySlug(params.subjectSlug);
  return {
    title: `${grade?.name || "Grade 11"} ${subject?.name || "Biology"} Unit 1 Corrections — TextFix`,
    description: `Verified corrections and errata for Ethiopian New Curriculum ${grade?.name} ${subject?.name} Unit 1.`,
  };
}

export default function UnitPage({ params, searchParams }: UnitPageProps) {
  const { gradeSlug, subjectSlug, unitSlug } = params;
  const grade = db.getGradeBySlug(gradeSlug);
  const subject = db.getSubjectBySlug(subjectSlug);
  const textbook = grade && subject ? db.getTextbooksByGradeAndSubject(grade.id, subject.id) : undefined;
  const unit = textbook ? db.getUnitBySlug(textbook.id, unitSlug) : undefined;

  if (!grade || !subject || !textbook || !unit) {
    notFound();
  }

  // Handle "Coming Soon" or Under Review units
  if (!unit.isPublished) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
        <div className="max-w-lg text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-4">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Currently Under Systematic Review
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-4">
            {grade.name} {subject.name} &bull; Unit {unit.unitNumber}: {unit.title}
          </h1>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            This unit is currently undergoing systematic research and independent evidence corroboration.
            Verified corrections will be published after expert review is finalized.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/grades/grade-11/biology/unit-1"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Browse Active Unit 1
            </Link>
            <Link
              href="/submit"
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-sm transition-colors"
            >
              Submit an Error for this Unit
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active published unit (Grade 11 Biology Unit 1)
  const selectedPage = searchParams.page ? parseInt(searchParams.page, 10) : undefined;
  const selectedCategory = searchParams.category as any;
  const selectedSeverity = searchParams.severity as any;
  const selectedStatus = searchParams.status as any;
  const query = searchParams.q || "";

  const { items: allUnitCorrections } = db.getCorrections({ unitId: unit.id });
  const { items: filteredCorrections } = db.getCorrections({
    unitId: unit.id,
    pageNumber: selectedPage,
    category: selectedCategory,
    severity: selectedSeverity,
    researchStatus: selectedStatus,
    query: query || undefined,
  });

  const totalIdentified = allUnitCorrections.length;
  const expertReviewedCount = allUnitCorrections.filter((c) => c.researchStatus === "Expert Reviewed").length;
  const needsReviewCount = allUnitCorrections.filter((c) => c.researchStatus === "Needs Expert Review").length;

  const categories = Array.from(new Set(allUnitCorrections.map((c) => c.category))).sort();
  const pages = Array.from(
    new Set(allUnitCorrections.flatMap((c) => [c.pageNumber, ...(c.affectedPages || [])]))
  ).sort((a, b) => a - b);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/textbooks" className="hover:text-blue-600">{grade.name}</Link>
          <span>/</span>
          <span className="text-slate-700">{subject.name}</span>
          <span>/</span>
          <span className="font-semibold text-slate-900">Unit {unit.unitNumber}</span>
        </div>

        {/* Unit Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {grade.name} &bull; {subject.name}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Research Published</span>
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {unit.pageRange}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Unit {unit.unitNumber}: {unit.title}
              </h1>

              <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                {unit.description}
              </p>
            </div>

            {/* PDF Report Download Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 flex-shrink-0">
              <a
                href={unit.pdfUrl || "/reports/Grade-11-Biology-Unit-1-Correction-Report.pdf"}
                download
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download Unit 1 PDF Report</span>
              </a>
              <span className="text-[11px] text-slate-400">
                Official research report sheet
              </span>
            </div>
          </div>

          {/* Real Dynamic Metrics Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-xl sm:text-2xl font-black text-slate-900">{totalIdentified}</div>
              <div className="text-[11px] font-medium text-slate-500">Documented Issues</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-600">{allUnitCorrections.length}</div>
              <div className="text-[11px] font-medium text-slate-500">Published Records</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-xl sm:text-2xl font-black text-purple-600">{needsReviewCount}</div>
              <div className="text-[11px] font-medium text-slate-500">Needs Expert Review</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-xl sm:text-2xl font-black text-blue-600">Pages 1–10</div>
              <div className="text-[11px] font-medium text-slate-500">Initial Data Scope</div>
            </div>
          </div>
        </div>

        {/* Page 1 (Cover) No Errors Found Banner */}
        <div className="mb-6 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Page 1 (Cover):</strong> Thoroughly examined by researcher. <em>No errors found.</em>
            </span>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex-shrink-0">
            Verified Clean
          </span>
        </div>

        {/* Recurring Issue Notice (UNIT 2: ANIMALS header bug) */}
        <div className="mb-8 p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start space-x-3 text-xs sm:text-sm text-amber-900">
          <Layers className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Recurring Layout Issue (P9-02):</strong> The odd-page running header reads &ldquo;UNIT 2: ANIMALS&rdquo;
            across pages <strong>9, 11, 13, 15, 17, and 19</strong> despite the content belonging to Unit 1: Biology &amp; Technology.
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <form method="GET" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search query input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search in unit..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter by Page */}
            <div>
              <select
                name="page"
                defaultValue={selectedPage?.toString() || ""}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Pages (1–10)</option>
                {pages.map((p) => (
                  <option key={p} value={p}>
                    Page {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Category */}
            <div>
              <select
                name="category"
                defaultValue={selectedCategory || ""}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Severity */}
            <div>
              <select
                name="severity"
                defaultValue={selectedSeverity || ""}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Severities</option>
                <option value="Minor">Minor</option>
                <option value="Moderate">Moderate</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            {/* Submit Filter Button */}
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
              >
                Apply Filters
              </button>
              {(selectedPage || selectedCategory || selectedSeverity || query) && (
                <Link
                  href={`/grades/${gradeSlug}/${subjectSlug}/${unitSlug}`}
                  className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center"
                  title="Reset filters"
                >
                  Reset
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* Correction Cards List Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Showing {filteredCorrections.length} of {totalIdentified} Corrections
          </span>
        </div>

        {/* Corrections Grid */}
        {filteredCorrections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCorrections.map((c) => (
              <CorrectionCard
                key={c.id}
                correction={c}
                unitSlug={unitSlug}
                gradeSlug={gradeSlug}
                subjectSlug={subjectSlug}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <Filter className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <h3 className="text-base font-bold text-slate-800">No corrections match your filters</h3>
            <p className="text-xs text-slate-500 mt-1">Try clearing filters or searching for another term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
