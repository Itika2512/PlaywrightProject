//Include playwright module

const { test, expect } = require('@playwright/test');

test('Validate youtube page', async ({ page }) => {

page.goto('https://www.youtube.com/');
await expect(page).toHaveTitle('YouTube');


await page.getByRole('combobox', { name: 'Search1' }).fill('playwright');
await page.getByRole('button', { name: 'Search', exact: true }).click();

await page.getByRole('link', { name: 'Playwright Beginner Tutorials', exact: true }).click();
await page.screenshot({ path: './tests/screenshots/youtube.png' });

await page.close();
})