import { expect, Locator, Page } from '@playwright/test';

// CartPage represents the cart review step between inventory and checkout
export class CartPage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  // Proceed to checkout.
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  // Expect item count.
  async expectItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }
}
