import { expect, Locator, Page } from '@playwright/test';

// InventoryPage represents the inventory page and its actions
export class InventoryPage {
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly itemNames: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('.product_sort_container');
    this.itemNames = page.locator('.inventory_item_name');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  // Sort items by name Z-A
  async sortByNameDescending() {
    // Sauce Demo uses option value "za" for Name (Z to A)
    await this.sortDropdown.selectOption('za');
  }

  // Get item names
  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  // Add item by index
  async addItemByIndex(index: number) {
    const item = this.inventoryItems.nth(index);
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  // Get item price by index
  async getItemPriceByIndex(index: number): Promise<number> {
    const priceText = await this.inventoryItems
      .nth(index)
      .locator('.inventory_item_price')
      .textContent();
    return parsePrice(priceText ?? '');
  }

  // Open cart
  async openCart() {
    await this.cartLink.click();
  }

  // Expect cart item count
  async expectCartItemCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}

// Parse price
export function parsePrice(priceText: string): number {
  return Number.parseFloat(priceText.replace('$', '').trim());
}

// Compare the visible list against a locale-aware descending sort
export function isSortedDescending(values: string[]): boolean {
  const sorted = [...values].sort((a, b) => b.localeCompare(a));
  return values.every((value, index) => value === sorted[index]);
}
