'use client';

interface AgentData {
  status: string;
  lastActivity: string;
  confidence: number;
  lastMessage: string;
  counts: Record<string, number>;
}

const STATUS_COLORS: Record<string, { bg: string; dot: string; pulse: string }> = {
  green: { bg: 'rgba(34,197,94,0.1)', dot: '#22c55e', pulse: 'pulse-green' },
  yellow: { bg: 'rgba(234,179,8,0.1)', dot: '#eab308', pulse: 'pulse-yellow' },
  red: { bg: 'rgba(239,68,68,0.1)', dot: '#ef4444', pulse: '' },
};

const AGENT_EMOJI: Record<string, string> = {
  main: '👑', attendant: '🤖', po: '📋', pm: '📊', dev: '💻',
  qa: '🔍', marketing: '📢', ux: '🎨', hr: '👥', analyst: '📈', designer: '🖌️',
};

function timeAgo(ts: string): string {
  if (!ts) return '활동 없음';
  const diff = Date.now() - new Date(ts).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return '방금 전';
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  return `${Math.floor(hr / 24)}일 전`;
}

export default function AgentCard({ name, data }: { name: string; data?: AgentData }) {
  const status = data?.status || 'red';
  const colors = STATUS_COLORS[status] || STATUS_COLORS.red;

  return (
    <div
      className="rounded-xl p-3 border border-white/5 transition-all hover:border-white/15 hover:scale-[1.02]"
      style={{ background: 'var(--bg-card)' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-3 h-3 rounded-full ${colors.pulse}`}
          style={{ backgroundColor: colors.dot }}
        />
        <span className="text-sm font-medium truncate">
          {AGENT_EMOJI[name] || '🔵'} {name}
        </span>
      </div>

      {/* Confidence */}
      <div className="mb-1">
        <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
          <span>신뢰도</span>
          <span>{data?.confidence ?? 100}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full" style={{ background: 'var(--bg-secondary)' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${data?.confidence ?? 100}%`,
              background: (data?.confidence ?? 100) >= 80 ? '#22c55e' : (data?.confidence ?? 100) >= 50 ? '#eab308' : '#ef4444',
            }}
          />
        </div>
      </div>

      <div className="text-xs mt-2 truncate" style={{ color: 'var(--text-secondary)' }}>
        {timeAgo(data?.lastActivity || '')}
      </div>
    </div>
  );
}
