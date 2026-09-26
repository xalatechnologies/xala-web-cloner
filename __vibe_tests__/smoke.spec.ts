import { expect, test } from '@playwright/test';

test('homepage returns 200 and renders a visible H1', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('blogg listing returns 200 and renders a visible H1', async ({ page }) => {
  const response = await page.goto('/blogg');
  expect(response?.status()).toBe(200);

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
