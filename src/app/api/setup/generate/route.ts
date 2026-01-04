import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { ProjectConfig } from "@/lib/setup/types";

const CONFIG_FILE = path.join(process.cwd(), "oneup.config.json");

export async function POST(request: Request) {
  try {
    const { config }: { config: ProjectConfig } = await request.json();

    if (!config) {
      return NextResponse.json({ error: "Configuration manquante" }, { status: 400 });
    }

    // Save the final configuration
    const finalConfig = {
      ...config,
      updatedAt: new Date().toISOString(),
      status: "ready_for_generation",
    };

    await fs.writeFile(CONFIG_FILE, JSON.stringify(finalConfig, null, 2), "utf-8");

    // The actual generation will be done by Claude Code when the user runs /project-setup
    // This endpoint just saves the config and returns success

    return NextResponse.json({
      success: true,
      message: "Configuration sauvegardee. Utilisez /project-setup dans Claude Code pour generer le projet.",
      configPath: "oneup.config.json",
    });
  } catch (error) {
    console.error("Erreur generation:", error);
    return NextResponse.json({ error: "Erreur lors de la preparation" }, { status: 500 });
  }
}
