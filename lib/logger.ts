import logToConsole from './logToConsole.js';

export function logToConsoleWrapper(entry: any) {
  return logToConsole(entry);
}

export { logToConsoleWrapper as logToConsole };
export default logToConsoleWrapper;
