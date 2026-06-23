import { test } from '../fixtures';
import { expect } from '@playwright/test';

// Full checkout with two items validates final price. This is a happy path test. This is a pre-condition for the test
test('full checkout with two items validates final price', async ({
  authenticatedInventory,
  cart,
  checkout,
}) => {
  // Read prices before adding items so expected totals come from the UI, not hard-coded values. This is a pre-condition for the test
  const firstItemPrice = await authenticatedInventory.getItemPriceByIndex(0);
  const secondItemPrice = await authenticatedInventory.getItemPriceByIndex(1);
  const expectedSubtotal = firstItemPrice + secondItemPrice;

  // Add items to cart
  await authenticatedInventory.addItemByIndex(0);
  await authenticatedInventory.addItemByIndex(1);
  await authenticatedInventory.expectCartItemCount(2);

  // Open cart
  await authenticatedInventory.openCart();
  await cart.expectLoaded();
  await cart.expectItemCount(2);

  // Proceed to checkout
  await cart.proceedToCheckout();

  // Fill customer info
  await checkout.fillCustomerInfo('Nicolas', 'Cabane', '1234AB');

  // Expect totals match expected
  await checkout.expectTotalsMatchExpected(expectedSubtotal);

  // Finish order
  await checkout.finishOrder();
  await checkout.expectOrderComplete();
});
