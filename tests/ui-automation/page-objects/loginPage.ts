import { expect, Locator, Page } from '@playwright/test';
import { credentials, urls } from '../../../config/testData';

// LoginPage represents the login page and its actions
export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Go to the login page by going to the base URL
  async goto() {
    await this.page.goto(urls.ui.base);
  }

  // Login with valid user by filling the username and password and clicking the login button
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Login with valid user
  async loginWithValidUser() {
    const { username, password } = credentials.sauceDemo.valid;
    await this.login(username, password);
  }

  // Expect login error by checking the error message and the URL
  async expectLoginError(message: RegExp | string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
    await expect(this.page).toHaveURL(urls.ui.base);
  }
}
