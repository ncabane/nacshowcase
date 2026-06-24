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

  // Add items to cart by index
  await authenticatedInventory.addItemByIndex(0);
  await authenticatedInventory.addItemByIndex(1);

  // Open cart by clicking the cart link
  await authenticatedInventory.openCart();

  // Expects to see the cart page by checking the URL and the number of items in the cart
  await cart.expectLoaded();
  await cart.expectItemCount(2);
  await cart.proceedToCheckout();

  // Fill customer info by filling the first name, last name and postal code and clicking the continue button 
  await checkout.fillCustomerInfo(ui.checkout);

  // Expect totals match expected by checking the item total, tax and total
  await checkout.expectTotalsMatchExpected(expectedSubtotal);

  // Finish order by clicking the finish button
  await checkout.finishOrder();

  // Expect order complete by checking the complete header
  await checkout.expectOrderComplete();
});
