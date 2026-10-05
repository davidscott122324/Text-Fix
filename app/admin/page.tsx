import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  FileCheck2,
  PlusCircle,
  UploadCloud,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function AdminOverviewPage() {
  const stats = db.getStats();
  const submissions = db.getSubmissions();
  const pendingSubmissions = submissions.filter((s) => s.status === "Pending");
  const { items: recentCorrections } = db.getCorrections({ limit: 5 });

  return (
    <div className="space-y-6">
      {/* Top Welcome Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Administrator Overview</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage corrections, review incoming public submissions, and bulk import research sheets for Ethiopia&apos;s New Curriculum.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-center">
            <div className="text-2xl font-black text-blue-900">{stats.totalCorrections}</div>
            <div className="text-[11px] text-blue-700 font-medium">Seeded Corrections</div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-center">
            <div className="text-2xl font-black text-emerald-800">{stats.publishedCorrections}</div>
            <div className="text-[11px] text-emerald-700 font-medium">Published Corrections</div>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100 text-center">
            <div className="text-2xl font-black text-amber-800">{pendingSubmissions.length}</div>
            <div className="text-[11px] text-amber-700 font-medium">Pending Submissions</div>
          </div>
          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 text-center">
            <div className="text-2xl font-black text-purple-800">{stats.needsReviewCorrections}</div>
            <div className="text-[11px] text-purple-700 font-medium">Needs Expert Review</div>
          </div>
        </div>
      </div>

      {/* Quick Action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/corrections/new"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                Add Single Correction
              </div>
              <div className="text-xs text-slate-500">Manual entry for a textbook page</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/admin/import"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                Bulk CSV / JSON Importer
              </div>
              <div className="text-xs text-slate-500">Import research sheets for Unit 1 &amp; 2</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Recent corrections table snippet */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Recent Corrections in Database
          </h2>
          <Link href="/admin/corrections" className="text-xs font-semibold text-blue-600 hover:underline">
            View All ({stats.totalCorrections}) &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="pb-2 font-semibold">Ref Code</th>
                <th className="pb-2 font-semibold">Page</th>
                <th className="pb-2 font-semibold">Category</th>
                <th className="pb-2 font-semibold">Status</th>
                <th className="pb-2 font-semibold">Title</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentCorrections.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80">
                  <td className="py-2.5 font-mono font-bold text-blue-900">{c.refCode}</td>
                  <td className="py-2.5 text-slate-600">Page {c.pageNumber}</td>
                  <td className="py-2.5 text-slate-600">{c.category}</td>
                  <td className="py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        c.researchStatus === "Needs Expert Review"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {c.researchStatus}
                    </span>
                  </td>
                  <td className="py-2.5 font-medium text-slate-800 max-w-xs truncate">{c.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
