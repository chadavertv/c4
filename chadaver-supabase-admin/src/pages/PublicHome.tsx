import { Link } from 'react-router-dom';
import { SubmitGuideForm } from '../components/SubmitGuideForm';
import { featured } from '../data/siteData';
import { useAuth } from '../contexts/AuthContext';

export function PublicHome() {
  const { isAdmin, user } = useAuth();

  return (
    <div className="min-h-screen bg-[#05050a] text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-[1.75rem] border border-white/10 bg-zinc-950/70 px-5 py-4 backdrop-blur-xl">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">Chadaver.gg</div>
            <div className="text-sm font-semibold text-zinc-100">WoW creator hub</div>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin ? <Link to="/admin" className="rounded-2xl border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">Admin</Link> : null}
            {user ? <span className="text-sm text-zinc-400">{user.email}</span> : <Link to="/login" className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white">Admin login</Link>}
          </div>
        </header>

        <section className="py-14 text-center">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-violet-400/20 bg-[linear-gradient(180deg,rgba(15,15,24,0.94),rgba(7,7,12,0.98))] px-6 py-12 shadow-[0_0_80px_rgba(76,29,149,0.45)]">
            <div className="text-5xl">💀👍</div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl">CHADAVER.GG</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              In-depth guides, practical gameplay breakdowns, and a submission pipeline that feeds an admin review queue.
            </p>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {featured.map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-violet-300">{item.category}</div>
              <h2 className="mt-2 text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="pt-14">
          <SubmitGuideForm />
        </section>
      </div>
    </div>
  );
}
