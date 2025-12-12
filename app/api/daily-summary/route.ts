import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { DailySummaryResponse, DailySummaryData } from "../types";

export const dynamic = "force-dynamic"; // Always fetch fresh data
export const revalidate = 60; // Cache for 60 seconds

export async function GET(): Promise<NextResponse<DailySummaryResponse>> {
  try {
    // Try public/data first (for GitHub Actions deployed version)
    // Fall back to output/ for local development
    const publicPath = path.join(process.cwd(), "public", "data", "daily_summary.json");
    const outputPath = path.join(process.cwd(), "output", "daily_summary.json");

    let filePath = publicPath;
    let dataSource: "production" | "local" = "production";

    // Check if public/data version exists
    try {
      await fs.access(publicPath);
    } catch {
      // Fall back to output/ for local development
      filePath = outputPath;
      dataSource = "local";
    }

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json<DailySummaryResponse>(
        {
          status: "not_found",
          error: "Daily summary not found",
          message: "Run the automation script to generate data: python3 scripts/daily_v2.py",
        },
        { status: 404 }
      );
    }

    // Read and parse the file
    const fileContent = await fs.readFile(filePath, "utf8");
    const data: DailySummaryData = JSON.parse(fileContent);

    return NextResponse.json<DailySummaryResponse>({
      status: "ok",
      ...data,
      _metadata: {
        api_version: "1.0",
        data_source: dataSource,
        fetched_at: new Date().toISOString(),
      },
    });
  } catch (err) {
    return NextResponse.json<DailySummaryResponse>(
      {
        status: "error",
        error: "Failed to load daily summary",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
