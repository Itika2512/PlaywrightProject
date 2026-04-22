/**
 * CartPage - Page Object Model for Saucedemo Shopping Cart Page
 */
export class CartPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.removeButtons = page.locator('[data-test^="remove-"]');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemPrices = page.locator('.inventory_item_price');
  }

  /**
   * Verify cart page is loaded
   */
  async verifyPageLoaded() {
    await this.page.waitForURL('**/cart.html');
  }

  /**
   * Get number of items in cart
   * @returns {Promise<number>} Number of items
   */
  async getCartItemCount() {
    return await this.cartItems.count();
  }

  /**
   * Get all cart item names
   * @returns {Promise<Array<string>>} Array of product names
   */
  async getCartItemNames() {
    return await this.cartItemNames.allTextContents();
  }

  /**
   * Remove item from cart by index
   * @param {number} index - Item index (0-based)
   */
  async removeItemByIndex(index) {
    await this.removeButtons.nth(index).click();
  }

  /**
   * Remove all items from cart
   */
  async removeAllItems() {
    const count = await this.removeButtons.count();
    for (let i = count - 1; i >= 0; i--) {
      await this.removeButtons.nth(i).click();
    }
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Continue shopping
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /**
   * Verify item is in cart
   * @param {string} itemName - Product name
   * @returns {Promise<boolean>}
   */
  async isItemInCart(itemName) {
    const items = await this.getCartItemNames();
    return items.some(item => item.includes(itemName));
  }
}
