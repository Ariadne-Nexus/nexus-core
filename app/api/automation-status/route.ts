import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Runtime: Node.js (required)
// Justification: Reads filesystem (run.json) and calls external API
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AutomationStatus = {
  run_id: string;
  status: "success" | "partial" | "failed";
  started_at: string;
  ended_at: string;
  duration_sec: number;
  demo_mode: boolean;
  steps: Array<{
    stage: string;
    step: string;
    status: string;
    error?: string;
  }>;
  artifacts: Record<string, string>;
};

type GitHubWorkflowRun = {
  id: number;
  status: string;
  conclusion: string | null;
  created_at: string;
  updated_at: string;
  run_started_at: string;
};

type GitHubWorkflowRunsResponse = {
  workflow_runs: GitHubWorkflowRun[];
};

function readLocalRun(): { ok: true; automation: AutomationStatus } | { ok: false; message: string } {
  try {
    const projectRoot = process.cwd();
    const runFile = path.join(projectRoot, "output", "run.json");

    if (!fs.existsSync(runFile)) {
      return { ok: false, message: "No run.json found. Automation may not have executed yet." };
    }

    const raw = fs.readFileSync(runFile, "utf-8");
    const data = JSON.parse(raw) as AutomationStatus;
    return { ok: true, automation: data };
  } catch (err: any) {
    return { ok: false, message: `Failed to read run.json: ${err?.message ?? String(err)}` };
  }
}

async function fetchWorkflowStatus(): Promise<{
  lastRunTime: string;
  lastRunStatus: string;
  recentRuns: string[];
  runId?: number;
  conclusion?: string | null;
  updatedAt?: string;
  error?: string;
}> {
  try {
    const owner = "dotlink-ops";
    const repo = "nexus-core";
    const workflowId = "daily-run.yml";

    const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs?per_page=7&status=completed`;

    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "nexus-core-Automation-Status",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(url, { headers, next: { revalidate: 300 } });

    if (!response.ok) {
      return {
        lastRunTime: "5:00 AM PT (scheduled)",
        lastRunStatus: "unknown",
        recentRuns: [],
        error: "Failed to fetch workflow status",
      };
    }

    const data = (await response.json()) as GitHubWorkflowRunsResponse;

    if (!data.workflow_runs || data.workflow_runs.length === 0) {
      return {
        lastRunTime: "5:00 AM PT (scheduled)",
        lastRunStatus: "unknown",
        recentRuns: [],
      };
    }

    const latestRun = data.workflow_runs[0];

    let lastRunStatus: "success" | "warning" | "failed";
    if (latestRun.conclusion === "success") lastRunStatus = "success";
    else if (latestRun.conclusion === "cancelled" || latestRun.conclusion === "skipped") lastRunStatus = "warning";
    else lastRunStatus = "failed";

    const runDate = new Date(latestRun.run_started_at || latestRun.created_at);
    const now = new Date();
    const diffMs = now.getTime() - runDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    let lastRunTime: string;
    if (diffDays === 0) {
      const timeStr = runDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Los_Angeles", hour12: true });
      lastRunTime = `Today · ${timeStr} PT`;
    } else if (diffDays === 1) lastRunTime = "Yesterday";
    else lastRunTime = `${diffDays} days ago`;

    const recentRuns = data.workflow_runs.map((run) => {
      if (run.conclusion === "success") return "success";
      if (run.conclusion === "cancelled" || run.conclusion === "skipped") return "warning";
      return "failed";
    });

    return {
      lastRunTime,
      lastRunStatus,
      recentRuns,
      runId: latestRun.id,
      conclusion: latestRun.conclusion,
      updatedAt: latestRun.updated_at,
    };
  } catch (_error) {
    return {
      lastRunTime: "5:00 AM PT (scheduled)",
      lastRunStatus: "unknown",
      recentRuns: [],
      error: "Internal server error",
    };
  }
}

export async function GET() {
  const local = readLocalRun();
  const workflow = await fetchWorkflowStatus();

  return NextResponse.json({
    automation: local.ok ? local.automation : null,
    automationMessage: local.ok ? undefined : local.message,
    workflow,
  });
}
