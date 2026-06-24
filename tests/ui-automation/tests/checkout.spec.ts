import { test } from '../fixtures';
import { ui } from '../../../config/testData';

test('full checkout with two items validates final price', async ({
  authenticatedInventory,
  cart,
  checkout,
}) => {
  const firstItemPrice = await authenticatedInventory.getItemPriceByIndex(0);
  const secondItemPrice = await authenticatedInventory.getItemPriceByIndex(1);
  const expectedSubtotal = firstItemPrice + secondItemPrice;

  await authenticatedInventory.addItemByIndex(0);
  await authenticatedInventory.addItemByIndex(1);
  await authenticatedInventory.openCart();
  await cart.expectLoaded();
  await cart.expectItemCount(2);
  await cart.proceedToCheckout();

  await checkout.fillCustomerInfo(ui.checkout);
  await checkout.expectTotalsMatchExpected(expectedSubtotal);
  await checkout.finishOrder();
  await checkout.expectOrderComplete();
});
