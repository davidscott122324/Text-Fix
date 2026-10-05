import React from "react";
import { Cpu, UserCheck, FileSearch, GraduationCap, Globe } from "lucide-react";

export default function PhilosophySection() {
  const steps = [
    {
      num: "01",
      title: "AI-Assisted Discovery",
      desc: "Systematic computational screening flags potential anomalies, contradictory text, or typographical oddities across digital drafts.",
      icon: Cpu,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      num: "02",
      title: "Human Investigation",
      desc: "A researcher manually checks the physical printed textbook, corroborates context, and checks whether the statement is legitimately flawed.",
      icon: UserCheck,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
    {
      num: "03",
      title: "Evidence Corroboration",
      desc: "Academic citations, international scientific nomenclature, and national curricula standards are compiled into an airtight proof.",
      icon: FileSearch,
      color: "text-sky-600 bg-sky-50 border-sky-200",
    },
    {
      num: "04",
      title: "Subject Expert Review",
      desc: "Qualified biology teachers and academics independently evaluate the suggested correction and either approve, request revision, or flag.",
      icon: GraduationCap,
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      num: "05",
      title: "Open Public Publication",
      desc: "Approved corrections are indexed into our open database with full page numbers, original excerpts, and transparent rationale.",
      icon: Globe,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Rigorous 5-Stage Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AI is Not the Final Authority.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            At TextFix, we believe artificial intelligence is a useful investigative tool, but never
            an autonomous publisher of truth. Every published record follows an unbroken chain of
            human verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="relative rounded-2xl p-6 bg-slate-50/70 border border-slate-200 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="text-2xl font-black text-slate-300 mb-4">{s.num}</div>
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${s.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
