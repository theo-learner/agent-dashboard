'use client';

import useSWR from 'swr';
import { useState } from 'react';
import AgentCard from '@/components/AgentCard';
import Timeline from '@/components/Timeline';
import LogFeed from '@/components/LogFeed';

const fetcher = (url: string) => fetch(url).then(r => r.json());

const AGENTS = ['main', 'attendant', 'po', 'pm', 'dev', 'qa', 'marketing', 'ux', 'hr', 'analyst', 'designer'];

export default function Home() {
  const { data: statusData, isLoading: statusLoading } = useSWR('/api/status', fetcher, { refreshInterval: 30000 });
  const { data: busData, isLoading: busLoading } = useSWR('/api/bus', fetcher, { refreshInterval: 30000 });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Update timestamp when data refreshes
  if (statusData && !statusLoading) {
    const now = new Date();
    if (now.getTime() - lastUpdated.getTime() > 25000) {
      setTimeout(() => setLastUpdated(new Date()), 0);
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">
          🦞 가재 에이전트 대시보드
        </h1>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          최종 갱신: {lastUpdated.toLocaleTimeString('ko-KR')}
        </span>
      </header>

      {/* Agent Status Cards */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--purple-light)' }}>
          에이전트 상태
        </h2>
        {statusLoading ? (
          <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>로딩 중...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {AGENTS.map(agent => (
              <AgentCard
                key={agent}
                name={agent}
                data={statusData?.[agent]}
              />
            ))}
          </div>
        )}
      </section>

      {/* Timeline */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--purple-light)' }}>
          24시간 타임라인
        </h2>
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
          {busLoading ? (
            <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>로딩 중...</div>
          ) : (
            <Timeline data={busData || []} />
          )}
        </div>
      </section>

      {/* Log Feed */}
      <section>
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--purple-light)' }}>
          실시간 로그 피드
        </h2>
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)' }}>
          {busLoading ? (
            <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>로딩 중...</div>
          ) : (
            <LogFeed data={busData || []} />
          )}
        </div>
      </section>
    </main>
  );
}
