export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4" role="status" aria-label="Loading">
      <div className="text-4xl animate-pulse" aria-hidden="true">🦞</div>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        대시보드 로딩 중...
      </p>
    </main>
  );
}
