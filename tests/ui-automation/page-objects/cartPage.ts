import { expect, Locator, Page } from '@playwright/test';

// CartPage represents the cart page and its actions
export class CartPage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

  // Expects to see the cart page by checking the URL to be /cart.html
  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  // Proceed to checkout by clicking the checkout button to go to the checkout page
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  // Expect item count by checking the number of items in the cart by checking the count of the cart items
  async expectItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }
}
