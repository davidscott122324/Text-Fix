import React from "react";
import Link from "next/link";
import { Correction } from "@/lib/types";
import { ArrowRight, Layers } from "lucide-react";

interface CorrectionCardProps {
  correction: Correction;
  unitSlug?: string;
  gradeSlug?: string;
  subjectSlug?: string;
}

export default function CorrectionCard({
  correction,
  unitSlug = "unit-1",
  gradeSlug = "grade-11",
  subjectSlug = "biology",
}: CorrectionCardProps) {
  const detailUrl = `/grades/${gradeSlug}/${subjectSlug}/${unitSlug}/${correction.refCode.toLowerCase()}`;

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "Critical":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Moderate":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Needs Expert Review":
        return "bg-purple-50 text-purple-700 border-purple-200 font-semibold";
      case "Expert Reviewed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group">
      <div>
        {/* Header row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {correction.refCode}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded border bg-slate-50 text-slate-700 border-slate-200">
              Page {correction.pageNumber}
            </span>
          </div>

          <span
            className={`text-xs px-2.5 py-0.5 rounded-full border ${getStatusBadge(
              correction.researchStatus
            )}`}
          >
            {correction.researchStatus}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
          {correction.title}
        </h3>

        {/* Category & Severity Pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 font-medium">
            {correction.category}
          </span>
          <span
            className={`text-[11px] px-2 py-0.5 rounded border font-medium ${getSeverityBadge(
              correction.severity
            )}`}
          >
            {correction.severity} Severity
          </span>
          {correction.isRecurring && (
            <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium flex items-center space-x-1">
              <Layers className="w-3 h-3" />
              <span>Recurring on pages {correction.affectedPages?.join(", ")}</span>
            </span>
          )}
        </div>

        {/* Original Text Excerpt */}
        <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3 font-mono line-clamp-3">
          <span className="text-slate-400 font-semibold block not-mono text-[10px] uppercase tracking-wider mb-1">
            Original Textbook Text:
          </span>
          &ldquo;{correction.originalText}&rdquo;
        </div>

        {/* Issue summary */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4">
          <strong className="text-slate-800">Issue:</strong> {correction.issue}
        </p>
      </div>

      {/* Footer link */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">Full research details</span>
        <Link
          href={detailUrl}
          className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 group-hover:text-blue-700"
        >
          <span>View Correction</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
