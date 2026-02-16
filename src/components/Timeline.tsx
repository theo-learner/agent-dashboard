'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AGENTS = ['main', 'attendant', 'po', 'pm', 'dev', 'qa', 'marketing', 'ux', 'hr', 'analyst', 'designer'];

const AGENT_COLORS: Record<string, string> = {
  main: '#f59e0b', attendant: '#3b82f6', po: '#8b5cf6', pm: '#ec4899',
  dev: '#10b981', qa: '#f97316', marketing: '#06b6d4', ux: '#e11d48',
  hr: '#84cc16', analyst: '#6366f1', designer: '#14b8a6',
};

interface BusEntry {
  ts: string;
  from: string;
  type: string;
  text: string;
}

function normalizeAgent(from: string): string {
  const lower = from.toLowerCase();
  for (const a of AGENTS) {
    if (lower.startsWith(a) || lower.includes(`:${a}:`)) return a;
  }
  return lower;
}

export default function Timeline({ data }: { data: BusEntry[] }) {
  // Group by hour for last 24h
  const now = new Date();
  const hours: { hour: string; [key: string]: number | string }[] = [];
  
  for (let i = 23; i >= 0; i--) {
    const h = new Date(now.getTime() - i * 3600000);
    const hourKey = h.toLocaleTimeString('ko-KR', { hour: '2-digit', hour12: false });
    const entry: Record<string, number | string> = { hour: hourKey };
    AGENTS.forEach(a => { entry[a] = 0; });
    hours.push(entry as { hour: string; [key: string]: number | string });
  }

  const dayAgo = now.getTime() - 24 * 3600000;
  for (const e of data) {
    const ts = new Date(e.ts).getTime();
    if (ts < dayAgo) continue;
    const hoursAgo = Math.floor((now.getTime() - ts) / 3600000);
    const idx = 23 - hoursAgo;
    if (idx >= 0 && idx < 24) {
      const agent = normalizeAgent(e.from);
      if (AGENTS.includes(agent)) {
        (hours[idx][agent] as number)++;
      }
    }
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={hours} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <XAxis dataKey="hour" tick={{ fill: '#9b95b0', fontSize: 11 }} interval={3} />
        <YAxis tick={{ fill: '#9b95b0', fontSize: 11 }} />
        <Tooltip
          contentStyle={{ background: '#1a1230', border: '1px solid #7c3aed', borderRadius: '8px', color: '#e2e0ef' }}
        />
        {AGENTS.map(agent => (
          <Bar key={agent} dataKey={agent} stackId="a" fill={AGENT_COLORS[agent]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
