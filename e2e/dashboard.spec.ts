import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('loads and shows title', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('가재');
  });

  test('renders agent status cards', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('[role="listitem"]');
    await expect(cards).toHaveCount(11); // 11 agents
  });

  test('renders section headings', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=에이전트 상태')).toBeVisible();
    await expect(page.locator('text=24시간 타임라인')).toBeVisible();
    await expect(page.locator('text=실시간 로그 피드')).toBeVisible();
  });

  test('has proper aria landmarks', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('main[role="main"]');
    await expect(main).toBeVisible();
    const sections = page.locator('section[aria-label]');
    await expect(sections).toHaveCount(3);
  });

  test('log feed filter buttons exist', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button:text("ALL")')).toBeVisible();
  });
});
