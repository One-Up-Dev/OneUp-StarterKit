import "dotenv/config";
import { db } from "../src/db/index";
import { sql } from "drizzle-orm";

async function migrate() {
  try {
    // Drop and recreate verifications table with text id
    await db.execute(sql`DROP TABLE IF EXISTS verifications`);
    await db.execute(sql`
      CREATE TABLE verifications (
        id TEXT PRIMARY KEY,
        identifier TEXT NOT NULL,
        value TEXT NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("Verifications table recreated successfully");
  } catch (error) {
    console.error("Migration error:", error);
  }
  process.exit(0);
}
migrate();
