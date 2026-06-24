import { test, expect } from '../fixtures';
import { api } from '../../../config/testData';
import type { CartResponse } from '../clients/dummyJsonApi';

test('create cart with three products for authenticated user', async ({
  dummyJson,
  authenticatedUser,
}) => {
  const response = await dummyJson.addCart({
    userId: authenticatedUser.id,
    products: api.cartProducts,
  });

  expect(response.ok()).toBeTruthy();

  const cart = (await response.json()) as CartResponse;
  expect(cart.id).toBeGreaterThan(0);
  expect(cart.userId).toBe(authenticatedUser.id);
  expect(cart.products).toHaveLength(3);
  expect(cart.totalProducts).toBe(3);
  // Quantities 1 + 2 + 1 = 4 items in total across all products.
  expect(cart.totalQuantity).toBe(4);
  expect(cart.total).toBeGreaterThan(0);
  expect(cart.products.every((product) => product.title && product.price > 0)).toBe(true);
});
