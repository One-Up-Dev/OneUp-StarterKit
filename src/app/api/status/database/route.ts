import { NextResponse } from "next/server";
import { checkDatabaseStatus } from "@/lib/status";

export async function GET() {
  try {
    const status = await checkDatabaseStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error("Error checking database status:", error);
    return NextResponse.json(
      { connected: false, message: "Failed to check database status" },
      { status: 500 },
    );
  }
}
