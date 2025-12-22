// Temporary console logger used until persistent logging is wired.
// Entries are emitted as single-line JSON to keep logs machine-readable.
export function logToConsole(entry: any) {
  console.log(JSON.stringify(entry));
}

export default logToConsole;
