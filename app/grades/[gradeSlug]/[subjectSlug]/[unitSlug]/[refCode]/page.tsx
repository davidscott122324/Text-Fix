import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  BookOpen,
  Share2,
  Layers,
  Info,
  ExternalLink,
} from "lucide-react";

interface CorrectionDetailProps {
  params: {
    gradeSlug: string;
    subjectSlug: string;
    unitSlug: string;
    refCode: string;
  };
}

export async function generateMetadata({ params }: CorrectionDetailProps) {
  const { gradeSlug, subjectSlug, unitSlug, refCode } = params;
  const grade = db.getGradeBySlug(gradeSlug);
  const subject = db.getSubjectBySlug(subjectSlug);
  const textbook = grade && subject ? db.getTextbooksByGradeAndSubject(grade.id, subject.id) : undefined;
  const unit = textbook ? db.getUnitBySlug(textbook.id, unitSlug) : undefined;
  const correction = unit ? db.getCorrectionByRefCode(unit.id, refCode) : undefined;

  if (!correction) {
    return { title: "Correction Not Found — TextFix" };
  }

  return {
    title: `${correction.refCode} (${correction.category}) — Page ${correction.pageNumber} | ${grade?.name} ${subject?.name}`,
    description: `Verified correction for Ethiopian New Curriculum ${grade?.name} ${subject?.name} Page ${correction.pageNumber}. ${correction.issue}`,
    openGraph: {
      title: `${correction.refCode}: ${correction.title} — TextFix`,
      description: `Original: "${correction.originalText.slice(0, 100)}..." -> Corrected: "${correction.suggestedCorrection.slice(0, 100)}..."`,
    },
  };
}

export default function CorrectionDetailPage({ params }: CorrectionDetailProps) {
  const { gradeSlug, subjectSlug, unitSlug, refCode } = params;
  const grade = db.getGradeBySlug(gradeSlug);
  const subject = db.getSubjectBySlug(subjectSlug);
  const textbook = grade && subject ? db.getTextbooksByGradeAndSubject(grade.id, subject.id) : undefined;
  const unit = textbook ? db.getUnitBySlug(textbook.id, unitSlug) : undefined;
  const correction = unit ? db.getCorrectionByRefCode(unit.id, refCode) : undefined;

  if (!grade || !subject || !textbook || !unit || !correction) {
    notFound();
  }

  const unitUrl = `/grades/${gradeSlug}/${subjectSlug}/${unitSlug}`;

  // JSON-LD structured data for academic SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Correction",
    "name": `${correction.refCode}: ${correction.title}`,
    "about": {
      "@type": "Book",
      "name": textbook.title,
      "isPartOf": "Ethiopian New Curriculum",
    },
    "text": correction.suggestedCorrection,
    "description": correction.issue,
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link & Breadcrumbs */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Link
            href={unitUrl}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Unit {unit.unitNumber} Corrections</span>
          </Link>

          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <span>{grade.name}</span>
            <span>&bull;</span>
            <span>{subject.name}</span>
            <span>&bull;</span>
            <span>Unit {unit.unitNumber}</span>
            <span>&bull;</span>
            <span className="font-mono font-bold text-slate-900">{correction.refCode}</span>
          </div>
        </div>

        {/* Main Research Card */}
        <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          {/* Top Card Header */}
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-b from-slate-50/60 to-white">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xl font-black text-blue-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                  {correction.refCode}
                </span>
                <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                  Textbook Page {correction.pageNumber}
                </span>
              </div>

              {/* Research status pill */}
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                  correction.researchStatus === "Needs Expert Review"
                    ? "bg-purple-50 text-purple-700 border-purple-200"
                    : correction.researchStatus === "Expert Reviewed"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }`}
              >
                {correction.researchStatus}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              {correction.title}
            </h1>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs px-2.5 py-1 rounded bg-blue-50 text-blue-800 font-medium border border-blue-100">
                Category: {correction.category}
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-medium border border-slate-200">
                Severity: {correction.severity}
              </span>
              {correction.chapterSection && (
                <span className="text-xs px-2.5 py-1 rounded bg-slate-50 text-slate-700 border border-slate-200">
                  Section: {correction.chapterSection}
                </span>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Section 1: Original Textbook Text */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>Original Textbook Statement (Page {correction.pageNumber})</span>
                </h2>
              </div>
              <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 text-rose-950 font-mono text-sm sm:text-base leading-relaxed">
                &ldquo;{correction.originalText}&rdquo;
              </div>
            </div>

            {/* Section 2: Why it needs a fix */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Why It Needs A Fix (Identified Issue)</span>
              </h2>
              <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200 text-slate-800 text-sm sm:text-base leading-relaxed">
                {correction.issue}
              </div>
            </div>

            {/* Section 3: Suggested Correction */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Suggested Correction</span>
              </h2>
              <div className="p-5 rounded-xl bg-emerald-50/60 border-2 border-emerald-400 text-emerald-950 font-semibold text-sm sm:text-base leading-relaxed">
                &ldquo;{correction.suggestedCorrection}&rdquo;
              </div>
            </div>

            {/* Section 4: Evidence & Scientific Corroboration */}
            {correction.evidence && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Evidence &amp; Academic Corroboration</span>
                </h2>
                <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-200 text-slate-800 text-sm leading-relaxed">
                  {correction.evidence}
                </div>
              </div>
            )}

            {/* Section 5: Recurring Pages */}
            {correction.isRecurring && correction.affectedPages && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                <Layers className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Recurring Discrepancy
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    This same underlying issue occurs on multiple pages throughout the unit:{" "}
                    <strong>Pages {correction.affectedPages.join(", ")}</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* Section 6: Related References (e.g. P3-03 pairs with P4-01) */}
            {correction.relatedRefCodes && correction.relatedRefCodes.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-700">
                  <strong>Related Research Records:</strong>
                  <div className="flex gap-2 mt-1">
                    {correction.relatedRefCodes.map((rc) => (
                      <Link
                        key={rc}
                        href={`/grades/${gradeSlug}/${subjectSlug}/${unitSlug}/${rc.toLowerCase()}`}
                        className="font-mono text-xs font-bold text-blue-700 hover:underline bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                      >
                        {rc} &rarr;
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Section 7: Expert Review Transparency Disclaimer */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600 space-y-2">
              <div className="flex items-center space-x-2 text-slate-900 font-bold">
                <Info className="w-4 h-4 text-blue-600" />
                <span>Verification & Review Transparency</span>
              </div>
              {correction.researchStatus === "Needs Expert Review" ? (
                <p>
                  <strong>Flagged for Expert Verification:</strong> This item has been documented and
                  investigated by our researchers, and is explicitly flagged for secondary review by a qualified
                  subject specialist or classroom teacher before formal endorsement.
                </p>
              ) : (
                <p>
                  This correction was manually cross-checked against the official printed textbook,
                  investigated with peer-reviewed scientific sources, and prepared under our rigorous
                  verification methodology.
                </p>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
