import React from "react";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center mb-4">
          <FileQuestion className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">404 — Page Not Found</h1>
        <p className="text-slate-600 text-sm mt-2">
          The requested textbook unit or correction record could not be found or has not yet been published.
        </p>
        <div className="mt-6 flex justify-center space-x-3">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/grades/grade-11/biology/unit-1"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-sm transition-colors"
          >
            <span>Browse Unit 1</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
