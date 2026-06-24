import { expect, Locator, Page } from '@playwright/test';

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

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async sortByNameDescending() {
    await this.sortDropdown.selectOption('za');
  }

  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async addItemByIndex(index: number) {
    const item = this.inventoryItems.nth(index);
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async getItemPriceByIndex(index: number): Promise<number> {
    const priceText = await this.inventoryItems
      .nth(index)
      .locator('.inventory_item_price')
      .textContent();
    return Number.parseFloat((priceText ?? '').replace('$', '').trim());
  }

  async openCart() {
    await this.cartLink.click();
  }
}
