import { NextResponse } from "next/server";

// Catch-all handler for non-existent API endpoints
// Returns JSON 404 response instead of HTML

export async function GET() {
  return NextResponse.json(
    {
      error: "Not Found",
      message: "The requested API endpoint does not exist",
    },
    { status: 404 },
  );
}

export async function POST() {
  return NextResponse.json(
    {
      error: "Not Found",
      message: "The requested API endpoint does not exist",
    },
    { status: 404 },
  );
}

export async function PUT() {
  return NextResponse.json(
    {
      error: "Not Found",
      message: "The requested API endpoint does not exist",
    },
    { status: 404 },
  );
}

export async function DELETE() {
  return NextResponse.json(
    {
      error: "Not Found",
      message: "The requested API endpoint does not exist",
    },
    { status: 404 },
  );
}

export async function PATCH() {
  return NextResponse.json(
    {
      error: "Not Found",
      message: "The requested API endpoint does not exist",
    },
    { status: 404 },
  );
}
