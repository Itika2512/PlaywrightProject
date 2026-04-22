/**
 * Add to Cart Test Suite
 * Tests for adding and removing products from cart
 */

import { test } from '../fixtures/baseFixtures.js';
import { expect } from '@playwright/test';
import testData from '../data/testData.js';

test.describe('Add to Cart Functionality', () => {
  
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    // Login before each test
    await loginPage.navigate();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await inventoryPage.verifyPageLoaded();
  });

  test('should add single product to cart', async ({ inventoryPage }) => {
    // Add backpack to cart
    await inventoryPage.addProductToCart('backpack');
    
    // Verify cart badge shows 1 item
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });

  test('should add multiple products to cart', async ({ inventoryPage }) => {
    // Add multiple products
    await inventoryPage.addProductToCart('backpack');
    await inventoryPage.addProductToCart('bikeLight');
    await inventoryPage.addProductToCart('boltTShirt');
    
    // Verify cart badge shows 3 items
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(3);
  });

  test('should remove product from inventory page', async ({ inventoryPage }) => {
    // Add product
    await inventoryPage.addProductToCart('backpack');
    let cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);
    
    // Remove product
    await inventoryPage.removeProductFromCart('backpack');
    cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(0);
  });

  test('should verify products in cart page', async ({ inventoryPage, cartPage }) => {
    // Add products
    await inventoryPage.addProductToCart('backpack');
    await inventoryPage.addProductToCart('bikeLight');
    
    // Navigate to cart
    await inventoryPage.goToCart();
    await cartPage.verifyPageLoaded();
    
    // Verify cart has 2 items
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(2);
    
    // Verify product names
    const isBackpackInCart = await cartPage.isItemInCart('Backpack');
    const isBikeLightInCart = await cartPage.isItemInCart('Bike Light');
    expect(isBackpackInCart).toBeTruthy();
    expect(isBikeLightInCart).toBeTruthy();
  });

  test('should remove product from cart page', async ({ inventoryPage, cartPage }) => {
    // Add products
    await inventoryPage.addProductToCart('backpack');
    await inventoryPage.addProductToCart('bikeLight');
    
    // Navigate to cart
    await inventoryPage.goToCart();
    await cartPage.verifyPageLoaded();
    
    // Remove first item
    await cartPage.removeItemByIndex(0);
    
    // Verify cart has 1 item
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(1);
  });

  test('should remove all products from cart', async ({ inventoryPage, cartPage }) => {
    // Add multiple products
    await inventoryPage.addMultipleProducts(['backpack', 'bikeLight', 'boltTShirt']);
    
    // Navigate to cart
    await inventoryPage.goToCart();
    await cartPage.verifyPageLoaded();
    
    // Remove all items
    await cartPage.removeAllItems();
    
    // Verify cart is empty
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(0);
  });

  test('should continue shopping from cart', async ({ inventoryPage, cartPage, page }) => {
    // Add product and go to cart
    await inventoryPage.addProductToCart('backpack');
    await inventoryPage.goToCart();
    await cartPage.verifyPageLoaded();
    
    // Continue shopping
    await cartPage.continueShopping();
    
    // Verify back on inventory page
    await expect(page).toHaveURL(testData.urls.inventory);
    await inventoryPage.verifyPageLoaded();
  });

  test('should add all products to cart', async ({ inventoryPage }) => {
    // Add all products
    const allProducts = ['backpack', 'bikeLight', 'boltTShirt', 'fleeceJacket', 'onesie', 'tShirtRed'];
    await inventoryPage.addMultipleProducts(allProducts);
    
    // Verify cart badge shows 6 items
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(6);
  });
});
