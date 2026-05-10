import { buildWowheadUrl } from '../lib/wowhead';
import type { WowheadKind } from '../types/models';

export function WowheadLinks({ kind, values }: { kind: WowheadKind; values: string[] }) {
  if (!values.length) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">{kind}s</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((value) => (
          <a
            key={`${kind}-${value}`}
            href={buildWowheadUrl(kind, value)}
            target="_blank"
            rel="noreferrer"
            data-wowhead={`${kind}=${value}`}
            className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-xs text-violet-200 hover:border-violet-300/40 hover:text-white"
          >
            {value}
          </a>
        ))}
      </div>
    </div>
  );
}
