# Demo / Local Run Notes

This file contains suggested steps for a local demo walkthrough and references to sample outputs included in `SAMPLE_OUTPUTS/`.

Local walkthrough (copy-paste):

1. Install and run the site

```bash
npm install
npm run dev
```

2. Open the site at `http://localhost:3000` and navigate the landing page to show the automation story.

3. Demo the automation outputs

- If the automation runner exists in this repo (look for a script like `run-daily.sh` or a Python/Node entrypoint), run it inside a virtual environment. Example commands (replace with actual runner command if present):

```bash
# Example: Unix shell wrapper
./run-daily.sh

# Example: Python module
python -m daily_runner

# Example: Node script
node scripts/run-daily.js
```

- If no runner is present, show the sanitized sample artifacts in `SAMPLE_OUTPUTS/` to demonstrate expected results.

4. Show sample outputs

- `SAMPLE_OUTPUTS/daily_runner_summary.txt` — an example generated stakeholder summary.
- `SAMPLE_OUTPUTS/issue_pipeline_log.txt` — an example log showing OpenAI → GitHub issue creation entries.

Suggested screen flow for a short Loom demo

1. Show repo structure and `README.md` (1–2 minutes).
2. Start the dev server and show the landing page (30–60s).
3. Run the daily runner (if present) or open `SAMPLE_OUTPUTS/` (1–2 minutes).
4. Show the resulting issue(s) in a test GitHub repo (if demoing live) or show the `issue_pipeline_log.txt` for a recorded example (30–60s).

Security / demo notes

- Use a test GitHub repo and a scoped token for demos — never use production tokens.
- Sanitize any real client data before sharing sample logs/screenshots.
