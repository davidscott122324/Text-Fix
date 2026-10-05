import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Brand & Contact info */}
          <div className="md:col-span-2 space-y-4">
            <div className="relative h-12 w-40">
              <Image
                src="/images/logo.png"
                alt="TextFix Logo"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              TextFix is an evidence-based, transparent public research platform dedicated to
              identifying, investigating, and publishing verified corrections for
              Ethiopia's New Curriculum high school textbooks (Grades 9–12).
            </p>

            {/* Direct Contact Requirement */}
            <div className="pt-2">
              <div className="inline-flex items-center space-x-2.5 px-3.5 py-2 rounded-lg bg-slate-800/90 border border-slate-700/80 text-blue-400 font-medium text-sm">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Contact us:</span>
                <a
                  href="mailto:info.textfix@gmail.com"
                  className="text-white hover:text-emerald-300 underline font-semibold transition-colors"
                >
                  info.textfix@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Scope & Grades */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Curriculum Scope
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/grades/grade-11/biology/unit-1"
                  className="hover:text-emerald-400 transition-colors flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Grade 11 Biology (Active)</span>
                </Link>
              </li>
              <li>
                <Link href="/textbooks" className="hover:text-white transition-colors">
                  Grade 9 Textbooks
                </Link>
              </li>
              <li>
                <Link href="/textbooks" className="hover:text-white transition-colors">
                  Grade 10 Textbooks
                </Link>
              </li>
              <li>
                <Link href="/textbooks" className="hover:text-white transition-colors">
                  Grade 11 STEM & Social
                </Link>
              </li>
              <li>
                <Link href="/textbooks" className="hover:text-white transition-colors">
                  Grade 12 Textbooks
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Research */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Platform & Integrity
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/methodology" className="hover:text-white transition-colors">
                  Verification Methodology
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About TextFix
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-white transition-colors">
                  Submit Suspected Error
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Researcher Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Fair Use & Attribution Notice */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-400 space-y-2">
          <p>
            <strong>Academic Integrity & Copyright Notice:</strong> TextFix provides non-profit
            educational commentary, factual correction, and academic critique under international
            fair use principles. TextFix does not reproduce full copyrighted textbooks; only brief
            factual statements strictly necessary to identify and correct educational errors are
            referenced.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <p>&copy; {new Date().getFullYear()} TextFix. Your Textbooks, Perfected.</p>
            <div className="flex items-center space-x-4">
              <span>Ethiopia New Curriculum Initiative</span>
              <span>&bull;</span>
              <a href="mailto:info.textfix@gmail.com" className="hover:text-slate-200">
                info.textfix@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
