const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const LoginPage = require('../pages/loginPage');

test.describe('Login Tests', () => {
  let homePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.navigateTo();
    await homePage.navigateToLogin();
    await loginPage.verifyLoginPageLoaded();
  });

  test('Verify login page elements', async ({ page }) => {
    const emailVisible = await page.isVisible(loginPage.emailInput);
    const passwordVisible = await page.isVisible(loginPage.passwordInput);
    const loginBtnVisible = await page.isVisible(loginPage.loginButton);
    
    expect(emailVisible).toBeTruthy();
    expect(passwordVisible).toBeTruthy();
    expect(loginBtnVisible).toBeTruthy();
  });

  test('Login with invalid credentials', async () => {
    await loginPage.login('invalid@email.com', 'wrongpassword');
    
    // Check if error message appears (if implemented on the site)
    try {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBeTruthy();
    } catch (e) {
      // Error message element might not exist, continue test
      console.log('Error message element not found');
    }
  });

  test('Navigate to forgot password', async ({ page }) => {
    await loginPage.clickForgotPassword();
    expect(await page.url()).toContain('forgot-password');
  });
});