import React from "react";
import { db } from "@/lib/db";
import { FileCheck, BookOpen, Layers, CheckCircle } from "lucide-react";

export default function StatsSection() {
  const stats = db.getStats();

  return (
    <section className="border-y border-slate-200 bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Real Database Records
          </h2>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            Transparent Research Verification Metrics
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <FileCheck className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {stats.totalCorrections}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              Active Unit 1 Records Seeded
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
              {stats.publishedCorrections}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              Published Corrections
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600">
              {stats.needsReviewCorrections}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              Flagged For Expert Review
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {stats.gradesCount} Grades &bull; {stats.subjectsCount} Subjects
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              National High School Architecture
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
