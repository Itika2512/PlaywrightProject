//Include playwright module

const { test, expect } = require('@playwright/test');
const { beforeEach } = require('node:test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page).toHaveTitle('Swag Labs');
});

test('login validation', async ({ page }) => {



//page.waitForTimeout(2000);
//login with valid credentials
await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();

//Add to cart
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await page.screenshot({ path: './tests/screenshots/saucedemo.png' });

//Checkout the product
// await page.locator('[data-test="shopping-cart-link"]').click();
// await page.getByRole('button', { name: 'Checkout' }).click();
// await page.getByPlaceholder('First Name').fill('John');
// await page.getByPlaceholder('Last Name').fill('Doe');
// await page.getByPlaceholder('Postal Code').fill('12345');
// await page.getByRole('button', { name: 'Continue' }).click();
// await page.getByRole('button', { name: 'Finish' }).click();


//remove the product
 await page.getByRole('button', { name: 'Remove', exact: true }).click();
 await page.getByRole('button', { name: 'Open Menu' }).click();
 await page.getByRole('link', { name: 'Logout' }).click();



await page.close();
})