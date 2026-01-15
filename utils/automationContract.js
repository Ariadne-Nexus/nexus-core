/* Lightweight Automation Contract emitter
 * Emits newline-delimited JSON events to stdout following the repository's
 * Single Automation Contract (see docs/AUTOMATION_CONTRACT.md).
 */
import { randomUUID } from 'crypto';

function isoNow() {
  return new Date().toISOString();
}

function parseStageAndStep(stepName) {
  if (!stepName) return { stage: null, step: null };
  const parts = String(stepName).split(':');
  if (parts.length >= 2) return { stage: parts[0], step: parts.slice(1).join(':') };
  return { stage: null, step: stepName };
}

function normalizeStatus(eventType) {
  switch (eventType) {
    case 'START':
    case 'STEP_START':
      return 'start';
    case 'STEP_SUCCESS':
    case 'RUN_SUCCESS':
      return 'success';
    case 'STEP_FAILURE':
    case 'RUN_PARTIAL':
    case 'RUN_FAILED':
      return 'failure';
    default:
      return 'failure';
  }
}

function emitStructured({ eventType, runId, stepName, message, metadata, error, timestamp }) {
  const ts = timestamp || isoNow();
  const { stage, step } = parseStageAndStep(stepName);
  const status = normalizeStatus(eventType);

  const out = {
    timestamp: ts,
    run_id: runId,
    stage: stage === null ? null : stage,
    step: step === null ? null : step,
    status,
    message: message || '',
  };

  if (error) out.error = typeof error === 'string' ? error : { message: error.message, stack: error.stack };
  if (metadata && Object.keys(metadata).length) out.metadata = metadata;
  // For run-level partial/failed events, include result annotation
  if (eventType === 'RUN_PARTIAL') out.metadata = { ...(out.metadata || {}), run_result: 'partial' };
  if (eventType === 'RUN_FAILED') out.metadata = { ...(out.metadata || {}), run_result: 'failed' };

  // single-line JSON only
  const line = JSON.stringify(out);
  console.log(line);
  // If a run manager is available, append to logfile as well.
  try {
    const mgr = globalThis.__run_manager;
    if (mgr && typeof mgr.appendLog === 'function') mgr.appendLog(out);
  } catch (_e) {
    // do not crash logging
  }
}

export function startRun(runId, metadata) {
  const id = runId || randomUUID();
  emitStructured({ eventType: 'START', runId: id, stepName: 'lifecycle:start', metadata });
  return id;
}

export function stepStart(runId, stepName, metadata) {
  emitStructured({ eventType: 'STEP_START', runId, stepName, metadata });
}

export function stepSuccess(runId, stepName, message, metadata) {
  emitStructured({ eventType: 'STEP_SUCCESS', runId, stepName, message, metadata });
}

export function stepFailure(runId, stepName, message, metadata) {
  emitStructured({ eventType: 'STEP_FAILURE', runId, stepName, message, error: metadata?.error || null, metadata });
}

export function runSuccess(runId, message, metadata) {
  emitStructured({ eventType: 'RUN_SUCCESS', runId, message, metadata, stepName: 'lifecycle:run' });
}

export function runPartial(runId, message, metadata) {
  emitStructured({ eventType: 'RUN_PARTIAL', runId, message, metadata, stepName: 'lifecycle:run' });
}

export function runFailed(runId, message, metadata) {
  emitStructured({ eventType: 'RUN_FAILED', runId, message, metadata, stepName: 'lifecycle:run' });
}

export async function wrapStep(runId, stepName, fn, metadata) {
  stepStart(runId, stepName, metadata);
  try {
    const res = await fn();
    stepSuccess(runId, stepName, undefined, metadata);
    return res;
  } catch (err) {
    stepFailure(runId, stepName, String(err?.message || err), { ...(metadata || {}), error: err?.stack || String(err) });
    throw err;
  }
}
