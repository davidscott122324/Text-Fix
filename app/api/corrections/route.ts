import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const unitId = url.searchParams.get("unitId") || undefined;
  const pageNumber = url.searchParams.get("page") ? parseInt(url.searchParams.get("page")!, 10) : undefined;
  const query = url.searchParams.get("q") || undefined;

  const results = db.getCorrections({ unitId, pageNumber, query });
  return NextResponse.json(results);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const created = db.createCorrection(body);
    return NextResponse.json({ success: true, correction: created });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create correction" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;
    const updated = db.updateCorrection(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Correction not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, correction: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update correction" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Correction id required" }, { status: 400 });
  }

  const deleted = db.deleteCorrection(id);
  return NextResponse.json({ success: deleted });
}
