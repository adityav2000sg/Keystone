/**
 * PII-safe structured logger. Do not log raw email/calendar content, subject/body, or tokens.
 * Allowlist: internal IDs, hashed provider IDs, counters, durations, state transitions.
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogMeta {
  [key: string]: string | number | boolean | undefined;
}

function serialize(level: LogLevel, message: string, meta?: LogMeta): string {
  const payload = {
    level,
    message,
    ...meta,
    timestamp: new Date().toISOString(),
  };
  return JSON.stringify(payload);
}

function log(level: LogLevel, message: string, meta?: LogMeta): void {
  const out = serialize(level, message, meta);
  if (level === "error") {
    process.stderr.write(out + "\n");
  } else {
    process.stdout.write(out + "\n");
  }
}

export const logger = {
  debug: (message: string, meta?: LogMeta) => log("debug", message, meta),
  info: (message: string, meta?: LogMeta) => log("info", message, meta),
  warn: (message: string, meta?: LogMeta) => log("warn", message, meta),
  error: (message: string, meta?: LogMeta) => log("error", message, meta),
};
