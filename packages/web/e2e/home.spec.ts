import { test, expect } from '@playwright/test';

test('Loads without crashing', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Fweb3/);

});
