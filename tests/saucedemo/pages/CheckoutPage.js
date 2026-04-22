/**
 * CheckoutPage - Page Object Model for Saucedemo Checkout Pages
 */
export class CheckoutPage {
  constructor(page) {
    this.page = page;
    
    // Step 1: Your Information
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    
    // Step 2: Overview
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.summaryInfo = page.locator('.summary_info');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTax = page.locator('.summary_tax_label');
    this.summaryTotal = page.locator('.summary_total_label');
    
    // Step 3: Complete
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    
    // Error
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Fill checkout information
   
   * @param {Object} info - Checkout information
   * @param {string} info.firstName - First name
   * @param {string} info.lastName - Last name
   * @param {string} info.postalCode - Postal code
   */
  async fillCheckoutInformation(info) {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
  }

  /**
   * Continue to next step
   */
  async continue() {
    await this.continueButton.click();
  }

  /**
   * Cancel checkout
   */
  async cancel() {
    await this.cancelButton.click();
  }

  /**
   * Finish checkout
   */
  async finish() {
    await this.finishButton.click();
  }

  /**
   * Get order summary details
   * @returns {Promise<Object>} Order summary
   */
  async getOrderSummary() {
    const subtotal = await this.summarySubtotal.textContent();
    const tax = await this.summaryTax.textContent();
    const total = await this.summaryTotal.textContent();
    
    return {
      subtotal: subtotal.replace('Item total: $', ''),
      tax: tax.replace('Tax: $', ''),
      total: total.replace('Total: $', '')
    };
  }

  /**
   * Verify checkout is complete
   * @returns {Promise<boolean>}
   */
  async isCheckoutComplete() {
    return await this.completeHeader.isVisible();
  }

  /**
   * Get completion message
   * @returns {Promise<string>}
   */
  async getCompletionMessage() {
    return await this.completeHeader.textContent();
  }

  /**
   * Go back to home
   */
  async backToHome() {
    await this.backHomeButton.click();
  }

  /**
   * Get error message
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}
