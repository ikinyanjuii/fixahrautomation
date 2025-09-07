const BasePage = require('./basePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  // Locators
  get logo() { return 'header .logo'; }
  get navigationMenu() { return 'nav.main-menu'; }
  get heroSection() { return '.hero-section'; }
  get servicesSection() { return '#services'; }
  get aboutSection() { return '#about'; }
  get contactSection() { return '#contact'; }
  get loginButton() { return 'a[href*="login"]'; }
  get signupButton() { return 'a[href*="signup"]'; }

  // Methods
  async verifyHomePageLoaded() {
    await this.waitForElement(this.logo);
    await this.waitForElement(this.heroSection);
    await expect(this.page).toHaveURL('https://www.fixahr.com/');
  }

  async navigateToLogin() {
    await this.clickElement(this.loginButton);
  }

  async navigateToServices() {
    await this.clickElement('a[href*="services"]');
  }

  async navigateToContact() {
    await this.clickElement('a[href*="contact"]');
  }

  async getHeroSectionText() {
    return await this.getText(`${this.heroSection} h1`);
  }
}

module.exports = HomePage;