# Graceful Failure Rules

This document makes explicit the repository's rules for allowable failures and
finalization semantics for automation runs handled by `daily_runner`.

## 1. Allowed to fail without crashing
These steps may fail without the runner exiting immediately. When they fail
attitude should be to mark the step failed, continue the pipeline, and mark
the run as `PARTIAL`.

- External API timeouts (retries recommended)
- Slack post failure
- Non-critical enrichment services
- Optional analytics / telemetry writes

If a “non-critical” step fails:
- mark step failed (STEP_FAILURE)
- continue pipeline
- mark run as PARTIAL (RUN_PARTIAL)


## 2. Never allowed to fail silently
The following steps must never be configured to `allowFailure` (i.e. they are
critical and must surface failures):

- Trigger (decision to run)
- Core ingest (e.g. `ingest:notion`) — the source-of-truth ingestion
- Finalization / summary write (writing `run.json`, writing audit artifacts)

If these fail, the run must be marked `RUN_FAILED` and the process should exit
non-zero so CI and on-call can investigate.


## 3. Finalization Block (always runs)
Goal: Close the loop even on failure.

The runner must always execute a finalization block (a `finally` block) that:
- writes the run summary (`output/<run_id>/run.json`)
- flushes logs (`output/<run_id>/logs.jsonl`) — stream closed
- emits final status event (`RUN_SUCCESS`, `RUN_PARTIAL`, `RUN_FAILED`)

This must execute even if:
- multiple steps failed
- upstream APIs errored
- only partial data exists


## 4. Implementation notes
- A single `run_id` is generated at process start and attached to all logs/artifacts.
- Steps are executed through the `runStep` abstraction which emits `STEP_START`,
  `STEP_SUCCESS`, and `STEP_FAILURE` events.
- Critical steps must not be marked `allowFailure: true`. The runner validates
  this at startup and will fail fast if misconfigured.


## 5. Exit Criteria Validation
You are complete with B only when all are true:
- A failed step does not crash the runner
- Logs clearly show where it started, what failed, and why
- Partial outputs are written and inspectable in `output/<run_id>/`
- Each run has a unique `run_id`
- You can answer: “What happened in yesterday’s run?” in under 30 seconds by
  inspecting `output/<run_id>/logs.jsonl` and `output/<run_id>/run.json`.
