'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
      <div className="text-4xl">⚠️</div>
      <h2 className="text-xl font-semibold">문제가 발생했습니다</h2>
      <p className="text-sm text-center" style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
        대시보드를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        style={{ background: 'var(--purple-light)', color: '#fff' }}
      >
        다시 시도
      </button>
    </main>
  );
}
