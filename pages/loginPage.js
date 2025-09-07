const BasePage = require('./basePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  // Locators
  get emailInput() { return '#email'; }
  get passwordInput() { return '#password'; }
  get loginButton() { return 'button[type="submit"]'; }
  get forgotPasswordLink() { return 'a[href*="forgot-password"]'; }
  get errorMessage() { return '.error-message'; }
  get successMessage() { return '.success-message'; }

  // Methods
  async verifyLoginPageLoaded() {
    await this.waitForElement(this.emailInput);
    await this.waitForElement(this.passwordInput);
    await expect(this.page).toHaveURL(/.*login/);
  }

  async login(email, password) {
    await this.fillField(this.emailInput, email);
    await this.fillField(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async clickForgotPassword() {
    await this.clickElement(this.forgotPasswordLink);
  }

  async getErrorMessage() {
    await this.waitForElement(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  async getSuccessMessage() {
    await this.waitForElement(this.successMessage);
    return await this.getText(this.successMessage);
  }
}

module.exports = LoginPage;