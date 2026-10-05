import React from "react";
import Link from "next/link";
import HeroFloating from "@/components/HeroFloating";
import StatsSection from "@/components/StatsSection";
import HighSchoolCoverage from "@/components/HighSchoolCoverage";
import PhilosophySection from "@/components/PhilosophySection";
import CorrectionCard from "@/components/CorrectionCard";
import { db } from "@/lib/db";
import { ArrowRight, BookOpen, Send, Download } from "lucide-react";

export default function HomePage() {
  const { items: featuredCorrections } = db.getCorrections({
    unitId: "g11-bio-unit-1",
    publicationStatus: "Published",
    limit: 6,
  });

  return (
    <div>
      {/* 1. Slow-Motion Floating Hero */}
      <HeroFloating />

      {/* 2. Dynamically Calculated Database Stats */}
      <StatsSection />

      {/* 3. National High School Coverage Matrix */}
      <HighSchoolCoverage />

      {/* 4. Active Launch: Grade 11 Biology Unit 1 Showcase */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Active Research Publication</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Grade 11 Biology &bull; Unit 1: Biology and Technology
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl">
                Approximately 166 errors and discrepancies systematically identified across Units 1
                and 2. Below are verified records from Pages 1–10.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <Link
                href="/grades/grade-11/biology/unit-1"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <span>Browse All Unit 1 Corrections</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Unit 1 PDF Notice Banner */}
          <div className="mb-8 p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-sm text-blue-900">
              <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>
                <strong>Unit 1 Correction Sheet PDF</strong> is compiled and available for offline classroom use.
              </span>
            </div>
            <a
              href="/reports/Grade-11-Biology-Unit-1-Correction-Report.pdf"
              download
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-white border border-blue-300 text-xs font-semibold text-blue-700 hover:bg-blue-50 shadow-sm transition-colors flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Unit 1 PDF Report</span>
            </a>
          </div>

          {/* Grid of sample verified corrections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCorrections.map((correction) => (
              <CorrectionCard key={correction.id} correction={correction} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Verification Rigor Philosophy */}
      <PhilosophySection />

      {/* 6. Community Submission Callout */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Help Verify Ethiopian Textbooks
          </h2>
          <p className="mt-3 text-base text-blue-200 max-w-2xl mx-auto">
            Are you a student, teacher, or educational researcher who noticed an error or
            misleading diagram in any New Curriculum textbook (Grades 9–12)? Submit it to our research queue.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/submit"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg transition-all hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>Submit a Suspected Error</span>
            </Link>
          </div>
          <p className="mt-4 text-xs text-blue-300/80">
            All submissions enter Pending Review and are independently verified before publication.
          </p>
        </div>
      </section>
    </div>
  );
}
