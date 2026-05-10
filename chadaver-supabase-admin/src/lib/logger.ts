export type LogLevel = 'info' | 'warn' | 'error';

export type AppLog = {
  at: string;
  level: LogLevel;
  area: string;
  message: string;
  meta?: Record<string, unknown>;
};

const STORAGE_KEY = 'chadaver.logs';

export function log(level: LogLevel, area: string, message: string, meta?: Record<string, unknown>) {
  const entry: AppLog = { at: new Date().toISOString(), level, area, message, meta };
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as AppLog[];
    current.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current.slice(0, 100)));
  } catch {
    // ignore storage errors
  }
  if (level === 'error') console.error(entry);
  else if (level === 'warn') console.warn(entry);
  else console.log(entry);
}
