import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "valorant-aichat",
    time: new Date().toISOString(),
  });
}
