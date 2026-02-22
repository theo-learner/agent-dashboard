'use client';

import { useState } from 'react';

interface BusEntry {
  ts: string;
  from: string;
  to: string;
  type: string;
  text: string;
}

const TYPE_CONFIG: Record<
  string,
  {
    icon: string;
    textClass: string;
    badgeClass: string;
  }
> = {
  note: { icon: '📝', textClass: 'text-blue-400', badgeClass: 'bg-blue-500/20 text-blue-200' },
  request: { icon: '📨', textClass: 'text-amber-400', badgeClass: 'bg-amber-500/20 text-amber-200' },
  decision: { icon: '⚡', textClass: 'text-violet-400', badgeClass: 'bg-violet-500/20 text-violet-200' },
  error: { icon: '❌', textClass: 'text-red-400', badgeClass: 'bg-red-500/20 text-red-200' },
  done: { icon: '✅', textClass: 'text-green-400', badgeClass: 'bg-green-500/20 text-green-200' },
  status: { icon: '📊', textClass: 'text-cyan-400', badgeClass: 'bg-cyan-500/20 text-cyan-200' },
};

const FILTERS = ['ALL', 'note', 'request', 'decision', 'error', 'done', 'status'];

export default function LogFeed({ data }: { data: BusEntry[] }) {
  const [filter, setFilter] = useState('ALL');

  const filtered = data
    .filter(e => filter === 'ALL' || e.type === filter)
    .reverse();

  return (
    <div>
      {/* Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-label={`로그 필터: ${f}`}
            aria-pressed={filter === f}
            className="px-3 py-1 rounded-full text-xs font-medium transition-all"
            style={{
              background: filter === f ? 'var(--purple-accent)' : 'var(--bg-secondary)',
              color: filter === f ? '#fff' : 'var(--text-secondary)',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Log entries */}
      <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-thin">
        {filtered.length === 0 ? (
          <div className="text-center py-4" style={{ color: 'var(--text-secondary)' }}>
            로그 없음
          </div>
        ) : (
          filtered.map((entry, i) => {
            const cfg = TYPE_CONFIG[entry.type] || TYPE_CONFIG.note;
            return (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg border border-white/5"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <span className="text-lg shrink-0">{cfg.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold ${cfg.textClass}`}>
                      {entry.from}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${cfg.badgeClass}`}>
                      {entry.type}
                    </span>
                    <span className="text-xs ml-auto shrink-0" style={{ color: 'var(--text-secondary)' }}>
                      {new Date(entry.ts).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    {entry.text}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
