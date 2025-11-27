import { NextRequest, NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimitWindowMs = 60 * 1000; // 1 minute
const maxRequestsPerWindow = 3;
const requestLog = new Map<string, number[]>();

function pruneRequests(identifier: string, now: number) {
  const timestamps = requestLog.get(identifier) ?? [];
  const recent = timestamps.filter((timestamp) => now - timestamp < rateLimitWindowMs);
  requestLog.set(identifier, recent);
  return recent;
}

function trackRequest(identifier: string, now: number) {
  const recent = pruneRequests(identifier, now);
  recent.push(now);
  requestLog.set(identifier, recent);
  return recent.length <= maxRequestsPerWindow;
}

function buildError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  const now = Date.now();
  const clientId = request.headers.get("x-forwarded-for") ?? request.ip ?? "anonymous";
  if (!trackRequest(clientId, now)) {
    return buildError("Too many requests. Please wait a moment before trying again.", 429);
  }

  const { name, email, message, consent, honeypot } = await request.json();

  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return buildError("Detected automated submission.");
  }

  if (typeof name !== "string" || name.trim().length < 2) {
    return buildError("Please share your name so we know who to contact.");
  }

  if (typeof email !== "string" || !emailPattern.test(email.trim())) {
    return buildError("Enter a valid email address so we can respond.");
  }

  if (typeof message !== "string" || message.trim().length < 10) {
    return buildError("Tell us a bit more about your project (at least 10 characters).");
  }

  if (consent !== true) {
    return buildError("We need your consent to contact you.");
  }

  // Stubbed outbound call to a form backend or email service.
  // In production, forward the payload to your provider of choice.
  console.info("Contact request received", { name, email, message });

  return NextResponse.json({ message: "Thanks for reaching out! We will be in touch shortly." });
}
