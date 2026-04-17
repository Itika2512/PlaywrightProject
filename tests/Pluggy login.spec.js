import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {

//   await page.goto('https://pluggy-dev.prismberry.com/login');
//   await page.getByRole('textbox', { name: 'Username' }).click();
//   await page.getByRole('textbox', { name: 'Username' }).fill('itika.mittal@prismberry.com');
//   await page.getByRole('textbox', { name: 'Username' }).press('Tab');
//   await page.getByRole('textbox', { name: 'Password' }).fill('Life@12345');
//   await page.getByRole('button', { name: 'Show password' }).click();
//   await page.getByRole('button', { name: 'Sign In' }).click();
//   await expect(page.getByRole('heading', { name: 'Pluggy', exact: true })).toBeVisible();
//   await expect(page.locator('header')).toContainText('Itika Mittal');
//   await page.getByRole('button', { name: 'IM Itika Mittal' }).click();
//   //await page.getByRole('menuitem', { name: 'Sign Out' }).click();

await page.goto('https://pluggy-dev.prismberry.com/login');
await page.getByTestId('Username').click();
await page.getByTestId('Username').fill('itika.mittal@prismberry.com');
await page.getByTestId('textbox', { id: 'password' }).click();
await page.getByTestId('textbox', { id: 'password' }).fill('Life@12345');
await page.getByRole('button', { name: 'Show password' }).click();






  

})