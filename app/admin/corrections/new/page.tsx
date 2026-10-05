"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

export default function NewCorrectionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    unitId: "g11-bio-unit-1",
    refCode: "",
    pageNumber: 2,
    affectedPagesStr: "",
    chapterSection: "",
    category: "Grammar",
    severity: "Minor",
    title: "",
    originalText: "",
    issue: "",
    suggestedCorrection: "",
    evidence: "",
    researchStatus: "Research Completed",
    publicationStatus: "Published",
    relatedRefCodesStr: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const affectedPages = formData.affectedPagesStr
      ? formData.affectedPagesStr.split(",").map((p) => parseInt(p.trim(), 10)).filter(Boolean)
      : undefined;

    const relatedRefCodes = formData.relatedRefCodesStr
      ? formData.relatedRefCodesStr.split(",").map((c) => c.trim().toUpperCase()).filter(Boolean)
      : undefined;

    const payload = {
      ...formData,
      pageNumber: Number(formData.pageNumber),
      affectedPages,
      isRecurring: !!(affectedPages && affectedPages.length > 1),
      relatedRefCodes,
    };

    try {
      const res = await fetch("/api/corrections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create correction");
      }
      router.push("/admin/corrections");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/corrections"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Corrections</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 mb-1">Add New Correction Record</h1>
        <p className="text-xs text-slate-500 mb-6">
          Input a researched correction directly into the active database.
        </p>

        {error && (
          <div className="p-3 mb-6 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Unit</label>
              <select
                value={formData.unitId}
                onChange={(e) => setFormData({ ...formData, unitId: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
              >
                <option value="g11-bio-unit-1">Grade 11 Biology &bull; Unit 1 (Active)</option>
                <option value="g11-bio-unit-2">Grade 11 Biology &bull; Unit 2</option>
                <option value="g11-bio-unit-3">Grade 11 Biology &bull; Unit 3</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reference Code (e.g. P8-02)
              </label>
              <input
                type="text"
                required
                value={formData.refCode}
                onChange={(e) => setFormData({ ...formData, refCode: e.target.value })}
                placeholder="P8-02"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs uppercase font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Page</label>
              <input
                type="number"
                required
                value={formData.pageNumber}
                onChange={(e) => setFormData({ ...formData, pageNumber: parseInt(e.target.value, 10) || 1 })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Recurring / Affected Pages (Optional)
              </label>
              <input
                type="text"
                value={formData.affectedPagesStr}
                onChange={(e) => setFormData({ ...formData, affectedPagesStr: e.target.value })}
                placeholder="e.g. 9, 11, 13, 15, 17, 19"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Chapter / Section (Optional)
              </label>
              <input
                type="text"
                value={formData.chapterSection}
                onChange={(e) => setFormData({ ...formData, chapterSection: e.target.value })}
                placeholder="e.g. 1.2.2 Uses of technology in biology"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              >
                <option>Grammar</option>
                <option>Word Choice</option>
                <option>Factual Error</option>
                <option>Scientific Terminology</option>
                <option>Conceptual/Definitional</option>
                <option>Formatting</option>
                <option>Consistency</option>
                <option>Typo</option>
                <option>Flag for expert verification</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Severity</label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              >
                <option>Minor</option>
                <option>Moderate</option>
                <option>Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Research Status</label>
              <select
                value={formData.researchStatus}
                onChange={(e) => setFormData({ ...formData, researchStatus: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              >
                <option>Research Completed</option>
                <option>Needs Expert Review</option>
                <option>Expert Reviewed</option>
                <option>Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Publication</label>
              <select
                value={formData.publicationStatus}
                onChange={(e) => setFormData({ ...formData, publicationStatus: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              >
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Title / Short Description</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Redundant conjunction and incorrect preposition"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Original Textbook Text (Verbatim Excerpt)
            </label>
            <textarea
              rows={3}
              required
              value={formData.originalText}
              onChange={(e) => setFormData({ ...formData, originalText: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Why It Needs A Fix (Identified Problem)
            </label>
            <textarea
              rows={3}
              required
              value={formData.issue}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Suggested Correction
            </label>
            <textarea
              rows={3}
              required
              value={formData.suggestedCorrection}
              onChange={(e) => setFormData({ ...formData, suggestedCorrection: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Evidence / Academic Corroboration (Optional)
              </label>
              <input
                type="text"
                value={formData.evidence}
                onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
                placeholder="Scientific citations, dictionary rules..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Related Reference Codes (Optional, e.g. P4-01)
              </label>
              <input
                type="text"
                value={formData.relatedRefCodesStr}
                onChange={(e) => setFormData({ ...formData, relatedRefCodesStr: e.target.value })}
                placeholder="e.g. P4-01, P17-04"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
            <Link
              href="/admin/corrections"
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save Correction"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
