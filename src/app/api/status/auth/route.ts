import { NextResponse } from "next/server";
import { checkAuthStatus } from "@/lib/status";

export async function GET() {
  const status = checkAuthStatus();
  return NextResponse.json(status);
}
