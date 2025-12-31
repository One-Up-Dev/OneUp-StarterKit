import { NextResponse } from "next/server";
import { checkAllStatuses } from "@/lib/status";

export async function GET() {
  try {
    const statuses = await checkAllStatuses();
    return NextResponse.json(statuses);
  } catch (error) {
    console.error("Error checking statuses:", error);
    return NextResponse.json(
      { error: "Failed to check statuses" },
      { status: 500 },
    );
  }
}
