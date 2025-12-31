import { NextResponse } from "next/server";
import { checkOpenRouterStatus } from "@/lib/status";

export async function GET() {
  const status = checkOpenRouterStatus();
  return NextResponse.json(status);
}
