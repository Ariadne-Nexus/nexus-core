import fs from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { randomBytes } from 'crypto';

function shortHash() {
  return randomBytes(4).toString('hex');
}

function sanitizeTimestamp(ts) {
  return ts.replace(/[:.]/g, '-');
}

export function makeRunId() {
  const ts = new Date().toISOString();
  return `${sanitizeTimestamp(ts)}-${shortHash()}`;
}

export class RunManager {
  constructor({ runId, baseDir = 'output' } = {}) {
    this.runId = runId || makeRunId();
    this.baseDir = baseDir;
    this.dir = `${this.baseDir}/${this.runId}`;
    this.logsPath = `${this.dir}/logs.jsonl`;
    this.summaryPath = `${this.dir}/run.json`;
    this.stream = null;
    this.summary = {
      run_id: this.runId,
      started_at: new Date().toISOString(),
      ended_at: null,
      overall_status: null,
      steps: [],
    };
    this._stepsIndex = new Map();
  }

  async init() {
    await mkdir(this.dir, { recursive: true });
    this.stream = fs.createWriteStream(this.logsPath, { flags: 'a' });
    // expose globally so automationContract can append
    globalThis.__run_manager = this;
  }

  appendLog(obj) {
    if (!this.stream) return; // not initialized
    try {
      this.stream.write(JSON.stringify(obj) + '\n');
    } catch (_e) {
      // swallow to avoid breaking runner
    }

    // update summary steps when step/status present
    const stepName = obj.step ? `${obj.stage || 'unknown'}:${obj.step}` : null;
    if (stepName) {
      const existing = this._stepsIndex.get(stepName) || { name: stepName, status: null, error: null };
      if (obj.status === 'start') {
        existing.status = 'started';
      } else if (obj.status === 'success') {
        existing.status = 'success';
      } else if (obj.status === 'failure') {
        existing.status = 'failed';
        if (obj.error) existing.error = typeof obj.error === 'string' ? obj.error : obj.error.message;
      }
      this._stepsIndex.set(stepName, existing);
    }
  }

  async saveArtifact(name, data) {
    const p = `${this.dir}/${name}`;
    await writeFile(p, typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    return p;
  }

  async finalize(overallStatus = 'success') {
    this.summary.ended_at = new Date().toISOString();
    this.summary.overall_status = overallStatus;
    this.summary.steps = Array.from(this._stepsIndex.values());
    try {
      if (this.stream) {
        this.stream.end();
        this.stream = null;
      }
      await writeFile(this.summaryPath, JSON.stringify(this.summary, null, 2));
    } catch (_e) {
      // ignore
    }
  }
}

export async function createRun(options = {}) {
  const mgr = new RunManager(options);
  await mgr.init();
  return mgr;
}
