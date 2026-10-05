"use client";

import React, { useState, useEffect } from "react";
import { PublicSubmission } from "@/lib/types";
import { CheckCircle2, XCircle, Clock, Send } from "lucide-react";

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<PublicSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubs = () => {
    setLoading(true);
    fetch("/api/submissions")
      .then((res) => res.json())
      .then((data) => setSubmissions(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const handleUpdateStatus = async (id: string, status: "Approved" | "Rejected") => {
    try {
      const res = await fetch("/api/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        fetchSubs();
      }
    } catch (err) {
      console.error("Error updating submission:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Public Submissions Queue</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review issues and textbook errors submitted by students, educators, and researchers.
        </p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
            Loading submissions...
          </div>
        ) : submissions.length > 0 ? (
          submissions.map((sub) => (
            <div key={sub.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {sub.grade} &bull; {sub.subject}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    Page {sub.pageNumber}
                  </span>
                  <span className="text-xs text-slate-500">{sub.unit}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      sub.status === "Approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : sub.status === "Rejected"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {sub.status}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-rose-800 uppercase text-[10px] tracking-wider block">
                    Reported Textbook Statement:
                  </span>
                  <p className="p-2.5 rounded bg-rose-50/50 border border-rose-100 font-mono text-rose-950 mt-0.5">
                    &ldquo;{sub.originalStatement}&rdquo;
                  </p>
                </div>

                <div>
                  <span className="font-bold text-amber-800 uppercase text-[10px] tracking-wider block">
                    Submitter Reason:
                  </span>
                  <p className="text-slate-700 mt-0.5">{sub.issueReason}</p>
                </div>

                <div>
                  <span className="font-bold text-emerald-800 uppercase text-[10px] tracking-wider block">
                    Suggested Correction:
                  </span>
                  <p className="p-2.5 rounded bg-emerald-50/50 border border-emerald-100 text-emerald-950 font-medium mt-0.5">
                    &ldquo;{sub.suggestedCorrection}&rdquo;
                  </p>
                </div>

                {sub.evidence && (
                  <div>
                    <span className="font-bold text-blue-800 uppercase text-[10px] tracking-wider block">
                      Evidence Cited:
                    </span>
                    <p className="text-slate-600 mt-0.5">{sub.evidence}</p>
                  </div>
                )}

                {sub.submitterName && (
                  <div className="text-[11px] text-slate-400 pt-1">
                    Submitted by: {sub.submitterName} {sub.submitterEmail && `(${sub.submitterEmail})`}
                  </div>
                )}
              </div>

              {sub.status === "Pending" && (
                <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                  <button
                    onClick={() => handleUpdateStatus(sub.id, "Rejected")}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(sub.id, "Approved")}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve to Research Queue</span>
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
            No submissions in queue.
          </div>
        )}
      </div>
    </div>
  );
}
