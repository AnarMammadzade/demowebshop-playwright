import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Ana səhifə və kateqoriya səhifələrində məhsulun adını tapmaq üçün ən stabil locator
  productLink(name: string) {
    return this.page.locator('.product-title a', { hasText: name });
  }

  async openProduct(name: string) {
    await this.productLink(name).click();
  }
}
