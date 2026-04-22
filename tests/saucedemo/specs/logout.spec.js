/**
 * Logout Test Suite
 * Tests for logout functionality
 */

import { test } from '../fixtures/baseFixtures.js';
import { expect } from '@playwright/test';
import testData from '../data/testData.js';

test.describe('Logout Functionality', () => {
  
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    // Login before each test
    await loginPage.navigate();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await inventoryPage.verifyPageLoaded();
  });

  test('should logout successfully', async ({ inventoryPage, loginPage, page }) => {
    // Perform logout
    await inventoryPage.logout();
    
    // Verify redirected to login page
    await expect(page).toHaveURL(testData.urls.base + '/');
    
    // Verify login page elements are visible
    await loginPage.verifyPageLoaded();
  });

  test('should not access inventory page after logout', async ({ inventoryPage, page }) => {
    // Logout
    await inventoryPage.logout();
    
    // Try to navigate back to inventory page
    await page.goto(testData.urls.inventory);
    
    // Should be redirected to login page
    await expect(page).toHaveURL(testData.urls.base + '/');
  });

  test('should be able to login again after logout', async ({ inventoryPage, loginPage, page }) => {
    // Logout
    await inventoryPage.logout();
    
    // Login again
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    
    // Verify successful login
    await inventoryPage.verifyPageLoaded();
    await expect(page).toHaveURL(testData.urls.inventory);
  });
});
