import React from "react";
import Link from "next/link";
import { Cpu, UserCheck, FileText, CheckCircle2, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Verification Methodology — TextFix",
  description: "The evidence-based 5-step scientific verification methodology of TextFix.",
};

export default function MethodologyPage() {
  return (
    <div className="py-14 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Scientific Rigor & Ethics
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            Our Verification Methodology
          </h1>
          <p className="text-slate-600 text-base mt-3 max-w-2xl mx-auto">
            How TextFix investigates, corroborates, and verifies errors in Ethiopia's New Curriculum textbooks.
          </p>
        </div>

        {/* AI Philosophy Box */}
        <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 mb-12">
          <div className="flex items-start space-x-3">
            <ShieldAlert className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-bold text-amber-950">
                Core Philosophy: AI is NOT the Final Authority
              </h2>
              <p className="text-sm text-amber-900/90 mt-1 leading-relaxed">
                TextFix uses AI assistance solely to scan text for possible grammatical anomalies,
                spelling discrepancies, and terminology mismatches. <strong>AI findings are never accepted as facts.</strong> Every
                potential issue is manually cross-checked against the original physical textbook,
                independently researched with academic sources, reviewed by human experts, and
                verified before publication.
              </p>
            </div>
          </div>
        </div>

        {/* 5-Step Deep Dive */}
        <div className="space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="text-lg font-bold text-slate-900">Step 1: Systematic Identification</h3>
            <p className="text-sm text-slate-600 mt-1">
              Textbook chapters are reviewed page by page using dual reading protocols. Suspected
              errors in science, mathematics, grammar, figure references, and definitions are logged into our draft queue.
            </p>
          </div>

          <div className="border-l-4 border-indigo-600 pl-4">
            <h3 className="text-lg font-bold text-slate-900">Step 2: Human Verification of Original Textbook</h3>
            <p className="text-sm text-slate-600 mt-1">
              A researcher directly examines the printed Ethiopian New Curriculum textbook to ensure the
              excerpt is quoted verbatim and has not been taken out of context.
            </p>
          </div>

          <div className="border-l-4 border-sky-600 pl-4">
            <h3 className="text-lg font-bold text-slate-900">Step 3: Independent Evidence Research</h3>
            <p className="text-sm text-slate-600 mt-1">
              The researcher consults peer-reviewed journals, authoritative international scientific bodies
              (e.g., IUPAC, NCBI, geodetic standards), and linguistic references to establish an airtight, documented rationale.
            </p>
          </div>

          <div className="border-l-4 border-amber-600 pl-4">
            <h3 className="text-lg font-bold text-slate-900">Step 4: Subject Expert Review</h3>
            <p className="text-sm text-slate-600 mt-1">
              Qualified Ethiopian educators, university lecturers, and subject specialists review the draft.
              Items are marked as <em>Needs Expert Review</em>, <em>Expert Reviewed</em>, or revised according to feedback.
            </p>
          </div>

          <div className="border-l-4 border-emerald-600 pl-4">
            <h3 className="text-lg font-bold text-slate-900">Step 5: Public Publication & Transparency</h3>
            <p className="text-sm text-slate-600 mt-1">
              Approved entries are published to our open database with stable URLs, complete page references,
              and downloadable PDF reports for classroom teachers and students.
            </p>
          </div>
        </div>

        {/* Academic Tone & Goal */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-100 border border-slate-200 text-sm text-slate-700 space-y-2">
          <h4 className="font-bold text-slate-900">Commitment to Constructive Tone</h4>
          <p>
            TextFix maintains a calm, objective, and supportive academic tone. Our goal is to assist
            Ethiopian students and support the Ministry of Education in refining future textbook reprints,
            not to attack authors, institutions, or publishers.
          </p>
        </div>
      </div>
    </div>
  );
}
