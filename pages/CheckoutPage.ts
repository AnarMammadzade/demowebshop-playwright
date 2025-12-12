import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  confirmOrderButton = this.page.locator('input[value="Confirm"]');
  successMessage = this.page.locator('.section.order-completed .title strong');

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }

  async getSuccessMessage(): Promise<string> {
    return await this.successMessage.textContent() ?? "";
  }
}
