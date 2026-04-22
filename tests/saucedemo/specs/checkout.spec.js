/**
 * Checkout Test Suite
 * Tests for complete checkout flow
 */

import { test } from '../fixtures/baseFixtures.js';
import { expect } from '@playwright/test';
import testData from '../data/testData.js';

test.describe('Checkout Functionality', () => {
  
  test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
    // Login and add product to cart
    await loginPage.navigate();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await inventoryPage.verifyPageLoaded();
    await inventoryPage.addProductToCart('backpack');
    await inventoryPage.goToCart();
    await cartPage.verifyPageLoaded();
  });

  test('should complete checkout successfully', async ({ cartPage, checkoutPage, page }) => {
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill checkout information
    await checkoutPage.fillCheckoutInformation(testData.checkoutInfo.valid);
    await checkoutPage.continue();
    
    // Verify on overview page
    await expect(page).toHaveURL(testData.urls.checkoutStepTwo);
    
    // Finish checkout
    await checkoutPage.finish();
    
    // Verify checkout complete
    await expect(page).toHaveURL(testData.urls.checkoutComplete);
    const isComplete = await checkoutPage.isCheckoutComplete();
    expect(isComplete).toBeTruthy();
    
    const message = await checkoutPage.getCompletionMessage();
    expect(message).toContain(testData.messages.orderCompleteHeader);
  });

  test('should show error for missing first name', async ({ cartPage, checkoutPage }) => {
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill with missing first name
    await checkoutPage.fillCheckoutInformation(testData.checkoutInfo.missingFirstName);
    await checkoutPage.continue();
    
    // Verify error message
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain(testData.messages.firstNameRequiredError);
  });

  test('should show error for missing last name', async ({ cartPage, checkoutPage }) => {
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill with missing last name
    await checkoutPage.fillCheckoutInformation(testData.checkoutInfo.missingLastName);
    await checkoutPage.continue();
    
    // Verify error message
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain(testData.messages.lastNameRequiredError);
  });

  test('should show error for missing postal code', async ({ cartPage, checkoutPage }) => {
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill with missing postal code
    await checkoutPage.fillCheckoutInformation(testData.checkoutInfo.missingPostalCode);
    await checkoutPage.continue();
    
    // Verify error message
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain(testData.messages.postalCodeRequiredError);
  });

  test('should cancel checkout from information page', async ({ cartPage, checkoutPage, page }) => {
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Cancel checkout
    await checkoutPage.cancel();
    
    // Verify back on cart page
    await expect(page).toHaveURL(testData.urls.cart);
  });

  test('should display order summary correctly', async ({ cartPage, checkoutPage, page }) => {
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill checkout information
    await checkoutPage.fillCheckoutInformation(testData.checkoutInfo.valid);
    await checkoutPage.continue();
    
    // Verify on overview page
    await expect(page).toHaveURL(testData.urls.checkoutStepTwo);
    
    // Get order summary
    const summary = await checkoutPage.getOrderSummary();
    
    // Verify summary has values
    expect(summary.subtotal).toBeTruthy();
    expect(summary.tax).toBeTruthy();
    expect(summary.total).toBeTruthy();
  });

  test('should complete checkout with multiple products', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    // Go back and add more products
    await cartPage.continueShopping();
    await inventoryPage.addProductToCart('bikeLight');
    await inventoryPage.addProductToCart('boltTShirt');
    await inventoryPage.goToCart();
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill checkout information
    await checkoutPage.fillCheckoutInformation(testData.checkoutInfo.validAlternate);
    await checkoutPage.continue();
    await checkoutPage.finish();
    
    // Verify checkout complete
    const isComplete = await checkoutPage.isCheckoutComplete();
    expect(isComplete).toBeTruthy();
  });

  test('should return to home after checkout', async ({ cartPage, checkoutPage, page }) => {
    // Complete checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInformation(testData.checkoutInfo.valid);
    await checkoutPage.continue();
    await checkoutPage.finish();
    
    // Go back to home
    await checkoutPage.backToHome();
    
    // Verify on inventory page
    await expect(page).toHaveURL(testData.urls.inventory);
  });
});
