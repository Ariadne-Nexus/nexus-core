import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, message, consent, company, website } = payload;

  if (website) {
    return NextResponse.json({ error: "Request flagged as spam" }, { status: 400 });
  }

  if (!name || !email || !message || !consent) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid work email." }, { status: 400 });
  }

  // In production, forward to CRM or email service
  console.info("Contact request", { name, email, company, message });

  return NextResponse.json({ status: "ok" });
}
