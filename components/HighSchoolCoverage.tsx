import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { CheckCircle, Clock, ChevronRight } from "lucide-react";

export default function HighSchoolCoverage() {
  const grades = db.getGrades();

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              National High School Framework
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Ethiopian New Curriculum Coverage
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              TextFix is architected to systematically review all high school textbooks (Grades 9, 10,
              11, and 12). Grade 11 Biology Unit 1 is our flagship active release; additional units and
              subjects are rolled out following rigorous verification.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/textbooks"
              className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>Explore all textbooks</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Grade Tabs & Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {grades.map((grade) => {
            const isGrade11 = grade.slug === "grade-11";
            return (
              <div
                key={grade.id}
                className={`rounded-2xl p-6 border transition-all ${
                  isGrade11
                    ? "bg-white border-blue-200 shadow-md ring-2 ring-blue-500/10"
                    : "bg-white/80 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{grade.name}</h3>
                  {isGrade11 ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      Active Launch
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      Scheduled
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 mb-4">
                  Ethiopian New Curriculum textbooks for {grade.name} students and educators.
                </p>

                <div className="space-y-2.5">
                  {isGrade11 ? (
                    <>
                      <Link
                        href="/grades/grade-11/biology/unit-1"
                        className="block p-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/80 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-blue-900 group-hover:text-blue-700">
                            Biology &bull; Unit 1
                          </span>
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-xs text-emerald-700 font-medium">
                          Verified Research Available &rarr;
                        </span>
                      </Link>

                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                        <span>Chemistry</span>
                        <span className="text-[11px] text-amber-600 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Under Review</span>
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                        <span>Physics</span>
                        <span className="text-[11px] text-amber-600 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Under Review</span>
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                        <span>Mathematics</span>
                        <span className="text-[11px] text-amber-600 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Under Review</span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2 text-xs text-slate-500">
                      <div className="p-2.5 rounded-lg bg-slate-50/60 border border-slate-100 flex items-center justify-between">
                        <span>STEM (Bio, Chem, Phys, Math)</span>
                        <span className="text-[10px] text-slate-400">Scheduled</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50/60 border border-slate-100 flex items-center justify-between">
                        <span>Information Technology</span>
                        <span className="text-[10px] text-slate-400">Scheduled</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50/60 border border-slate-100 flex items-center justify-between">
                        <span>Social Sciences & Humanities</span>
                        <span className="text-[10px] text-slate-400">Scheduled</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
