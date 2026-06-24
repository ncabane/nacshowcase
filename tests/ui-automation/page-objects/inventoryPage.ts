import { expect, Locator, Page } from '@playwright/test';

// InventoryPage represents the inventory page and its actions
export class InventoryPage {
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly itemNames: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('.product_sort_container');
    this.itemNames = page.locator('.inventory_item_name');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  // Expects to see the inventory page by checking the URL and the first item being visible
  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  // Sort items by name Z-A by selecting the Z-A option from the sort dropdown
  async sortByNameDescending() {
    await this.sortDropdown.selectOption('za');
  }

  // Get item names by getting the text content of the item names
  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  // Add item by index by clicking the add to cart button
  async addItemByIndex(index: number) {
    const item = this.inventoryItems.nth(index);
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  // AI-generated solution:
  // Get item price by index by getting the text content of the item price
  async getItemPriceByIndex(index: number): Promise<number> {
    const priceText = await this.inventoryItems
      .nth(index)
      .locator('.inventory_item_price')
      .textContent();
    return Number.parseFloat((priceText ?? '').replace('$', '').trim());
  }

  // Open cart by clicking the cart link
  async openCart() {
    await this.cartLink.click();
  }
}
