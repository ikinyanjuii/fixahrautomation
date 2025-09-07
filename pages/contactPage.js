const BasePage = require('./basePage');

class ContactPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  // Locators
  get nameInput() { return '#name'; }
  get emailInput() { return '#email'; }
  get phoneInput() { return '#phone'; }
  get messageTextarea() { return '#message'; }
  get submitButton() { return 'button[type="submit"]'; }
  get successMessage() { return '.success-message'; }
  get errorMessage() { return '.error-message'; }
  get contactInfo() { return '.contact-info'; }

  // Methods
  async verifyContactPageLoaded() {
    await this.waitForElement(this.nameInput);
    await expect(this.page).toHaveURL(/.*contact/);
  }

  async fillContactForm(name, email, phone, message) {
    await this.fillField(this.nameInput, name);
    await this.fillField(this.emailInput, email);
    await this.fillField(this.phoneInput, phone);
    await this.fillField(this.messageTextarea, message);
  }

  async submitContactForm() {
    await this.clickElement(this.submitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getSuccessMessage() {
    await this.waitForElement(this.successMessage);
    return await this.getText(this.successMessage);
  }

  async getContactInfo() {
    return await this.getText(this.contactInfo);
  }
}

module.exports = ContactPage;