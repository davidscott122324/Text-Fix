import React from "react";
import Link from "next/link";
import { Mail, BookCheck, Users, Target, Shield } from "lucide-react";

export const metadata = {
  title: "About Us — TextFix | Ethiopian High School Textbook Corrections",
  description: "Learn about TextFix, our mission across Grades 9–12 textbooks, and contact us at info.textfix@gmail.com.",
};

export default function AboutPage() {
  return (
    <div className="py-14 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            About The Initiative
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            About TextFix
          </h1>
          <p className="text-slate-600 text-base mt-3 max-w-2xl mx-auto">
            Evidence-based corrections for Ethiopia's New Curriculum textbooks.
          </p>
        </div>

        {/* Contact Us Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-md mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                Official Correspondence
              </span>
              <h2 className="text-xl font-bold">Contact Our Research Team</h2>
              <p className="text-xs text-blue-200">
                For inquiries, institutional partnerships, expert reviews, or suggestions.
              </p>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/20">
              <Mail className="w-5 h-5 text-emerald-400" />
              <a
                href="mailto:info.textfix@gmail.com"
                className="text-white hover:text-emerald-300 font-bold text-sm underline"
              >
                info.textfix@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Core Sections */}
        <div className="space-y-8 text-slate-700 leading-relaxed bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">What is TextFix?</h2>
            <p className="text-sm">
              TextFix is an independent educational research initiative designed to systematically
              identify, investigate, document, peer-review, and openly publish verified corrections to
              textbooks produced under <strong>Ethiopia's New Curriculum</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Nationwide High School Scope</h2>
            <p className="text-sm">
              While our initial public release focuses on <strong>Grade 11 Biology (Units 1 & 2)</strong>,
              TextFix is architected to encompass <strong>all high school grades (9, 10, 11, and 12)</strong> and
              academic subjects, including Biology, Chemistry, Physics, Mathematics, Information Technology, English,
              Economics, Geography, and History.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Why Does TextFix Exist?</h2>
            <p className="text-sm">
              Ethiopia's recent curriculum reform is a monumental educational endeavor. When millions of
              secondary school students study from newly published textbooks, unintended typographical,
              scientific, and grammatical inaccuracies can lead to confusion during national university
              entrance examinations and classroom instruction. TextFix serves as a bridge of clarity for students and teachers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Our Principles</h2>
            <ul className="list-disc pl-5 text-sm space-y-1.5 text-slate-600">
              <li><strong>Zero Fabricated Content:</strong> We never invent errors, expert names, or citations.</li>
              <li><strong>Constructive & Respectful:</strong> We critique statements, never individuals or institutions.</li>
              <li><strong>Academic Rigor:</strong> AI assists in screening, but qualified humans make all final verifications.</li>
              <li><strong>Student-Centered:</strong> Free and openly accessible to every learner in Ethiopia.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
