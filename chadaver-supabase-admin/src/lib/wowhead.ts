import type { WowheadKind } from '../types/models';

export function splitIds(value: string): string[] {
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function buildWowheadUrl(kind: WowheadKind, id: string): string {
  return `https://www.wowhead.com/${kind}=${id}`;
}
