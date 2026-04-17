import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('buy groceries');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('todo-item-label').click();
  await page.getByTestId('todo-item-toggle').check();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'Completed' }).click();
});