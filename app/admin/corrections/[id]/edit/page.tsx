import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ArrowLeft, Save } from "lucide-react";

interface EditProps {
  params: { id: string };
}

export default function EditCorrectionPage({ params }: EditProps) {
  const correction = db.getCorrectionById(params.id);
  if (!correction) {
    notFound();
  }

  async function updateAction(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const refCode = formData.get("refCode") as string;
    const pageNumber = parseInt(formData.get("pageNumber") as string, 10);
    const category = formData.get("category") as any;
    const severity = formData.get("severity") as any;
    const researchStatus = formData.get("researchStatus") as any;
    const publicationStatus = formData.get("publicationStatus") as any;
    const originalText = formData.get("originalText") as string;
    const issue = formData.get("issue") as string;
    const suggestedCorrection = formData.get("suggestedCorrection") as string;
    const evidence = formData.get("evidence") as string;

    db.updateCorrection(params.id, {
      title,
      refCode,
      pageNumber,
      category,
      severity,
      researchStatus,
      publicationStatus,
      originalText,
      issue,
      suggestedCorrection,
      evidence: evidence || undefined,
    });

    redirect("/admin/corrections");
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/corrections"
        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Corrections</span>
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 mb-1">
          Edit Correction: {correction.refCode}
        </h1>
        <p className="text-xs text-slate-500 mb-6">
          Update research statements, evidence, or review status.
        </p>

        <form action={updateAction} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reference Code</label>
              <input
                type="text"
                name="refCode"
                required
                defaultValue={correction.refCode}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Page Number</label>
              <input
                type="number"
                name="pageNumber"
                required
                defaultValue={correction.pageNumber}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                required
                defaultValue={correction.category}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Severity</label>
              <select
                name="severity"
                defaultValue={correction.severity}
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
                name="researchStatus"
                defaultValue={correction.researchStatus}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              >
                <option>Research Completed</option>
                <option>Needs Expert Review</option>
                <option>Expert Reviewed</option>
                <option>Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Publication Status</label>
              <select
                name="publicationStatus"
                defaultValue={correction.publicationStatus}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              >
                <option>Published</option>
                <option>Draft</option>
                <option>Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              defaultValue={correction.title}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Original Textbook Text</label>
            <textarea
              name="originalText"
              rows={3}
              required
              defaultValue={correction.originalText}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Why It Needs A Fix</label>
            <textarea
              name="issue"
              rows={3}
              required
              defaultValue={correction.issue}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Suggested Correction</label>
            <textarea
              name="suggestedCorrection"
              rows={3}
              required
              defaultValue={correction.suggestedCorrection}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Evidence / Explanation</label>
            <input
              type="text"
              name="evidence"
              defaultValue={correction.evidence || ""}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
            <Link
              href="/admin/corrections"
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Update Correction</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
