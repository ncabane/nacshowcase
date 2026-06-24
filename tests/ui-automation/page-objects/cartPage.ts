import { expect, Locator, Page } from '@playwright/test';

// CartPage represents the cart review step between inventory and checkout page 
// which is the last step before the order is placed
export class CartPage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

  // Expects to see the cart page by checking the URL
  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  // Proceed to checkout by clicking the checkout button
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  // Expect item count by checking the number of items in the cart
  async expectItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }
}
