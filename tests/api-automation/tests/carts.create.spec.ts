import { test, expect } from '../fixtures';
import { api } from '../../../config/testData';
import type { CartResponse } from '../clients/dummyJsonApi';

test('create cart with three products for authenticated user', async ({
  dummyJson,
  authenticatedUser,
}) => {
  // Send POST request to add cart with three products
  const response = await dummyJson.addCart({
    userId: authenticatedUser.id,
    products: api.cartProducts,
  });

  // Expect HTTP response to be successful
  expect(response.ok()).toBeTruthy();

  // Parse response body as cart payload
  const cart = (await response.json()) as CartResponse;

  // Expect cart id to be present
  expect(cart.id).toBeTruthy();

  // Expect cart to belong to the authenticated user
  expect(cart.userId).toBe(authenticatedUser.id);

  // Expect cart to contain three products
  expect(cart.products).toHaveLength(3);

  // Expect total products count to be three
  expect(cart.totalProducts).toBe(3);

  // Expect total quantity to be four (1 + 2 + 1)
  expect(cart.totalQuantity).toBe(4);

  // Expect cart total to be present
  expect(cart.total).toBeTruthy();

  // Expect each product to have title, price, and quantity
  for (const product of cart.products) {
    expect(product.title).toBeTruthy();
    expect(product.price).toBeTruthy();
    expect(product.quantity).toBeTruthy();
  }
});
