import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type DailyWebhookPayload = {
  date: string;
  repo?: string | null;
  summary_bullets: string[];
  action_items: string[];
  raw_text: string;
  created_at?: string;
};

const SECRET_HEADER = "x-shared-secret";
const SECRET_ENV = "DAILY_WEBHOOK_SECRET";

function validatePayload(payload: DailyWebhookPayload): string | null {
  if (!payload || typeof payload !== "object") {
    return "Request body must be a JSON object.";
  }

  if (!payload.date || typeof payload.date !== "string") {
    return "Missing or invalid 'date'.";
  }

  if (!payload.raw_text || typeof payload.raw_text !== "string") {
    return "Missing or invalid 'raw_text'.";
  }

  if (!Array.isArray(payload.summary_bullets)) {
    return "Missing or invalid 'summary_bullets'.";
  }

  if (!Array.isArray(payload.action_items)) {
    return "Missing or invalid 'action_items'.";
  }

  if (
    payload.summary_bullets.some((item) => typeof item !== "string") ||
    payload.action_items.some((item) => typeof item !== "string")
  ) {
    return "All summary and action items must be strings.";
  }

  return null;
}

export async function POST(req: NextRequest) {
  const configuredSecret = process.env[SECRET_ENV];
  if (!configuredSecret) {
    console.error(
      `Server misconfiguration: ${SECRET_ENV} is not set. Rejecting webhook.`
    );
    return NextResponse.json(
      { error: "Webhook secret is not configured on the server." },
      { status: 500 }
    );
  }

  const providedSecret = req.headers.get(SECRET_HEADER);
  if (providedSecret !== configuredSecret) {
    return NextResponse.json(
      { error: "Invalid shared secret." },
      { status: 401 }
    );
  }

  let payload: DailyWebhookPayload;
  try {
    payload = await req.json();
  } catch (err) {
    console.error("Failed to parse webhook payload", err);
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const normalized: DailyWebhookPayload = {
    ...payload,
    repo: payload.repo ?? null,
    created_at: payload.created_at ?? new Date().toISOString(),
  };

  const filePath = path.join(process.cwd(), "data", "daily_summary.json");

  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(normalized, null, 2));
  } catch (err) {
    console.error("Failed to persist daily summary", err);
    return NextResponse.json(
      { error: "Failed to persist daily summary." },
      { status: 500 }
    );
  }

  return NextResponse.json({ status: "created" }, { status: 201 });
}
