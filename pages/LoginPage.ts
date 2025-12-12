import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  emailInput = this.page.locator('#Email');
  passwordInput = this.page.locator('#Password');
  loginButton = this.page.locator('input[value="Log in"]');

  async login(email: string, password: string) {
    await this.page.goto('/login');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
