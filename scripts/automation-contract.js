#!/usr/bin/env node
import * as ac from '../utils/automationContract.js';

function usage() {
  console.error('Usage: automation-contract.js <start|step-start|step-success|step-failure|run-success|run-partial|run-failed> args...');
  console.error('Examples:');
  console.error('  node scripts/automation-contract.js start');
  console.error('  node scripts/automation-contract.js start my-run-id');
  console.error('  node scripts/automation-contract.js step-start <runId> <stepName>');
  process.exit(2);
}

const [, , cmd, ...rest] = process.argv;
if (!cmd) usage();

switch (cmd) {
  case 'start': {
    const runId = rest[0] || undefined;
    ac.startRun(runId);
    break;
  }
  case 'step-start': {
    const [runId, stepName] = rest;
    if (!runId || !stepName) usage();
    ac.stepStart(runId, stepName);
    break;
  }
  case 'step-success': {
    const [runId, stepName, ...msg] = rest;
    if (!runId || !stepName) usage();
    ac.stepSuccess(runId, stepName, msg.join(' '));
    break;
  }
  case 'step-failure': {
    const [runId, stepName, ...msg] = rest;
    if (!runId || !stepName) usage();
    ac.stepFailure(runId, stepName, msg.join(' '));
    break;
  }
  case 'run-success': {
    const [runId, ...msg] = rest;
    if (!runId) usage();
    ac.runSuccess(runId, msg.join(' '));
    break;
  }
  case 'run-partial': {
    const [runId, ...msg] = rest;
    if (!runId) usage();
    ac.runPartial(runId, msg.join(' '));
    break;
  }
  case 'run-failed': {
    const [runId, ...msg] = rest;
    if (!runId) usage();
    ac.runFailed(runId, msg.join(' '));
    break;
  }
  default:
    usage();
}
