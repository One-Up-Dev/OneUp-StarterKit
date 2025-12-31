/**
 * Development-only script to create a test user and session for E2E testing.
 * This bypasses OAuth for automated testing purposes.
 *
 * Usage: npx tsx scripts/create-test-session.ts
 */

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../src/db/schema";
import { randomUUID } from "crypto";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5434/starterkit",
});

const db = drizzle(pool, { schema });

async function createTestSession() {
  try {
    // Check if test user exists
    const existingUsers = await db
      .select()
      .from(schema.users)
      .where(
        // @ts-expect-error - drizzle typing
        schema.users.email.eq
          ? schema.users.email.eq("test@example.com")
          : undefined,
      )
      .limit(1);

    let userId: string;

    if (existingUsers && existingUsers.length > 0) {
      userId = existingUsers[0].id;
      console.log("Using existing test user:", userId);
    } else {
      // Create test user
      const [newUser] = await db
        .insert(schema.users)
        .values({
          email: "test@example.com",
          name: "Test User",
          avatarUrl:
            "https://ui-avatars.com/api/?name=Test+User&background=3B82F6&color=fff",
        })
        .returning();

      userId = newUser.id;
      console.log("Created test user:", userId);

      // Create account record
      await db.insert(schema.accounts).values({
        userId: userId,
        provider: "google",
        providerAccountId: "test-google-id-" + randomUUID(),
      });
      console.log("Created test account");
    }

    // Create session with 7-day expiration
    const sessionToken = randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db
      .insert(schema.sessions)
      .values({
        userId: userId,
        token: sessionToken,
        expiresAt: expiresAt,
      })
      .returning();

    console.log("\n=== Test Session Created ===");
    console.log("User ID:", userId);
    console.log("Session Token:", sessionToken);
    console.log("Expires At:", expiresAt.toISOString());
    console.log(
      "\nTo use this session, set the following cookie in your browser:",
    );
    console.log(`better-auth.session_token=${sessionToken}`);
    console.log("\nOr use this curl command to test:");
    console.log(
      `curl -H "Cookie: better-auth.session_token=${sessionToken}" http://localhost:3000/api/auth/get-session`,
    );

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("Error creating test session:", error);
    await pool.end();
    process.exit(1);
  }
}

createTestSession();
