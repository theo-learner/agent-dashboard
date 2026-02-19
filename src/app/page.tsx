'use client';

import useSWR from 'swr';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import AgentCard from '@/components/AgentCard';
import LogFeed from '@/components/LogFeed';
import { t } from '@/lib/i18n';

const Timeline = dynamic(() => import('@/components/Timeline'), {
  loading: () => <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }} role="status">{t('status.chartLoading')}</div>,
  ssr: false,
});

const fetcher = (url: string) =>
  fetch(url)
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .catch((e) => { throw e; });

const AGENTS = ['main', 'attendant', 'po', 'pm', 'dev', 'qa', 'marketing', 'ux', 'hr', 'analyst', 'designer'];

export default function Home() {
  const { data: statusData, isLoading: statusLoading } = useSWR('/api/status', fetcher, { refreshInterval: 30000 });
  const { data: busData, isLoading: busLoading } = useSWR('/api/bus', fetcher, { refreshInterval: 30000 });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  if (statusData && !statusLoading) {
    const now = new Date();
    if (now.getTime() - lastUpdated.getTime() > 25000) {
      setTimeout(() => setLastUpdated(new Date()), 0);
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-6" role="main">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">
          {t('dashboard.title')}
        </h1>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }} aria-live="polite">
          {t('dashboard.lastUpdated')}: {lastUpdated.toLocaleTimeString('ko-KR')}
        </span>
      </header>

      <section className="mb-8" aria-label={t('section.agentStatus')}>
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--purple-light)' }}>
          {t('section.agentStatus')}
        </h2>
        {statusLoading ? (
          <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }} role="status">{t('status.loading')}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3" role="list">
            {AGENTS.map(agent => (
              <div key={agent} role="listitem">
                <AgentCard name={agent} data={statusData?.[agent]} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-8" aria-label={t('section.timeline')}>
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--purple-light)' }}>
          {t('section.timeline')}
        </h2>
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
          {busLoading ? (
            <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }} role="status">{t('status.loading')}</div>
          ) : (
            <Timeline data={busData || []} />
          )}
        </div>
      </section>

      <section aria-label={t('section.logFeed')}>
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--purple-light)' }}>
          {t('section.logFeed')}
        </h2>
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
          {busLoading ? (
            <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }} role="status">{t('status.loading')}</div>
          ) : (
            <LogFeed data={busData || []} />
          )}
        </div>
      </section>
    </main>
  );
}
