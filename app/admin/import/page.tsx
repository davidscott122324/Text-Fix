"use client";

import React, { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Download, Layers } from "lucide-react";

export default function BulkImportPage() {
  const [unitId, setUnitId] = useState("g11-bio-unit-1");
  const [format, setFormat] = useState<"json" | "csv">("json");
  const [rawText, setRawText] = useState("");
  const [previewRecords, setPreviewRecords] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [importResult, setImportResult] = useState<{ imported: number; duplicatesSkipped: number; errors: string[] } | null>(null);
  const [importing, setImporting] = useState(false);

  // Sample CSV / JSON Template Generators
  const downloadSampleTemplate = () => {
    if (format === "csv") {
      const csv = `refCode,pageNumber,category,severity,title,originalText,issue,suggestedCorrection,evidence,researchStatus,publicationStatus\n` +
        `P11-01,11,Grammar,Minor,Sample Grammar Fix,"Original textbook error text","Why it needs a fix","Suggested correction","Academic evidence","Research Completed","Published"\n` +
        `P11-02,11,Factual Error,Moderate,Sample Fact Fix,"Incorrect statement","Factual inaccuracy","Correct statement","Source citation","Research Completed","Published"`;
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "textfix-corrections-template.csv";
      a.click();
    } else {
      const json = JSON.stringify(
        [
          {
            refCode: "P11-01",
            pageNumber: 11,
            category: "Grammar",
            severity: "Minor",
            title: "Sample Grammar Fix",
            originalText: "Original textbook statement here",
            issue: "Explanation of why it needs a fix",
            suggestedCorrection: "Corrected statement here",
            evidence: "Academic citation or evidence",
            researchStatus: "Research Completed",
            publicationStatus: "Published",
          },
        ],
        null,
        2
      );
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "textfix-corrections-template.json";
      a.click();
    }
  };

  const parseInput = () => {
    setErrors([]);
    setImportResult(null);

    if (!rawText.trim()) {
      setErrors(["Please enter or paste data to preview."]);
      return;
    }

    try {
      if (format === "json") {
        const parsed = JSON.parse(rawText);
        if (!Array.isArray(parsed)) {
          throw new Error("JSON data must be an array of correction objects.");
        }
        setPreviewRecords(parsed);
      } else {
        // Simple CSV parser
        const lines = rawText.trim().split("\n");
        if (lines.length < 2) {
          throw new Error("CSV must have a header row and at least one data row.");
        }
        const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
        const rows = lines.slice(1).map((line) => {
          // simple quote-aware split
          const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
          const obj: any = {};
          headers.forEach((h, idx) => {
            obj[h] = values[idx] || "";
          });
          if (obj.pageNumber) obj.pageNumber = parseInt(obj.pageNumber, 10);
          return obj;
        });
        setPreviewRecords(rows);
      }
    } catch (err: any) {
      setErrors([err.message || "Failed to parse data."]);
      setPreviewRecords([]);
    }
  };

  const handleExecuteImport = async () => {
    if (previewRecords.length === 0) return;
    setImporting(true);

    try {
      const res = await fetch("/api/corrections/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unitId, records: previewRecords }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Import failed");
      }

      setImportResult({
        imported: data.imported,
        duplicatesSkipped: data.duplicatesSkipped,
        errors: data.errors || [],
      });
      setPreviewRecords([]);
      setRawText("");
    } catch (err: any) {
      setErrors([err.message || "Import execution failed."]);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Bulk CSV / JSON Importer</h1>
            <p className="text-xs text-slate-500 mt-1">
              Import dozens or hundreds of verified corrections from research sheets without editing code.
            </p>
          </div>

          <button
            onClick={downloadSampleTemplate}
            className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {format.toUpperCase()} Template</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Unit</label>
            <select
              value={unitId}
              onChange={(e) => setUnitId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
            >
              <option value="g11-bio-unit-1">Grade 11 Biology &bull; Unit 1 (Active)</option>
              <option value="g11-bio-unit-2">Grade 11 Biology &bull; Unit 2</option>
              <option value="g11-bio-unit-3">Grade 11 Biology &bull; Unit 3</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Data Format</label>
            <div className="flex space-x-3 mt-1">
              <label className="flex items-center space-x-1.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="json"
                  checked={format === "json"}
                  onChange={() => setFormat("json")}
                />
                <span>JSON Array</span>
              </label>
              <label className="flex items-center space-x-1.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={format === "csv"}
                  onChange={() => setFormat("csv")}
                />
                <span>CSV (Comma-Separated)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Paste {format.toUpperCase()} Content or Upload
          </label>
          <textarea
            rows={8}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder={
              format === "json"
                ? '[\n  {\n    "refCode": "P11-01",\n    "pageNumber": 11,\n    "category": "Grammar",\n    "title": "...",\n    "originalText": "...",\n    "issue": "...",\n    "suggestedCorrection": "..."\n  }\n]'
                : "refCode,pageNumber,category,severity,title,originalText,issue,suggestedCorrection..."
            }
            className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={parseInput}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Parse &amp; Preview
          </button>
        </div>
      </div>

      {/* Errors display */}
      {errors.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs space-y-1">
          {errors.map((e, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{e}</span>
            </div>
          ))}
        </div>
      )}

      {/* Import Result Notification */}
      {importResult && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 shadow-sm">
          <div className="flex items-center space-x-2 text-sm font-bold mb-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Import Completed Successfully</span>
          </div>
          <p className="text-xs">
            <strong>{importResult.imported}</strong> records imported.{" "}
            <strong>{importResult.duplicatesSkipped}</strong> duplicates skipped.
          </p>
        </div>
      )}

      {/* Preview Table */}
      {previewRecords.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Validated Preview: {previewRecords.length} Records Ready
            </h2>
            <button
              onClick={handleExecuteImport}
              disabled={importing}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md transition-colors"
            >
              {importing ? "Importing..." : "Confirm & Import to Database"}
            </button>
          </div>

          <div className="overflow-x-auto max-h-96 border rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 text-slate-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Ref</th>
                  <th className="py-2.5 px-2">Page</th>
                  <th className="py-2.5 px-2">Category</th>
                  <th className="py-2.5 px-4">Title</th>
                  <th className="py-2.5 px-4">Suggested Correction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {previewRecords.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80">
                    <td className="py-2 px-3 font-mono font-bold text-blue-900">{r.refCode}</td>
                    <td className="py-2 px-2 text-slate-700">{r.pageNumber}</td>
                    <td className="py-2 px-2 text-slate-600">{r.category}</td>
                    <td className="py-2 px-4 max-w-xs truncate">{r.title}</td>
                    <td className="py-2 px-4 max-w-sm truncate text-emerald-800 font-medium">
                      {r.suggestedCorrection}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
