import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Selectors
  addToCartButton = this.page.locator('input[id^="add-to-cart-button"]');
  productPrice = this.page.locator('.product-price .price-value');
  quantityInput = this.page.locator('input.qty-input');

  // 🔥 Simple Computer üçün məcburi seçimlər
  async selectSimpleComputerDefaults() {
    // Processor (mandatory)
    await this.page.locator('label:has-text("Slow")').click();

    // RAM default olaraq seçilən olur (2 GB) → heç nə etmirik
    // HDD default olaraq 320 GB → heç nə etmirik
    // Software optional → heç nə etmirik
  }

  async setQuantity(qty: number) {
    await this.quantityInput.fill(qty.toString());
  }

  async addToCart() {
    await this.addToCartButton.click();

    // 🔥 Add to cart success message gözləmək (AJAX səbəbi ilə vacibdir)
    await this.page.locator('.bar-notification.success').waitFor({ state: 'visible' });

    // Success popup bağlanması üçün klikləyək (səhifəni bloklamasın)
    const closeBtn = this.page.locator('.bar-notification.success .close');
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }
  }

  async getPrice(): Promise<number> {
    const priceText = await this.productPrice.textContent();
    return parseFloat(priceText?.replace('$', '').trim() || '0');
  }
}
