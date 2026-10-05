import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { BookOpen, CheckCircle, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "National Curriculum Textbooks (Grades 9–12) — TextFix",
  description: "Browse all Ethiopian New Curriculum high school textbooks across Grades 9, 10, 11, and 12.",
};

export default function TextbooksPage() {
  const grades = db.getGrades();
  const subjects = db.getSubjects();
  const textbooks = db.getTextbooks();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Ethiopia New Curriculum Catalog
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            High School Textbooks (Grades 9–12)
          </h1>
          <p className="text-slate-600 text-sm mt-2 max-w-3xl">
            TextFix covers the complete spectrum of national high school textbooks under the revised
            curriculum. Grade 11 Biology Unit 1 is the active launch subject, while other subjects
            are queued for systematic error investigation.
          </p>
        </div>

        {/* Grade sections */}
        <div className="space-y-12">
          {grades.map((grade) => {
            const gradeTextbooks = textbooks.filter((t) => t.gradeId === grade.id);
            return (
              <div key={grade.id} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{grade.name} Textbooks</h2>
                    <span className="text-xs text-slate-500">
                      National secondary curriculum &bull; First Edition (2023/2024)
                    </span>
                  </div>
                  {grade.slug === "grade-11" ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-xs">
                      Active Research Hub
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-xs">
                      Scheduled for Review
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gradeTextbooks.map((tb) => {
                    const isActive = tb.status === "Active";
                    const subject = subjects.find((s) => s.id === tb.subjectId);
                    return (
                      <div
                        key={tb.id}
                        className={`rounded-xl p-5 border flex flex-col justify-between ${
                          isActive
                            ? "bg-blue-50/40 border-blue-200 shadow-sm"
                            : "bg-slate-50/50 border-slate-200"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              {subject?.name}
                            </span>
                            {isActive ? (
                              <span className="flex items-center space-x-1 text-xs text-emerald-700 font-semibold">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Active</span>
                              </span>
                            ) : (
                              <span className="flex items-center space-x-1 text-xs text-amber-600 font-medium">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{tb.status}</span>
                              </span>
                            )}
                          </div>

                          <h3 className="text-base font-bold text-slate-900 mb-2">
                            {tb.title}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-3 mb-4">
                            {tb.description}
                          </p>
                        </div>

                        <div>
                          {isActive ? (
                            <Link
                              href="/grades/grade-11/biology/unit-1"
                              className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors"
                            >
                              <span>Explore Unit 1 Corrections</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          ) : (
                            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/80">
                              <span>Review pending publication</span>
                              <Link href="/submit" className="text-blue-600 hover:underline font-medium">
                                Submit Error
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
