/**
 * Login Test Suite
 * Tests for login functionality
 */

import { test } from '../fixtures/baseFixtures.js';
import { expect } from '@playwright/test';
import testData from '../data/testData.js';

test.describe('Login Functionality', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.verifyPageLoaded();
  });

  test('should login successfully with valid credentials', async ({ loginPage, inventoryPage, page }) => {
    // Login with standard user
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    
    // Verify successful login by checking inventory page
    await inventoryPage.verifyPageLoaded();
    await expect(page).toHaveURL(testData.urls.inventory);
    
    // Verify products are displayed
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should show error for locked out user', async ({ loginPage }) => {
    // Attempt login with locked user
    await loginPage.login(testData.users.locked.username, testData.users.locked.password);
    
    // Verify error message
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(testData.messages.lockedOutError);
  });

  test('should show error for invalid username', async ({ loginPage }) => {
    // Attempt login with invalid username
    await loginPage.login(testData.invalidCredentials.invalidUser.username, testData.invalidCredentials.invalidUser.password);
    
    // Verify error message
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(testData.messages.invalidCredentialsError);
  });

  test('should show error for invalid password', async ({ loginPage }) => {
    // Attempt login with invalid password
    await loginPage.login(testData.invalidCredentials.invalidPassword.username, testData.invalidCredentials.invalidPassword.password);
    
    // Verify error message
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(testData.messages.invalidCredentialsError);
  });

  test('should show error for empty username', async ({ loginPage }) => {
    // Attempt login with empty username
    await loginPage.login(testData.invalidCredentials.emptyUsername.username, testData.invalidCredentials.emptyUsername.password);
    
    // Verify error message
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(testData.messages.usernameRequiredError);
  });

  test('should show error for empty password', async ({ loginPage }) => {
    // Attempt login with empty password
    await loginPage.login(testData.invalidCredentials.emptyPassword.username, testData.invalidCredentials.emptyPassword.password);
    
    // Verify error message
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(testData.messages.passwordRequiredError);
  });

  test('should login with different valid users', async ({ loginPage, inventoryPage, page }) => {
    // Test with performance glitch user
    await loginPage.login(testData.users.performance.username, testData.users.performance.password);
    
    // Verify successful login
    await inventoryPage.verifyPageLoaded();
    await expect(page).toHaveURL(testData.urls.inventory);
  });
});
