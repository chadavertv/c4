import React from 'react';
import { store } from '../lib/store';
import { useAuth } from '../contexts/AuthContext';
import type { SubmissionStatus } from '../types/models';
import { WowheadLinks } from '../components/WowheadLinks';

const statuses: SubmissionStatus[] = ['draft', 'pending', 'approved', 'rejected'];

export function AdminPage() {
  const [items, setItems] = React.useState(store.list());
  const { user, signOut } = useAuth();

  const update = (id: string, status: SubmissionStatus) => {
    setItems(store.updateStatus(id, status));
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-[1.75rem] border border-white/10 bg-zinc-950/70 px-5 py-4 backdrop-blur-xl">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">Admin</div>
            <div className="text-sm font-semibold text-zinc-100">Signed in as {user?.email}</div>
          </div>
          <button onClick={() => void signOut()} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">Sign out</button>
        </header>

        <section className="pt-8">
          <h1 className="text-3xl font-semibold">Submission queue</h1>
          <p className="mt-2 text-sm text-zinc-400">Only the allowlisted admin can see or use moderation controls.</p>
          <div className="mt-6 space-y-4">
            {items.length ? items.map((item) => (
              <div key={item.id} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-violet-300">{item.category} · {item.status}</div>
                    <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">{item.summary}</p>
                    <div className="mt-3 text-xs text-zinc-500">Submitted by {item.submittedBy ?? 'unknown'} · {new Date(item.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <button key={status} onClick={() => update(item.id, status)} className={`rounded-full px-3 py-2 text-xs uppercase tracking-[0.18em] ${item.status === status ? 'bg-violet-500/20 text-violet-200' : 'bg-white/5 text-zinc-300'}`}>{status}</button>
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <WowheadLinks kind="item" values={item.wowhead.items} />
                  <WowheadLinks kind="spell" values={item.wowhead.spells} />
                  <WowheadLinks kind="quest" values={item.wowhead.quests} />
                  <WowheadLinks kind="npc" values={item.wowhead.npcs} />
                </div>
              </div>
            )) : <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-zinc-400">No submissions yet.</div>}
          </div>
        </section>
      </div>
    </div>
  );
}
