import React from 'react';
import { YoutubeEmbed } from './YoutubeEmbed';
import { splitIds } from '../lib/wowhead';
import { getYouTubeEmbedUrl } from '../lib/youtube';
import type { GuideCategory, GuideSubmissionInput } from '../types/models';
import { emptyWowheadRefs } from '../types/models';
import { store } from '../lib/store';
import { log } from '../lib/logger';
import { useAuth } from '../contexts/AuthContext';

const categories: GuideCategory[] = ['Leveling', 'PvP', 'Delves', 'Mythic+', 'Gear'];

const initialForm = {
  title: '',
  youtubeUrl: '',
  category: 'Delves' as GuideCategory,
  summary: '',
  itemIds: '',
  spellIds: '',
  questIds: '',
  npcIds: '',
};

export function SubmitGuideForm() {
  const [form, setForm] = React.useState(initialForm);
  const [message, setMessage] = React.useState('');
  const { user, isAdmin } = useAuth();

  React.useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(''), 3000);
    return () => window.clearTimeout(timer);
  }, [message]);

  const setField = <K extends keyof typeof initialForm>(key: K, value: (typeof initialForm)[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim() || !form.youtubeUrl.trim() || !form.summary.trim()) {
      setMessage('Please add a title, YouTube link, and summary.');
      return;
    }

    if (!getYouTubeEmbedUrl(form.youtubeUrl)) {
      setMessage('That YouTube link does not look embeddable yet.');
      return;
    }

    const payload: GuideSubmissionInput = {
      title: form.title.trim(),
      youtubeUrl: form.youtubeUrl.trim(),
      category: form.category,
      summary: form.summary.trim(),
      submittedBy: user?.email,
      wowhead: {
        ...emptyWowheadRefs(),
        items: splitIds(form.itemIds),
        spells: splitIds(form.spellIds),
        quests: splitIds(form.questIds),
        npcs: splitIds(form.npcIds),
      },
    };

    store.create(payload);
    log('info', 'submit-guide', 'Created local pending submission', { title: payload.title });
    setForm(initialForm);
    setMessage(isAdmin ? 'Guide saved to pending queue.' : 'Guide submitted for review.');
  };

  return (
    <div className="space-y-6 rounded-[2rem] border border-white/10 bg-zinc-950/70 p-6 text-zinc-100 backdrop-blur-xl">
      <div>
        <div className="text-xs uppercase tracking-[0.24em] text-violet-300/80">Submit a guide</div>
        <h2 className="mt-1 text-2xl font-semibold text-white">Turn a video into a structured guide</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Anyone can submit a guide, but only the admin can review and approve it.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <YoutubeEmbed url={form.youtubeUrl} title={form.title || 'Guide preview'} />

        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input type="text" value={form.title} onChange={(e) => setField('title', e.target.value)} placeholder="Guide title" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500" />
            <select value={form.category} onChange={(e) => setField('category', e.target.value as GuideCategory)} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white">
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </div>
          <input type="url" value={form.youtubeUrl} onChange={(e) => setField('youtubeUrl', e.target.value)} placeholder="YouTube URL" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500" />
          <textarea rows={4} value={form.summary} onChange={(e) => setField('summary', e.target.value)} placeholder="Short summary" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input type="text" value={form.itemIds} onChange={(e) => setField('itemIds', e.target.value)} placeholder="Item IDs" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500" />
            <input type="text" value={form.spellIds} onChange={(e) => setField('spellIds', e.target.value)} placeholder="Spell IDs" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500" />
            <input type="text" value={form.questIds} onChange={(e) => setField('questIds', e.target.value)} placeholder="Quest IDs" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500" />
            <input type="text" value={form.npcIds} onChange={(e) => setField('npcIds', e.target.value)} placeholder="NPC IDs" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500" />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="min-h-[24px] text-sm text-violet-200">{message}</div>
            <button type="submit" className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white">Submit guide</button>
          </div>
        </form>
      </div>
    </div>
  );
}
