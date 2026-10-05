import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = db.getSubmissions();
  return NextResponse.json(submissions);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = db.createSubmission(body);
    return NextResponse.json({ success: true, submission: created });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create submission" }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    const success = db.updateSubmissionStatus(id, status);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
