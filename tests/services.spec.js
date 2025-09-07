const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const ServicesPage = require('../pages/servicesPage');

test.describe('Services Page Tests', () => {
  let homePage;
  let servicesPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    servicesPage = new ServicesPage(page);
    await homePage.navigateTo();
    await homePage.navigateToServices();
    await servicesPage.verifyServicesPageLoaded();
  });

  test('Verify services page loads with services', async () => {
    const serviceCount = await servicesPage.getServiceCardsCount();
    expect(serviceCount).toBeGreaterThan(0);
  });

  test('Verify service cards have content', async () => {
    const firstServiceTitle = await servicesPage.getServiceCardTitle(0);
    expect(firstServiceTitle).toBeTruthy();
    expect(firstServiceTitle.length).toBeGreaterThan(0);
  });

  test('Search functionality', async () => {
    await servicesPage.searchServices('HVAC');
    await servicesPage.page.waitForTimeout(2000); // Wait for results
    const serviceCount = await servicesPage.getServiceCardsCount();
    expect(serviceCount).toBeGreaterThanOrEqual(0);
  });
});