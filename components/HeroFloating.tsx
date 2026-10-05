"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
} from "lucide-react";

export default function HeroFloating() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-sky-50/70 via-white to-slate-50">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-300/20 via-sky-200/30 to-amber-200/20 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/80 text-blue-800 text-xs sm:text-sm font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Ethiopia's New Curriculum Educational Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Your Textbooks,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-emerald-600">
                Perfected.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
              Evidence-based, transparent corrections for Ethiopia's New Curriculum high school
              textbooks. Researched with scientific rigor, human-verified, and openly published for
              students and teachers nationwide.
            </p>

            {/* Scope pill tags */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
              <span className="px-3 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-sm">
                Grade 11 Biology &bull; 166 Identified Issues
              </span>
              <span className="px-3 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-sm">
                Grades 9–12 Curriculum
              </span>
              <span className="px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 shadow-sm flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero AI Hallucinations &bull; Human Verified</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center lg:justify-start">
              <Link
                href="/grades/grade-11/biology/unit-1"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02]"
              >
                <span>Explore Unit 1 Corrections</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/methodology"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-sm transition-all hover:scale-[1.02]"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>How We Verify</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Slow-Motion Floating Hero Visual with Interactive Depth */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Soft background pulse glow */}
            <div className="absolute inset-0 max-w-lg mx-auto bg-gradient-to-tr from-sky-400/20 via-blue-500/20 to-emerald-400/20 rounded-3xl blur-2xl animate-soft-pulse -z-10" />

            {/* The Main Hover Floating Container */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transition: "transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)",
              }}
              className="relative w-full max-w-lg aspect-[16/9] sm:aspect-[16/10] rounded-2xl shadow-2xl overflow-hidden border-4 border-white/80 bg-slate-900 group cursor-pointer"
            >
              <Image
                src="/images/hero-floating.jpg"
                alt="Students soaring with textbooks - TextFix: Your Textbooks, Perfected."
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Atmospheric Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                  Ethiopian New Curriculum Research
                </div>
                <div className="text-lg sm:text-xl font-bold">
                  Active Focus: Grade 11 Biology
                </div>
              </div>
            </div>

            {/* Slow-Motion Floating Badge 1: Top Right */}
            <div className="absolute -top-6 -right-2 sm:-right-4 animate-float-slow hidden sm:block z-20">
              <div className="glass-card px-3.5 py-2.5 rounded-xl flex items-center space-x-2.5 shadow-xl border border-white/80">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">P8-02 Fixed</div>
                  <div className="text-[11px] text-slate-500">Grammar & clarity corrected</div>
                </div>
              </div>
            </div>

            {/* Slow-Motion Floating Badge 2: Bottom Left */}
            <div className="absolute -bottom-6 -left-2 sm:-left-6 animate-float-slower hidden sm:block z-20">
              <div className="glass-card px-3.5 py-2.5 rounded-xl flex items-center space-x-2.5 shadow-xl border border-white/80">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">P10-02 Verified</div>
                  <div className="text-[11px] text-slate-500">GPS Definition corrected</div>
                </div>
              </div>
            </div>

            {/* Slow-Motion Floating Badge 3: Center Bottom Mobile & Desktop */}
            <div className="absolute -bottom-8 right-8 animate-float-gentle hidden lg:block z-20">
              <div className="glass-card px-3 py-1.5 rounded-full flex items-center space-x-2 shadow-lg border border-white/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold text-slate-700">
                  Unit 1 Research Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
