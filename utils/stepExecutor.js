import * as ac from './automationContract.js';

/**
 * runStep executes a single step with standardized logging and failure handling.
 *
 * Args: { runId, name, fn, allowFailure=false, metadata }
 * Returns: { status: 'success'|'failed-allowed'|'failed', result?, error? }
 */
export async function runStep({ runId, name, fn, allowFailure = false, metadata } = {}) {
  if (!runId) throw new Error('runId is required');
  if (!name) throw new Error('step name is required');
  if (typeof fn !== 'function') throw new Error('fn must be a function');

  ac.stepStart(runId, name, metadata);
  try {
    const res = await fn();
    ac.stepSuccess(runId, name, undefined, metadata);
    return { status: 'success', result: res };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    ac.stepFailure(runId, name, message, { ...(metadata || {}), stack });
    if (allowFailure) {
      return { status: 'failed-allowed', error: { message, stack } };
    }
    return { status: 'failed', error: { message, stack } };
  }
}

export default runStep;
