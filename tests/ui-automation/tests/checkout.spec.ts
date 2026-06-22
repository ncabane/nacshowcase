import { test, expect } from '../fixtures';

// End-to-end happy path: login is handled by the authenticatedInventory fixture.
test('full checkout with two items validates final price', async ({
  authenticatedInventory,
  cart,
  checkout,
}) => {
  // Read prices before adding items so expected totals come from the UI, not hard-coded values.
  const firstItemPrice = await authenticatedInventory.getItemPriceByIndex(0);
  const secondItemPrice = await authenticatedInventory.getItemPriceByIndex(1);
  const expectedSubtotal = firstItemPrice + secondItemPrice;

  await authenticatedInventory.addItemByIndex(0);
  await authenticatedInventory.addItemByIndex(1);
  await authenticatedInventory.expectCartItemCount(2);

  await authenticatedInventory.openCart();
  await cart.expectLoaded();
  await cart.expectItemCount(2);
  await cart.proceedToCheckout();

  await checkout.fillCustomerInfo('Nicolas', 'Cabane', '1234AB');
  await checkout.expectTotalsMatchExpected(expectedSubtotal);

  await checkout.finishOrder();
  await checkout.expectOrderComplete();
});
