import { test, expect } from '@playwright/test';

test('renders todo items from the API', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('todo-list')).toBeVisible();

  const items = page.getByTestId(/^todo-item-/);
  await expect(items).not.toHaveCount(0);
});

test('todo checkboxes are visible', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('todo-list')).toBeVisible();

  const firstCheckbox = page.getByTestId('todo-checkbox-1');
  await expect(firstCheckbox).toBeVisible();
});
