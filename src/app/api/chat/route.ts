import { NextRequest, NextResponse } from "next/server";
import { checkOpenRouterStatus } from "@/lib/status";

export async function POST(request: NextRequest) {
  // Check if OpenRouter is configured
  const status = checkOpenRouterStatus();
  if (!status.connected) {
    return NextResponse.json(
      { error: "OpenRouter API is not configured" },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();

    if (!body || typeof body.prompt !== "string") {
      return NextResponse.json(
        { error: "Invalid request body. 'prompt' field is required." },
        { status: 400 },
      );
    }

    const prompt = body.prompt.trim();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt cannot be empty" },
        { status: 400 },
      );
    }

    // Limit prompt length
    if (prompt.length > 10000) {
      return NextResponse.json(
        { error: "Prompt is too long. Maximum 10000 characters allowed." },
        { status: 400 },
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer":
            process.env.BETTER_AUTH_URL || "http://localhost:3000",
          "X-Title": "Starter-Kit",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 1000,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenRouter API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: 500 },
      );
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      return NextResponse.json(
        { error: "Invalid response from AI" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      response: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST instead." },
    { status: 405 },
  );
}
