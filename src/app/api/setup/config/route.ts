import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const CONFIG_FILE = path.join(process.cwd(), "oneup.config.json");

export async function GET() {
  try {
    const fileContent = await fs.readFile(CONFIG_FILE, "utf-8");
    const config = JSON.parse(fileContent);
    return NextResponse.json({ config });
  } catch {
    // File doesn't exist yet
    return NextResponse.json({ config: null });
  }
}

export async function POST(request: Request) {
  try {
    const { config } = await request.json();

    if (!config) {
      return NextResponse.json({ error: "Configuration manquante" }, { status: 400 });
    }

    // Save to file
    await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error);
    return NextResponse.json({ error: "Erreur lors de la sauvegarde" }, { status: 500 });
  }
}
