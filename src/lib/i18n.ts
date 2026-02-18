export type Locale = 'ko' | 'en';

const messages: Record<Locale, Record<string, string>> = {
  ko: {
    'dashboard.title': '🦞 가재 에이전트 대시보드',
    'dashboard.lastUpdated': '최종 갱신',
    'section.agentStatus': '에이전트 상태',
    'section.timeline': '24시간 타임라인',
    'section.logFeed': '실시간 로그 피드',
    'status.loading': '로딩 중...',
    'status.chartLoading': '차트 로딩 중...',
    'status.noLogs': '로그 없음',
    'status.noActivity': '활동 없음',
    'status.justNow': '방금 전',
    'status.confidence': '신뢰도',
    'error.title': '문제가 발생했습니다',
    'error.description': '대시보드를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.',
    'error.retry': '다시 시도',
    'loading.message': '대시보드 로딩 중...',
  },
  en: {
    'dashboard.title': '🦞 Gajae Agent Dashboard',
    'dashboard.lastUpdated': 'Last updated',
    'section.agentStatus': 'Agent Status',
    'section.timeline': '24h Timeline',
    'section.logFeed': 'Live Log Feed',
    'status.loading': 'Loading...',
    'status.chartLoading': 'Loading chart...',
    'status.noLogs': 'No logs',
    'status.noActivity': 'No activity',
    'status.justNow': 'Just now',
    'status.confidence': 'Confidence',
    'error.title': 'Something went wrong',
    'error.description': 'An error occurred while loading the dashboard. Please try again.',
    'error.retry': 'Retry',
    'loading.message': 'Loading dashboard...',
  },
};

const defaultLocale: Locale = 'ko';

export function t(key: string, locale: Locale = defaultLocale): string {
  return messages[locale]?.[key] ?? messages[defaultLocale]?.[key] ?? key;
}

export function getLocales(): Locale[] {
  return ['ko', 'en'];
}
