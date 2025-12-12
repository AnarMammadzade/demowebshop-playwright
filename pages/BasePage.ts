import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async click(locator: string) {
    await this.page.locator(locator).click();
  }

  async type(locator: string, value: string) {
    await this.page.locator(locator).fill(value);
  }

  async assertTitleContains(text: string) {
    await expect(this.page).toHaveTitle(new RegExp(text, 'i'));
  }
}
