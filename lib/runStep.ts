export type StepStatus = "start" | "success" | "failure";

export interface StepLog {
  timestamp: string;
  run_id: string;
  stage: string;
  step: string;
  status: StepStatus;
  message?: string;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

export interface RunStepOptions<T> {
  runId: string;
  stage: string;
  step: string;
  fn: () => Promise<T> | T;
  allowFailure?: boolean;
  log: (entry: StepLog) => void;
}

export interface RunStepResult<T> {
  ok: boolean;
  result?: T;
  error?: Error;
}

export async function runStep<T>(
  options: RunStepOptions<T>
): Promise<RunStepResult<T>> {
  const {
    runId,
    stage,
    step,
    fn,
    allowFailure = true,
    log,
  } = options;

  const timestamp = () => new Date().toISOString();

  // STEP START
  log({
    timestamp: timestamp(),
    run_id: runId,
    stage,
    step,
    status: "start",
  });

  try {
    const result = await fn();

    // STEP SUCCESS
    log({
      timestamp: timestamp(),
      run_id: runId,
      stage,
      step,
      status: "success",
    });

    return { ok: true, result };
  } catch (err: any) {
    const error = err instanceof Error ? err : new Error(String(err));

    // STEP FAILURE
    log({
      timestamp: timestamp(),
      run_id: runId,
      stage,
      step,
      status: "failure",
      message: "Step failed",
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });

    if (!allowFailure) {
      throw error;
    }

    return { ok: false, error };
  }
}
