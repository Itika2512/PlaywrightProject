import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {

  await page.goto('https://pluggy-dev.prismberry.com/dashboard');
  await page.locator('div').filter({ hasText: /^Dashboard$/ }).click();
  await page.locator('div').filter({ hasText: /^Dashboard$/ }).click();
  await page.locator('div').filter({ hasText: /^Dashboard$/ }).dblclick();
  await page.locator('div').filter({ hasText: /^Click here to describe your automation\.\.\.$/ }).nth(1).click();
  await page.getByRole('button', { name: 'Create a Lead in ZOHO CRM and' }).click();
  await page.getByRole('button', { name: 'Generate' }).click();
  await page.getByRole('combobox').filter({ hasText: 'Create a Lead' }).click();
  await page.getByRole('option', { name: 'Create a Lead' }).click();
  await page.getByRole('combobox').filter({ hasText: 'Send message' }).click();
  await page.locator('.flex.items-center.flex-wrap').click();
  await page.getByRole('button', { name: 'Generate' }).click();
  await page.getByText('Workflow BuilderConfigure your workflow detailsActiveSave Workflow').click();
  await expect(page.getByRole('heading', { name: 'Workflow Builder' })).toBeVisible();
 
  await page.getByRole('textbox', { name: 'Title *' }).click();
  await page.getByRole('textbox', { name: 'Title *' }).fill("workflow" + Math.floor(Math.random() * 1000));
  await page.getByRole('combobox').filter({ hasText: 'Choose a tenant...' }).click();
  await page.getByText('Prismberry Incorporation').click();
  await page.locator('div').filter({ hasText: /^ZOHO-CRMCreate a Lead$/ }).first().click();
  await expect(page.locator('div').filter({ hasText: /^TELEGRAMSend message$/ }).first()).toBeVisible();
  await page.getByText('Step 1stZOHO-CRMCreate a LeadStep 2ndTELEGRAMSend message').click();
  await page.locator('span').filter({ hasText: 'TELEGRAM' }).click();
  await page.locator('div').filter({ hasText: /^TELEGRAMSend message$/ }).first().click();
  await expect(page.locator('div').filter({ hasText: /^TELEGRAMSend message$/ }).first()).toBeVisible();
  await page.getByText('Step01ZOHO-CRMStartCreate a').click();
  await page.getByText('Step01ZOHO-CRMStartCreate a').click();
  await page.getByText('Step01ZOHO-CRMStartCreate a').click();
  await expect(page.getByText('Step02TELEGRAMSend messageMap')).toBeVisible();
  await page.getByRole('button', { name: 'Save Workflow' }).click();
  await page.getByRole('heading', { name: 'Workflow01' }).click();
  await expect(page.getByRole('main')).toContainText('Workflow01');
})