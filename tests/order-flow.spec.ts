import { test, expect } from '@playwright/test';
import products from '../data/products.json';

import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { OnePageCheckoutPage } from '../pages/OnePageCheckoutPage';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe('Place order with multiple products and validate prices', () => {

  test('Order flow with price validation', async ({ page }) => {

    await page.goto('/');

    const home = new HomePage(page);
    const productPage = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const login = new LoginPage(page);
    const onepage = new OnePageCheckoutPage(page);
    const register = new RegistrationPage(page);

    // 🔥 0) Yeni user yarat
    await register.open();
    const email = await register.registerRandomUser();
    console.log("REGISTERED:", email);

    // 🔥 1) Login yeni userlə
    await login.login(email, process.env.DEFAULT_PASSWORD!);


    // 🔥 2) Məhsulları əlavə et
    for (const item of products) {
      await home.openProduct(item.name);

      if (item.name === "Simple Computer") {
        await productPage.selectSimpleComputerDefaults();
      }

      await productPage.setQuantity(item.quantity);
      await productPage.addToCart();

      await page.goto('/');
    }

    // 🔥 3) Cart səhifəsinə keç
    await cart.openCart();

    // 🔥 4) Qiymət doğrulaması
    for (let i = 0; i < products.length; i++) {
      await cart.assertPriceCalculation(i);
    }

    // 🔥 5) Terms qəbul et + Checkout
    await cart.acceptTermsAndCheckout();

    // 🔥 6) One Page Checkout step-ləri
    await onepage.fillBillingAddress();
    
    await onepage.continueShippingAddress();
    await onepage.continueShippingMethod();
    await onepage.continuePaymentMethod();
    await onepage.continuePaymentInfo();

    // 🔥 7) Order təsdiqi
    await checkout.confirmOrder();

    // 🔥 8) Uğurlu mesaj
    const message = await checkout.getSuccessMessage();
    console.log("SUCCESS:", message);

    await expect(message).toContain('Your order has been successfully processed!');
  });

});
