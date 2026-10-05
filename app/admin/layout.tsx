import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  LayoutDashboard,
  FileCheck2,
  PlusCircle,
  UploadCloud,
  Inbox,
  ArrowLeft,
  Shield,
} from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin sub-header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Ethiopian New Curriculum Content Management System
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <span className="text-slate-300">
              Logged in as: <strong>{user.name}</strong> ({user.role})
            </span>
            <Link
              href="/"
              className="inline-flex items-center space-x-1 text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-2">
            <nav className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm space-y-1">
              <Link
                href="/admin"
                className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-slate-400" />
                <span>Overview &amp; Statistics</span>
              </Link>
              <Link
                href="/admin/corrections"
                className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                <FileCheck2 className="w-4 h-4 text-slate-400" />
                <span>All Corrections</span>
              </Link>
              <Link
                href="/admin/corrections/new"
                className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-slate-400" />
                <span>Add Single Correction</span>
              </Link>
              <Link
                href="/admin/import"
                className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                <UploadCloud className="w-4 h-4 text-slate-400" />
                <span>CSV / JSON Bulk Importer</span>
              </Link>
              <Link
                href="/admin/submissions"
                className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                <Inbox className="w-4 h-4 text-slate-400" />
                <span>Public Submissions Queue</span>
              </Link>
            </nav>
          </aside>

          {/* Main admin area */}
          <main className="lg:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
