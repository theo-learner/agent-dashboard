'use client';

import { t } from '@/lib/i18n';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 px-4" role="alert">
      <div className="text-4xl" aria-hidden="true">⚠️</div>
      <h2 className="text-xl font-semibold">{t('error.title')}</h2>
      <p className="text-sm text-center" style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
        {t('error.description')}
      </p>
      <button
        onClick={reset}
        aria-label={t('error.retry')}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        style={{ background: 'var(--purple-light)', color: '#fff' }}
      >
        {t('error.retry')}
      </button>
    </main>
  );
}
