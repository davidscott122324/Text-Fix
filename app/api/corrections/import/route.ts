import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
  }

  try {
    const { unitId, records } = await req.json();
    if (!unitId || !Array.isArray(records)) {
      return NextResponse.json({ error: "unitId and records array required." }, { status: 400 });
    }

    const result = db.bulkImportCorrections(unitId, records);
    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Import failed" }, { status: 400 });
  }
}
