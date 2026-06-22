import { test as base } from '@playwright/test';
import { LoginPage } from './page-objects/loginPage';
import { InventoryPage } from './page-objects/inventoryPage';
import { CartPage } from './page-objects/cartPage';
import { CheckoutPage } from './page-objects/checkoutPage';

type UIFixtures = {
  login: LoginPage;
  inventory: InventoryPage;
  cart: CartPage;
  checkout: CheckoutPage;
  authenticatedInventory: InventoryPage;
};

export const test = base.extend<UIFixtures>({
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventory: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  authenticatedInventory: async ({ page, login, inventory }, use) => {
    await login.goto();
    await login.loginWithValidUser();
    await inventory.expectLoaded();
    await use(inventory);
  },
});

export { expect } from '@playwright/test';
