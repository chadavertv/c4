export type GuideCategory = 'Leveling' | 'PvP' | 'Delves' | 'Mythic+' | 'Gear';
export type SubmissionStatus = 'draft' | 'pending' | 'approved' | 'rejected';
export type WowheadKind = 'item' | 'spell' | 'quest' | 'npc';

export type WowheadRefs = {
  items: string[];
  spells: string[];
  quests: string[];
  npcs: string[];
};

export type GuideSubmissionInput = {
  title: string;
  youtubeUrl: string;
  category: GuideCategory;
  summary: string;
  wowhead: WowheadRefs;
  submittedBy?: string;
};

export type GuideSubmission = GuideSubmissionInput & {
  id: string;
  status: SubmissionStatus;
  slug: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
};

export type GuideRecord = {
  id: string;
  submissionId: string;
  slug: string;
  title: string;
  youtubeUrl: string;
  category: GuideCategory;
  summary: string;
  wowhead: WowheadRefs;
  publishedAt: string;
  updatedAt: string;
};

export const emptyWowheadRefs = (): WowheadRefs => ({
  items: [],
  spells: [],
  quests: [],
  npcs: [],
});
