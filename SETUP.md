# Project Setup Guide

This guide walks through cloning the repository, installing dependencies, configuring environment variables, and running both the Next.js app and the Python daily runner.

## 1) Clone the repository

1. Ensure **Git**, **Node.js 18+ (20/22 recommended)**, and **Python 3.11+** are installed.
2. Clone and enter the project directory:
   ```bash
   git clone https://github.com/dotlink-ops/nextjs.git
   cd nextjs
   ```

## 2) Install dependencies

### Next.js (Node.js)
1. Install Node.js packages:
   ```bash
   npm install
   ```

### Python automation
1. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install Python requirements:
   ```bash
   pip install -r scripts/requirements.txt
   ```

## 3) Configure environment variables

1. Copy the template and edit values as needed:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and set:
   - `OPENAI_API_KEY` – required for production runs of the Python automation.
   - `GITHUB_TOKEN` – PAT with `repo` scope for creating GitHub issues.
   - `REPO_NAME` – target repository in `owner/repo` format.
3. Demo mode does **not** require any keys; you can skip filling these values if you only plan to run with `--demo`.

## 4) Run the Python daily runner

> Commands assume you are in the repository root and the virtual environment is active (`source venv/bin/activate`).

- **Demo mode (no external API calls):**
  ```bash
  python3 scripts/daily_v2.py --demo
  ```
- **Production mode (uses OpenAI + GitHub):**
  ```bash
  python3 scripts/daily_v2.py
  ```
- **Convenience wrapper:**
  ```bash
  ./run-daily.sh
  ```
  This script ensures the virtual environment exists, installs dependencies if needed, and runs the automation.

Outputs are written to `output/daily_summary.json` (main summary) and `output/audit_*.json` (audit logs).

## 5) Run the Next.js app

- **Development server:**
  ```bash
  npm run dev
  ```
  Then open http://localhost:3000 in your browser.

- **Production build and preview:**
  ```bash
  npm run build
  npm start
  ```

## 6) Common validation commands

- Run the automation in demo mode to verify Python setup:
  ```bash
  python3 scripts/daily_v2.py --demo
  ```
- Build the frontend to verify TypeScript and Next.js configuration:
  ```bash
  npm run build
  ```

You’re ready to develop! See `README.md` for deeper architecture details and additional commands.
