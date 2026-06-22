import { expect, Locator, Page } from '@playwright/test';
import { credentials, urls } from '../../../config/urls';

// Page Object Model: locators and page actions live here, not in the spec files.
export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    // Sauce Demo exposes a stable data-test attribute for login errors.
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto(urls.ui.base);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithValidUser() {
    const { username, password } = credentials.sauceDemo.valid;
    await this.login(username, password);
  }

  async expectLoginError(message: RegExp | string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
    // Failed login should keep the user on the login page.
    await expect(this.page).toHaveURL(urls.ui.base);
  }
}
