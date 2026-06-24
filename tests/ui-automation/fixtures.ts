import { test as base } from '@playwright/test';
import { LoginPage } from './page-objects/loginPage';
import { InventoryPage } from './page-objects/inventoryPage';
import { CartPage } from './page-objects/cartPage';
import { CheckoutPage } from './page-objects/checkoutPage';

type UIFixtures = {
  login: LoginPage;
  cart: CartPage;
  checkout: CheckoutPage;
  authenticatedInventory: InventoryPage;
};

export const test = base.extend<UIFixtures>({
  login: async ({ page }, use) => use(new LoginPage(page)),
  cart: async ({ page }, use) => use(new CartPage(page)),
  checkout: async ({ page }, use) => use(new CheckoutPage(page)),

  authenticatedInventory: async ({ page }, use) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.loginWithValidUser();
    await inventory.expectLoaded();
    await use(inventory);
  },
});
