# Single Automation Contract

Purpose
-------
Define a canonical lifecycle and a minimal, machine-friendly event schema every automation run must emit so runs behave consistently regardless of outcome.

Canonical lifecycle events (required)
- `START` — emitted once at run start
- `STEP_START` — emitted at the start of each step
- `STEP_SUCCESS` or `STEP_FAILURE` — emitted when a step completes
- `RUN_SUCCESS`, `RUN_PARTIAL`, or `RUN_FAILED` — emitted exactly once at run end

Event format (newline-delimited JSON)
Each event MUST be emitted as a single JSON object on its own line (JSONL). Fields:

- `eventType` (string): one of `START`, `STEP_START`, `STEP_SUCCESS`, `STEP_FAILURE`, `RUN_SUCCESS`, `RUN_PARTIAL`, `RUN_FAILED`
- `runId` (string): unique identifier for this run (UUID recommended)
- `timestamp` (string): ISO 8601 timestamp when the event was emitted
- `stepName` (string, optional): present for `STEP_*` events
- `message` (string, optional): human-friendly message
- `metadata` (object, optional): arbitrary structured data

Example
-------
{"eventType":"START","runId":"b4f1a2d8-...","timestamp":"2025-12-15T12:00:00Z"}
{"eventType":"STEP_START","runId":"b4f1a2d8-...","stepName":"install","timestamp":"2025-12-15T12:00:01Z"}
{"eventType":"STEP_SUCCESS","runId":"b4f1a2d8-...","stepName":"install","timestamp":"2025-12-15T12:00:10Z"}
{"eventType":"RUN_SUCCESS","runId":"b4f1a2d8-...","timestamp":"2025-12-15T12:01:00Z"}

Rules
-----
- Emit `START` before any `STEP_*` events.
- Emit at least one terminal run event: `RUN_SUCCESS`, `RUN_PARTIAL`, or `RUN_FAILED`.
- No run should exit without emitting a terminal run event (use finally/cleanup to emit if possible).
- Prefer structured `metadata` for machine parsing rather than embedding data into `message`.

Integration notes
-----------------
- Emit events to stdout/stderr in CI and worker processes so log collectors capture them.
- Consumers can parse JSON-lines to build run/step timelines and calculate success/partial/failed statuses.

Implementation
--------------
See `utils/automationContract.js` and `scripts/automation-contract.js` for a lightweight implementation that prints JSONL to stdout. Use `scripts/automation-contract.js` from shell and CI if you need a zero-dependency emitter.

CI integration example (GitHub Actions)
-------------------------------------
Emit a `START` event at job begin, emit step events during the job, and ensure a terminal run event is emitted in `post` or `finally`. Example snippet:

```yaml
jobs:
	build:
		runs-on: ubuntu-latest
		steps:
			- name: Checkout
				uses: actions/checkout@v4

			- name: Start automation run
				run: node scripts/automation-contract.js start > run.id

			- name: Install
				run: |
					RUN_ID=$(cat run.id)
					node scripts/automation-contract.js step-start "$RUN_ID" install
					npm ci && node scripts/automation-contract.js step-success "$RUN_ID" install "installed"

			- name: Finalize
				if: always()
				run: |
					RUN_ID=$(cat run.id)
					# choose RUN_SUCCESS / RUN_PARTIAL / RUN_FAILED based on log parsing or exit codes
					node scripts/automation-contract.js run-success "$RUN_ID" "job finished"
```

The key is: always emit a terminal run event in an `if: always()` step so the run record is complete even on failures.
