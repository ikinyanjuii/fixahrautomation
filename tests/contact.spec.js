const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const ContactPage = require('../pages/contactPage');

test.describe('Contact Page Tests', () => {
  let homePage;
  let contactPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    contactPage = new ContactPage(page);
    await homePage.navigateTo();
    await homePage.navigateToContact();
    await contactPage.verifyContactPageLoaded();
  });

  test('Verify contact form elements', async ({ page }) => {
    const nameVisible = await page.isVisible(contactPage.nameInput);
    const emailVisible = await page.isVisible(contactPage.emailInput);
    const messageVisible = await page.isVisible(contactPage.messageTextarea);
    
    expect(nameVisible).toBeTruthy();
    expect(emailVisible).toBeTruthy();
    expect(messageVisible).toBeTruthy();
  });

  test('Fill contact form', async () => {
    await contactPage.fillContactForm(
      'John Doe',
      'john@example.com',
      '123-456-7890',
      'This is a test message for contact form'
    );
    
    // Verify fields are filled
    const nameValue = await contactPage.page.inputValue(contactPage.nameInput);
    expect(nameValue).toBe('John Doe');
  });

  test('Verify contact information is displayed', async () => {
    const contactInfo = await contactPage.getContactInfo();
    expect(contactInfo).toBeTruthy();
    expect(contactInfo.length).toBeGreaterThan(0);
  });
});