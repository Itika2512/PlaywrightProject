/**
 * End-to-End Test Suite
 * Complete user journey tests
 */

import { test } from '../fixtures/baseFixtures.js';
import { expect } from '@playwright/test';
import testData from '../data/testData.js';
import { Helpers } from '../utils/helpers.js';

test.describe('End-to-End User Journeys', () => {
  
  test('complete shopping journey - login to checkout', async ({ 
    page, 
    loginPage, 
    inventoryPage, 
    cartPage, 
    checkoutPage 
  }) => {
    Helpers.logStep('Step 1: Navigate to login page');
    await loginPage.navigate();
    await loginPage.verifyPageLoaded();
    
    Helpers.logStep('Step 2: Login with valid credentials');
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await inventoryPage.verifyPageLoaded();
    
    Helpers.logStep('Step 3: Add multiple products to cart');
    await inventoryPage.addProductToCart('backpack');
    await inventoryPage.addProductToCart('bikeLight');
    await inventoryPage.addProductToCart('boltTShirt');
    
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(3);
    
    Helpers.logStep('Step 4: Navigate to cart');
    await inventoryPage.goToCart();
    await cartPage.verifyPageLoaded();
    
    Helpers.logStep('Step 5: Remove one product from cart');
    await cartPage.removeItemByIndex(1);
    const updatedCartCount = await cartPage.getCartItemCount();
    expect(updatedCartCount).toBe(2);
    
    Helpers.logStep('Step 6: Proceed to checkout');
    await cartPage.proceedToCheckout();
    
    Helpers.logStep('Step 7: Fill checkout information');
    await checkoutPage.fillCheckoutInformation(testData.checkoutInfo.valid);
    await checkoutPage.continue();
    
    Helpers.logStep('Step 8: Review order and finish');
    await expect(page).toHaveURL(testData.urls.checkoutStepTwo);
    await checkoutPage.finish();
    
    Helpers.logStep('Step 9: Verify order completion');
    const isComplete = await checkoutPage.isCheckoutComplete();
    expect(isComplete).toBeTruthy();
    
    const message = await checkoutPage.getCompletionMessage();
    expect(message).toContain(testData.messages.orderCompleteHeader);
    
    Helpers.logStep('Step 10: Return to home and logout');
    await checkoutPage.backToHome();
    await inventoryPage.logout();
    await expect(page).toHaveURL(testData.urls.base + '/');
    
    Helpers.logStep('Test completed successfully');
  });

  test('add and remove products multiple times', async ({ 
    loginPage, 
    inventoryPage, 
    cartPage 
  }) => {
    // Login
    await loginPage.navigate();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await inventoryPage.verifyPageLoaded();
    
    // Add products
    await inventoryPage.addProductToCart('backpack');
    await inventoryPage.addProductToCart('bikeLight');
    expect(await inventoryPage.getCartItemCount()).toBe(2);
    
    // Remove one from inventory page
    await inventoryPage.removeProductFromCart('backpack');
    expect(await inventoryPage.getCartItemCount()).toBe(1);
    
    // Add more products
    await inventoryPage.addProductToCart('boltTShirt');
    await inventoryPage.addProductToCart('fleeceJacket');
    expect(await inventoryPage.getCartItemCount()).toBe(3);
    
    // Go to cart and remove all
    await inventoryPage.goToCart();
    await cartPage.verifyPageLoaded();
    await cartPage.removeAllItems();
    expect(await cartPage.getCartItemCount()).toBe(0);
    
    // Continue shopping and add again
    await cartPage.continueShopping();
    await inventoryPage.addProductToCart('onesie');
    expect(await inventoryPage.getCartItemCount()).toBe(1);
  });

  test('cancel checkout and continue shopping', async ({ 
    page,
    loginPage, 
    inventoryPage, 
    cartPage, 
    checkoutPage 
  }) => {
    // Login and add products
    await loginPage.navigate();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await inventoryPage.verifyPageLoaded();
    await inventoryPage.addProductToCart('backpack');
    
    // Go to cart and start checkout
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    
    // Cancel checkout
    await checkoutPage.cancel();
    await expect(page).toHaveURL(testData.urls.cart);
    
    // Continue shopping
    await cartPage.continueShopping();
    await expect(page).toHaveURL(testData.urls.inventory);
    
    // Add more products
    await inventoryPage.addProductToCart('bikeLight');
    expect(await inventoryPage.getCartItemCount()).toBe(2);
    
    // Complete checkout this time
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInformation(testData.checkoutInfo.valid);
    await checkoutPage.continue();
    await checkoutPage.finish();
    
    const isComplete = await checkoutPage.isCheckoutComplete();
    expect(isComplete).toBeTruthy();
  });
});
