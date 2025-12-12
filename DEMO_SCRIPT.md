# Demo Video Script: End-to-End Workflow

## Setup (Before Recording)

### 1. Configure Environment Variables
```bash
# Edit .env.local with your actual API keys
nano .env.local

# Required values:
# OPENAI_API_KEY=sk-...
# GITHUB_TOKEN=ghp_...
# REPO_NAME=dotlink-ops/nextjs
```

### 2. Verify Dependencies
```bash
# Activate virtual environment
source venv/bin/activate

# Verify dependencies are installed
pip list | grep -E "(openai|PyGithub|python-dotenv)"
```

### 3. Prepare Demo Notes
```bash
# Create sample notes in output/notes/
cat > output/notes/demo_notes.md << 'EOF'
# Today's Work - Nov 28, 2025

## Accomplishments
- Launched ariadnenexus.com with custom domain and SSL
- Completed services page with three pricing tiers
- Added Resources section with Figma template

## Next Steps
- Create client onboarding workflow automation
- Build email notification system for new leads
- Set up weekly analytics dashboard

## Blockers
- Need to finalize Cal.com integration testing
EOF
```

---

## Demo Recording (5 Steps)

### 1. Show: Adding Notes to the System
```bash
# Terminal view
cd /workspaces/nextjs
ls -la output/notes/

# Open and show demo_notes.md content
cat output/notes/demo_notes.md
```

**Script**: "This is the input layer. Any markdown or text file dropped into `output/notes/` becomes part of the automation pipeline. Could be manual notes, API outputs, or files synced from other tools."

---

### 2. Run: Automation with Real GitHub API
```bash
# Run without --demo flag for live API calls
python3 scripts/daily_v2.py
```

**Script**: "Now we run the automation. Watch it:
1. Ingest the notes from disk
2. Call OpenAI to generate structured summary
3. Create GitHub issues from action items
4. Save outputs for the frontend"

**Expected output**:
```
============================================================
=== Daily automation run starting ===
============================================================
📥 Ingesting notes...
✓ Ingested 1 notes
🤖 Generating summary...
✓ Generated summary using gpt-4-turbo-preview
📋 Creating GitHub issues...
  Created issue #42: Create client onboarding workflow automation
  Created issue #43: Build email notification system for new leads
  Created issue #44: Set up weekly analytics dashboard
✓ Created 3 GitHub issues
💾 Saving output...
  Saved: /workspaces/nextjs/output/daily_summary.json
  Saved: /workspaces/nextjs/output/audit_20251128_191500.json
✓ Output saved successfully
============================================================
✅ AUTOMATION COMPLETE
   Duration: 3.45s
   Notes: 1
   Issues: 3
   Output: /workspaces/nextjs/output/daily_summary.json
============================================================
```

---

### 3. View: Output at API Endpoint
```bash
# In browser or curl
curl http://localhost:3000/api/daily-summary | jq
```

**Script**: "The Next.js API route serves the latest summary. This JSON powers the frontend and could be consumed by other tools—Slack bots, dashboards, mobile apps."

**Expected JSON structure**:
```json
{
  "date": "2025-11-28",
  "created_at": "2025-11-28T19:15:00Z",
  "summary_bullets": [
    "Launched ariadnenexus.com with custom domain",
    "Completed services page with pricing tiers",
    "Added Resources section with template"
  ],
  "action_items": [
    "Create client onboarding workflow automation",
    "Build email notification system for new leads",
    "Set up weekly analytics dashboard"
  ],
  "issues_created": 3,
  "issues": [...]
}
```

---

### 4. View: GitHub Issues Created Automatically
```bash
# Open GitHub in browser
open https://github.com/dotlink-ops/nextjs/issues
```

**Script**: "Three issues were just created automatically—each with:
- Action item as the title
- Auto-generated body with timestamp
- Labels: 'automation', 'daily-runner'
- Ready for prioritization and assignment"

**Show in browser**:
- Issue #42: "Create client onboarding workflow automation"
- Issue #43: "Build email notification system for new leads"
- Issue #44: "Set up weekly analytics dashboard"

---

### 5. View: Live Site at ariadnenexus.com
```bash
# Open live site
open https://www.ariadnenexus.com
```

**Script**: "Finally, the live site at ariadnenexus.com. This isn't just marketing—it's the presentation layer of a real automation system:

1. **Homepage**: Explains the stack (Python, OpenAI, GitHub, Next.js)
2. **Services page**: Three pricing models for client work
3. **Resources section**: Free Figma template for automation studios
4. **API routes**: Live data endpoints (`/api/daily-summary`, `/api/status`)

Everything you just saw—from notes ingestion to issue creation—is what I build for clients. This site is both portfolio and proof."

---

## Demo Cleanup (After Recording)

```bash
# Optional: Delete demo issues if needed
# (Can be done manually via GitHub UI)

# Optional: Clear demo notes
rm output/notes/demo_notes.md

# Keep audit logs for reference
ls -lh output/audit_*.json
```

---

## Key Talking Points

1. **Real automation, not slides**: This runs in production daily
2. **Composable system**: Each piece (Python runner, API, frontend) can be adapted
3. **Safe to test**: `--demo` flag for development, real mode for production
4. **Observable**: Audit logs, API endpoints, GitHub issues provide visibility
5. **Client-ready**: Same pattern used for e-commerce order flows, support ticket triage, analytics pipelines

---

## Recording Tips

- **Screen setup**: Terminal (left), Browser (right), split view
- **Terminal font**: Large enough for video (16-18pt)
- **Browser zoom**: 125-150% for readability
- **Pace**: Pause 2-3 seconds after each command output
- **Total length**: Aim for 3-5 minutes
- **Tools**: OBS Studio, QuickTime (Mac), or Loom for quick recordings

---

## Video Outline (Timestamps)

```
0:00 - Intro: "Let me show you a real automation workflow"
0:15 - Step 1: Adding notes (input layer)
0:45 - Step 2: Running automation (watch the logs)
1:30 - Step 3: API endpoint (JSON output)
2:00 - Step 4: GitHub issues (auto-created)
2:45 - Step 5: Live site (presentation layer)
4:00 - Wrap-up: "This is what I build for clients"
```

---

## Next Steps After Recording

1. **Upload to YouTube/Vimeo** (unlisted or public)
2. **Embed on ariadnenexus.com** (optional `/demo` page)
3. **Share in Cal.com booking flow** (add as context for discovery calls)
4. **Use in proposals** (link in services page or email)
5. **Post on LinkedIn** (case study format)
