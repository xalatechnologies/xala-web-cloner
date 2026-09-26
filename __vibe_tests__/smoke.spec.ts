import { expect, test } from '@playwright/test';

test('homepage returns 200 and renders a visible H1', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);

  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toBeVisible();
  await expect(h1).toContainText('Vi bygger');
});

test('blogg listing returns 200 and renders a visible H1', async ({ page }) => {
  const response = await page.goto('/blogg');
  expect(response?.status()).toBe(200);

  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toBeVisible();
  await expect(h1).toHaveText('Erfaringer fra systemer i drift');
});
