"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    textbook: "Ethiopian New Curriculum Grade 11 Biology Student Textbook",
    grade: "Grade 11",
    subject: "Biology",
    unit: "Unit 1: Biology and Technology",
    pageNumber: "",
    originalStatement: "",
    issueReason: "",
    suggestedCorrection: "",
    evidence: "",
    submitterName: "",
    submitterEmail: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          pageNumber: parseInt(formData.pageNumber, 10) || 1,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit. Please check all fields.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-14 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Public Contribution
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">Submit a Suspected Error</h1>
          <p className="text-slate-600 text-sm mt-2">
            Spotted an inaccuracy, typographical error, or broken question in an Ethiopian New Curriculum textbook?
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mb-8 flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Notice:</strong> Submissions are independently investigated before publication.
            Submission enters our <strong>Pending Review</strong> queue and does not guarantee that a correction will be published.
          </span>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-white border border-emerald-200 text-center shadow-sm">
            <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600 mb-3" />
            <h2 className="text-xl font-bold text-slate-900">Submission Received</h2>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
              Thank you for contributing to textbook accuracy! Our researchers will cross-examine your submission
              against the original textbook and authoritative scientific sources.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  ...formData,
                  pageNumber: "",
                  originalStatement: "",
                  issueReason: "",
                  suggestedCorrection: "",
                  evidence: "",
                });
              }}
              className="mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
            >
              Submit Another Issue
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Grade</label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                  <option>Grade 12</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option>Biology</option>
                  <option>Chemistry</option>
                  <option>Physics</option>
                  <option>Mathematics</option>
                  <option>Information Technology</option>
                  <option>English</option>
                  <option>Geography</option>
                  <option>History</option>
                  <option>Economics</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Unit / Chapter</label>
                <input
                  type="text"
                  required
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Unit 1: Biology and Technology"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Page Number</label>
                <input
                  type="number"
                  required
                  value={formData.pageNumber}
                  onChange={(e) => setFormData({ ...formData, pageNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 8"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Original Textbook Statement (exact quote)
              </label>
              <textarea
                rows={3}
                required
                value={formData.originalStatement}
                onChange={(e) => setFormData({ ...formData, originalStatement: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                placeholder="Quote the exact statement as printed in the textbook..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Why do you believe this is wrong?
              </label>
              <textarea
                rows={3}
                required
                value={formData.issueReason}
                onChange={(e) => setFormData({ ...formData, issueReason: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Explain the factual, grammatical, or scientific error..."
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
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="How should this statement be correctly phrased?"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Supporting Evidence / Citations (Optional)
              </label>
              <input
                type="text"
                value={formData.evidence}
                onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. IUPAC nomenclature rules, Campbell Biology 11th Ed p. 45"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.submitterName}
                  onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  placeholder="e.g. Student / Teacher Abebe"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Your Email (Optional, for updates)
                </label>
                <input
                  type="email"
                  value={formData.submitterEmail}
                  onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? "Submitting..." : "Submit for Verification"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
