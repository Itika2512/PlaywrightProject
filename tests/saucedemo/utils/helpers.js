/**
 * Helper utilities for test automation
 */

import fs from 'fs';
import path from 'path';

export class Helpers {
  /**
   * Take screenshot with custom name
   * @param {Page} page - Playwright page object
   * @param {string} name - Screenshot name
   */
  static async takeScreenshot(page, name) {
    const screenshotDir = './tests/screenshots';
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}_${timestamp}.png`;
    await page.screenshot({ path: path.join(screenshotDir, filename), fullPage: true });
  }

  /**
   * Wait for a specific time
   * @param {number} ms - Milliseconds to wait
   */
  static async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate random string
   * @param {number} length - Length of string
   * @returns {string} Random string
   */
  static generateRandomString(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate random email
   * @returns {string} Random email
   */
  static generateRandomEmail() {
    return `test_${this.generateRandomString(8)}@example.com`;
  }

  /**
   * Format currency
   * @param {number} amount - Amount to format
   * @returns {string} Formatted currency
   */
  static formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
  }

  /**
   * Parse currency string to number
   * @param {string} currencyString - Currency string (e.g., "$29.99")
   * @returns {number} Numeric value
   */
  static parseCurrency(currencyString) {
    return parseFloat(currencyString.replace('$', ''));
  }

  /**
   * Get current timestamp
   * @returns {string} Timestamp string
   */
  static getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Log test step
   * @param {string} step - Step description
   */
  static logStep(step) {
    console.log(`[${this.getTimestamp()}] ${step}`);
  }
}
