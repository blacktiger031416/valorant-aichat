import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "meta-llama/llama-3-70b-instruct",
      messages: messages,
    });

    const reply = completion.choices[0].message;
    return NextResponse.json(reply);
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to connect to OpenRouter API" },
      { status: 500 }
    );
  }
}
