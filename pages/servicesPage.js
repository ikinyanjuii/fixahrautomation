const BasePage = require('./basePage');

class ServicesPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  // Locators
  get pageTitle() { return 'h1'; }
  get serviceCards() { return '.service-card'; }
  get filterDropdown() { return '#service-filter'; }
  get searchInput() { return '#service-search'; }
  get bookNowButtons() { return '.book-now-btn'; }

  // Methods
  async verifyServicesPageLoaded() {
    await this.waitForElement(this.pageTitle);
    await expect(this.page).toHaveURL(/.*services/);
  }

  async getServiceCardsCount() {
    return await this.page.locator(this.serviceCards).count();
  }

  async filterServices(filterValue) {
    await this.page.selectOption(this.filterDropdown, filterValue);
    await this.page.waitForLoadState('networkidle');
  }

  async searchServices(searchTerm) {
    await this.fillField(this.searchInput, searchTerm);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async clickBookNowButton(index = 0) {
    const buttons = await this.page.locator(this.bookNowButtons);
    await buttons.nth(index).click();
  }

  async getServiceCardTitle(index) {
    const card = await this.page.locator(this.serviceCards).nth(index);
    return await card.locator('h3').textContent();
  }
}

module.exports = ServicesPage;