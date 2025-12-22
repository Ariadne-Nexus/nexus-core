import { spawn } from 'child_process';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import assert from 'assert/strict';

const PORT = process.env.PORT || '3001';
const BASE = `http://127.0.0.1:${PORT}`;
const projectRoot = process.cwd();
const outDir = path.join(projectRoot, 'output');
const runFile = path.join(outDir, 'run.json');

async function waitForReady(timeout = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(`${BASE}/api/automation-status`);
      if (res.status >= 200 && res.status < 600) return;
    } catch (e) {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('Timed out waiting for Next dev server to be ready');
}

function startDevServer() {
  const child = spawn('npm', ['run', 'dev'], {
    env: { ...process.env, PORT },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const outBuf = [];
  const errBuf = [];

  child.stdout.on('data', (b) => {
    outBuf.push(String(b));
    process.stdout.write(b);
  });
  child.stderr.on('data', (b) => {
    errBuf.push(String(b));
    process.stderr.write(b);
  });

  child.on('exit', (code, signal) => {
    if (code !== 0) {
      const msg = `Next dev exited early with code=${code} signal=${signal}\n${errBuf.join('')}`;
      console.error(msg);
    }
  });

  return { child, outBuf, errBuf };
}

async function run() {
  await fs.mkdir(outDir, { recursive: true });

  const valid = {
    run_id: '20251215T093012',
    started_at: '2025-12-15T09:30:12Z',
    ended_at: '2025-12-15T09:30:44Z',
    duration_sec: 32.1,
    status: 'partial',
    demo_mode: false,
    steps: [
      { stage: 'ingest', step: 'load-notes', status: 'success' },
      { stage: 'transform', step: 'generate-summary', status: 'failure' }
    ],
    artifacts: { daily_summary: 'output/daily_summary.json' }
  };

  // write valid run.json
  await fs.writeFile(runFile, JSON.stringify(valid, null, 2), 'utf-8');

  const { child, outBuf, errBuf } = startDevServer();

  try {
    // wait for next to be ready or exit early
    const start = Date.now();
    while (Date.now() - start < 60000) {
      if (child.exitCode != null) {
        throw new Error('Next dev process exited early:\n' + errBuf.join(''));
      }
      try {
        const r = await fetch(`${BASE}/api/automation-status`);
        if (r.status >= 200 && r.status < 600) break;
      } catch (e) {
        // ignore
      }
      await new Promise((r) => setTimeout(r, 250));
    }
    if (child.exitCode != null) throw new Error('Next dev process exited early:\n' + errBuf.join(''));

    // ensure endpoint is reachable
    await waitForReady(60000);

    // Case 1: valid
    let resp = await fetch(`${BASE}/api/automation-status`);
    let body = await resp.json();
    assert.equal(resp.status, 200);
    assert.equal(body.ok, true);
    assert.equal(body.automation.run_id, valid.run_id);

    // Case 2: malformed JSON -> 500
    await fs.writeFile(runFile, '{ invalid json', 'utf-8');
    resp = await fetch(`${BASE}/api/automation-status`);
    body = await resp.json();
    assert.equal(resp.status, 500);
    assert.equal(body.ok, false);

    // Case 3: missing file -> 404
    await fs.unlink(runFile);
    resp = await fetch(`${BASE}/api/automation-status`);
    body = await resp.json();
    assert.equal(resp.status, 404);
    assert.equal(body.status, 'unknown');

    console.log('Next E2E tests passed');
  } finally {
    if (child && !child.killed) {
      child.kill('SIGTERM');
      await new Promise((r) => child.once('exit', r));
    }
  }
}

run().catch((err) => {
  console.error('E2E next test failed:', err);
  process.exit(1);
});
