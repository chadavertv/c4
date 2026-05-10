import type { GuideSubmission, GuideSubmissionInput, SubmissionStatus } from '../types/models';

const STORAGE_KEY = 'chadaver.submissions';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

function readAll(): GuideSubmission[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as GuideSubmission[];
  } catch {
    return [];
  }
}

function writeAll(items: GuideSubmission[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const store = {
  list(): GuideSubmission[] {
    return readAll();
  },
  create(input: GuideSubmissionInput): GuideSubmission {
    const now = new Date().toISOString();
    const next: GuideSubmission = {
      ...input,
      id: crypto.randomUUID(),
      status: 'pending',
      slug: slugify(input.title),
      createdAt: now,
      updatedAt: now,
    };
    const current = readAll();
    writeAll([next, ...current]);
    return next;
  },
  updateStatus(id: string, status: SubmissionStatus, notes?: string): GuideSubmission[] {
    const next = readAll().map((item) =>
      item.id === id ? { ...item, status, notes, updatedAt: new Date().toISOString() } : item,
    );
    writeAll(next);
    return next;
  },
};
