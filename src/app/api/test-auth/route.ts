/**
 * DEVELOPMENT ONLY: Test authentication endpoint for E2E testing.
 * This endpoint allows creating test sessions without going through OAuth.
 *
 * DO NOT use in production!
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { webcrypto } from "crypto";

// Only allow in development
const isDev = process.env.NODE_ENV === "development";

// Get the secret from environment
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET || "";

/**
 * Sign a cookie value using HMAC-SHA256 (matching better-call's signCookieValue)
 */
async function signCookieValue(value: string, secret: string): Promise<string> {
  const algorithm = { name: "HMAC", hash: "SHA-256" };
  const secretBuf = new TextEncoder().encode(secret);
  const key = await webcrypto.subtle.importKey(
    "raw",
    secretBuf,
    algorithm,
    false,
    ["sign"],
  );
  const signature = await webcrypto.subtle.sign(
    algorithm.name,
    key,
    new TextEncoder().encode(value),
  );
  const base64Signature = btoa(
    String.fromCharCode(...new Uint8Array(signature)),
  );
  return encodeURIComponent(`${value}.${base64Signature}`);
}

export async function POST(request: NextRequest) {
  if (!isDev) {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 },
    );
  }

  try {
    const body = await request.json();
    const { action } = body;

    if (action === "create-session") {
      // Create or get test user
      const existingUser = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, "test@example.com"))
        .limit(1);

      let userId: string;
      let userName = "Test User";
      let userEmail = "test@example.com";
      let userAvatar =
        "https://ui-avatars.com/api/?name=Test+User&background=3B82F6&color=fff";

      if (existingUser.length === 0) {
        const [newUser] = await db
          .insert(schema.users)
          .values({
            email: userEmail,
            name: userName,
            avatarUrl: userAvatar,
          })
          .returning();
        userId = newUser.id;

        // Create account record
        await db.insert(schema.accounts).values({
          userId: userId,
          provider: "google",
          providerAccountId: "test-google-id-" + randomUUID(),
        });
      } else {
        userId = existingUser[0].id;
        userName = existingUser[0].name || userName;
        userEmail = existingUser[0].email;
        userAvatar = existingUser[0].avatarUrl || userAvatar;
      }

      // Create session
      const sessionToken = randomUUID();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await db.insert(schema.sessions).values({
        userId: userId,
        token: sessionToken,
        expiresAt: expiresAt,
      });

      // Sign the session token
      const signedCookieValue = await signCookieValue(
        sessionToken,
        BETTER_AUTH_SECRET,
      );

      // Create response with session cookie
      const response = NextResponse.json({
        success: true,
        user: {
          id: userId,
          email: userEmail,
          name: userName,
          avatarUrl: userAvatar,
        },
        sessionToken,
        signedCookieValue,
      });

      // Set the signed session cookie (using the raw Set-Cookie header for proper formatting)
      const cookieValue = `better-auth.session_token=${signedCookieValue}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`;
      response.headers.append("Set-Cookie", cookieValue);

      return response;
    }

    if (action === "clear-session") {
      const response = NextResponse.json({ success: true });
      response.cookies.delete("better-auth.session_token");
      return response;
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Test auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  if (!isDev) {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 },
    );
  }

  return NextResponse.json({
    message:
      "Test auth endpoint. Use POST with action: 'create-session' or 'clear-session'",
  });
}
