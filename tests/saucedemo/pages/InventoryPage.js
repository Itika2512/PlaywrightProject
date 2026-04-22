/**
 * InventoryPage - Page Object Model for Saucedemo Inventory/Products Page
 */
export class InventoryPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    
    // Product specific locators
    this.products = {
      backpack: {
        addToCart: page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
        remove: page.locator('[data-test="remove-sauce-labs-backpack"]')
      },
      bikeLight: {
        addToCart: page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]'),
        remove: page.locator('[data-test="remove-sauce-labs-bike-light"]')
      },
      boltTShirt: {
        addToCart: page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'),
        remove: page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]')
      },
      fleeceJacket: {
        addToCart: page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]'),
        remove: page.locator('[data-test="remove-sauce-labs-fleece-jacket"]')
      },
      onesie: {
        addToCart: page.locator('[data-test="add-to-cart-sauce-labs-onesie"]'),
        remove: page.locator('[data-test="remove-sauce-labs-onesie"]')
      },
      tShirtRed: {
        addToCart: page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'),
        remove: page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]')
      }
    };
  }

  /**
   * Verify inventory page is loaded
   */
  async verifyPageLoaded() {
    await this.inventoryContainer.waitFor({ state: 'visible' });
  }

  /**
   * Add product to cart by name
   * @param {string} productName - Product name (backpack, bikeLight, etc.)
   */
  async addProductToCart(productName) {
    if (this.products[productName]) {
      await this.products[productName].addToCart.click();
    } else {
      throw new Error(`Product ${productName} not found`);
    }
  }

  /**
   * Remove product from cart by name
   * @param {string} productName - Product name (backpack, bikeLight, etc.)
   */
  async removeProductFromCart(productName) {
    if (this.products[productName]) {
      await this.products[productName].remove.click();
    } else {
      throw new Error(`Product ${productName} not found`);
    }
  }

  /**
   * Add multiple products to cart
   * @param {Array<string>} productNames - Array of product names
   */
  async addMultipleProducts(productNames) {
    for (const productName of productNames) {
      await this.addProductToCart(productName);
    }
  }

  /**
   * Get cart item count
   * @returns {Promise<number>} Number of items in cart
   */
  async getCartItemCount() {
    try {
      // Check if badge is visible first
      const isVisible = await this.shoppingCartBadge.isVisible({ timeout: 1000 });
      if (!isVisible) {
        return 0;
      }
      const count = await this.shoppingCartBadge.textContent();
      return parseInt(count);
    } catch {
      return 0; // No badge means 0 items
    }
  }

  /**
   * Navigate to shopping cart
   */
  async goToCart() {
    await this.shoppingCartLink.click();
  }

  /**
   * Open menu
   */
  async openMenu() {
    await this.menuButton.click();
  }

  /**
   * Logout from application
   */
  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  /**
   * Get all product names
   * @returns {Promise<Array<string>>} Array of product names
   */
  async getAllProductNames() {
    const items = await this.inventoryItems.locator('.inventory_item_name').allTextContents();
    return items;
  }

  /**
   * Get product count
   * @returns {Promise<number>} Number of products displayed
   */
  async getProductCount() {
    return await this.inventoryItems.count();
  }
}
