const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');

test.describe('Home Page Tests', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateTo();
  });

  test('Verify home page loads successfully', async ({ page }) => {
    await homePage.verifyHomePageLoaded();
    const title = await homePage.getPageTitle();
    expect(title).toContain('FixAHR');
  });

  test('Verify navigation menu is visible', async ({ page }) => {
    await homePage.waitForElement(homePage.navigationMenu);
    const isMenuVisible = await page.isVisible(homePage.navigationMenu);
    expect(isMenuVisible).toBeTruthy();
  });

  test('Verify hero section content', async () => {
    const heroText = await homePage.getHeroSectionText();
    expect(heroText).toBeTruthy();
    expect(heroText.length).toBeGreaterThan(0);
  });

  test('Navigate to login page from home page', async ({ page }) => {
    await homePage.navigateToLogin();
    expect(await page.url()).toContain('login');
  });

  test('Take homepage screenshot', async () => {
    await homePage.takeScreenshot('homepage');
  });
});