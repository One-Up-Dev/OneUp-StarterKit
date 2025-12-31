import { NextResponse } from "next/server";
import { checkPolarStatus } from "@/lib/status";

export async function GET() {
  const status = checkPolarStatus();
  return NextResponse.json(status);
}
