"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Search, Edit2, Trash2, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Correction } from "@/lib/types";

export default function AdminCorrectionsPage() {
  const [corrections, setCorrections] = useState<Correction[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCorrections = () => {
    setLoading(true);
    fetch("/api/corrections")
      .then((res) => res.json())
      .then((data) => {
        setCorrections(data.items || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCorrections();
  }, []);

  const handleTogglePublish = async (correction: Correction) => {
    const nextStatus = correction.publicationStatus === "Published" ? "Draft" : "Published";
    try {
      const res = await fetch("/api/corrections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: correction.id, publicationStatus: nextStatus }),
      });
      if (res.ok) {
        fetchCorrections();
      }
    } catch (err) {
      console.error("Error toggling publication status:", err);
    }
  };

  const handleDelete = async (id: string, refCode: string) => {
    if (!confirm(`Are you sure you want to delete correction ${refCode}?`)) return;
    try {
      const res = await fetch(`/api/corrections?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCorrections();
      }
    } catch (err) {
      console.error("Error deleting correction:", err);
    }
  };

  const filtered = corrections.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.refCode.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.pageNumber.toString() === q ||
      c.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Manage Corrections</h1>
          <p className="text-xs text-slate-500 mt-1">
            Total of {corrections.length} correction records in research database.
          </p>
        </div>

        <Link
          href="/admin/corrections/new"
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Correction</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-2">
        <Search className="w-4 h-4 text-slate-400 ml-1" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by ref code, page number, title, or category..."
          className="w-full text-xs bg-transparent focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Ref Code</th>
                <th className="py-3 px-3">Page</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3">Research Status</th>
                <th className="py-3 px-3">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    Loading corrections...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-900">{c.refCode}</td>
                    <td className="py-3 px-3 text-slate-700">Page {c.pageNumber}</td>
                    <td className="py-3 px-3 text-slate-600">{c.category}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          c.severity === "Critical"
                            ? "bg-rose-100 text-rose-800"
                            : c.severity === "Moderate"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {c.severity}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          c.researchStatus === "Needs Expert Review"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {c.researchStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleTogglePublish(c)}
                        className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          c.publicationStatus === "Published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                        title="Click to toggle publication status"
                      >
                        {c.publicationStatus === "Published" ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        href={`/admin/corrections/${c.id}/edit`}
                        className="inline-flex items-center p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                        title="Edit Correction"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(c.id, c.refCode)}
                        className="inline-flex items-center p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No corrections match your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
