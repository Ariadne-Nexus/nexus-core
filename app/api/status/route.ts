import { NextResponse } from "next/server";
import appPkg from "../../../package.json" assert { type: "json" };
import nextPkg from "next/package.json" assert { type: "json" };

interface PackageJson {
  name: string;
  version: string;
}

export async function GET() {
  const uptimeSeconds = Math.floor(process.uptime());
  const startedAt = new Date(Date.now() - uptimeSeconds * 1000).toISOString();
  const now = new Date().toISOString();

  const payload = {
    ok: true,
    ready: true,
    name: (appPkg as PackageJson).name,
    version: (appPkg as PackageJson).version,
    next: (nextPkg as PackageJson).version,
    node: process.version,
    uptimeSeconds,
    startedAt,
    serverTimestamp: now,
  };

  return NextResponse.json(payload);
}
