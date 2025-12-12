import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  return NextResponse.json({
    status: "ok",
    clientId: id,
    timeline: [],
    fetched_at: new Date().toISOString()
  });
}