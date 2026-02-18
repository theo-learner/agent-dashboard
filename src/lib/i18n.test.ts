import { describe, it, expect } from 'vitest';
import { t, getLocales } from './i18n';

describe('i18n', () => {
  it('returns Korean by default', () => {
    expect(t('dashboard.title')).toContain('가재');
  });

  it('returns English when requested', () => {
    expect(t('dashboard.title', 'en')).toContain('Gajae');
  });

  it('falls back to key for unknown keys', () => {
    expect(t('unknown.key')).toBe('unknown.key');
  });

  it('lists available locales', () => {
    expect(getLocales()).toEqual(['ko', 'en']);
  });
});
