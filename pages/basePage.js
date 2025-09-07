const { expect } = require('@playwright/test');
const config = require('../utils/config');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(path = '') {
    await this.page.goto(`${config.baseURL}${path}`);
    await this.page.waitForLoadState('networkidle');
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageURL() {
    return this.page.url();
  }

  async waitForElement(selector, timeout = config.timeout) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async clickElement(selector) {
    await this.waitForElement(selector);
    await this.page.click(selector);
  }

  async fillField(selector, text) {
    await this.waitForElement(selector);
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    await this.waitForElement(selector);
    return await this.page.textContent(selector);
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}

module.exports = BasePage;