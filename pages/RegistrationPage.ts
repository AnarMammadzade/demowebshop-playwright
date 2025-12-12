import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  firstName = this.page.locator('#FirstName');
  lastName = this.page.locator('#LastName');
  emailInput = this.page.locator('#Email');
  passwordInput = this.page.locator('#Password');
  confirmPasswordInput = this.page.locator('#ConfirmPassword');
  registerButton = this.page.locator('#register-button');
  successMessage = this.page.locator('.result');

  async open() {
    await this.page.goto('/register');
  }

  async registerRandomUser(): Promise<string> {
    const random = Math.floor(Math.random() * 100000);
    const email = `anarmammadly+${random}@gmail.com`;

    await this.firstName.fill("Anar");
    await this.lastName.fill("Mammadov");
    await this.emailInput.fill(email);
    await this.passwordInput.fill(process.env.DEFAULT_PASSWORD!);
    await this.confirmPasswordInput.fill(process.env.DEFAULT_PASSWORD!);


    await this.registerButton.click();

    await this.successMessage.waitFor({ state: "visible" });

    return email; // testdə istifadə etmək üçün geri qaytarırıq
  }
}
