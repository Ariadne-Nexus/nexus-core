// app/api/sales-pipeline/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic"; // Always fetch fresh data
export const revalidate = 300; // Cache for 5 minutes (pipeline data changes less frequently)

interface PipelineDeal {
  deal_id: string;
  company_name: string;
  deal_value: number;
  stage: string;
  probability: number;
  expected_close_date: string;
  owner: string;
  last_activity: string;
  notes?: string;
}

interface PipelineSummary {
  date: string;
  total_deals: number;
  total_value: number;
  weighted_value: number;
  deals_by_stage: Record<string, number>;
  top_deals: PipelineDeal[];
  deals: PipelineDeal[];
  _metadata?: {
    generated_at: string;
    demo_mode: boolean;
    version: string;
  };
}

interface ApiResponse extends PipelineSummary {
  status: string;
  error?: string;
  message?: string;
  _metadata: {
    fetched_at: string;
    api_version: string;
    data_source: string;
    generated_at?: string;
    demo_mode?: boolean;
    version?: string;
  };
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    // Try public/data first (for GitHub Actions deployed version)
    // Fall back to output/ for local development
    const publicPath = path.join(process.cwd(), "public", "data", "sales_pipeline.json");
    const outputPath = path.join(process.cwd(), "output", "sales_pipeline.json");

    let filePath = publicPath;
    let dataSource = "production";

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
      return NextResponse.json<ApiResponse>(
        {
          status: "not_found",
          error: "Sales pipeline data not found",
          message: "Run the automation script to generate data: python3 scripts/sales_pipeline_pull.py --demo",
          date: new Date().toISOString().split('T')[0],
          total_deals: 0,
          total_value: 0,
          weighted_value: 0,
          deals_by_stage: {},
          top_deals: [],
          deals: [],
          _metadata: {
            fetched_at: new Date().toISOString(),
            api_version: "1.0",
            data_source: dataSource,
          }
        },
        { status: 404 }
      );
    }

    // Read and parse file
    const fileContent = await fs.readFile(filePath, "utf8");
    const data: PipelineSummary = JSON.parse(fileContent);

    // Validate data structure
    if (!data.date || typeof data.total_deals !== 'number' || !Array.isArray(data.deals)) {
      return NextResponse.json<ApiResponse>(
        {
          status: "invalid_data",
          error: "Invalid data format",
          message: "Sales pipeline file is corrupted or incomplete",
          date: new Date().toISOString().split('T')[0],
          total_deals: 0,
          total_value: 0,
          weighted_value: 0,
          deals_by_stage: {},
          top_deals: [],
          deals: [],
          _metadata: {
            fetched_at: new Date().toISOString(),
            api_version: "1.0",
            data_source: dataSource,
          }
        },
        { status: 500 }
      );
    }

    // Add response metadata
    const response: ApiResponse = {
      ...data,
      status: "ok",
      _metadata: {
        fetched_at: new Date().toISOString(),
        api_version: "1.0",
        data_source: dataSource,
        generated_at: data._metadata?.generated_at,
        demo_mode: data._metadata?.demo_mode,
        version: data._metadata?.version,
      }
    };

    return NextResponse.json<ApiResponse>(response, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Content-Type-Options": "nosniff",
      }
    });

  } catch (err) {
    console.error("Error reading sales_pipeline.json:", err);
    return NextResponse.json<ApiResponse>(
      {
        status: "error",
        error: "Failed to load sales pipeline data",
        message: err instanceof Error ? err.message : "Unknown error",
        date: new Date().toISOString().split('T')[0],
        total_deals: 0,
        total_value: 0,
        weighted_value: 0,
        deals_by_stage: {},
        top_deals: [],
        deals: [],
        _metadata: {
          fetched_at: new Date().toISOString(),
          api_version: "1.0",
          data_source: "error",
        }
      },
      { status: 500 }
    );
  }
}
