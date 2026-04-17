import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/?zx=1776099272888');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('youtube');
  await page.locator('iframe[name="a-jmqq46jugjwd"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.locator('iframe[name="c-jmqq46jugjwd"]').contentFrame().locator('[id="6"]').click();
  await page.locator('iframe[name="c-jmqq46jugjwd"]').contentFrame().locator('[id="6"]').click();
  await page.locator('iframe[name="c-jmqq46jugjwd"]').contentFrame().locator('[id="6"]').click();
  await page.locator('iframe[name="c-jmqq46jugjwd"]').contentFrame().locator('[id="7"]').click();
  await page.locator('iframe[name="c-jmqq46jugjwd"]').contentFrame().locator('[id="4"]').click();
  await page.locator('iframe[name="c-jmqq46jugjwd"]').contentFrame().getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('link', { name: 'YouTube YouTube https://www.' }).click();
});