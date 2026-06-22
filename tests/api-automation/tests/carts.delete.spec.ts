import { test, expect } from '../fixtures';
import type { CartResponse } from '../clients/dummyJsonApi';

test('delete cart returns deleted cart payload', async ({ dummyJson }) => {
  // DummyJSON persists seeded carts but simulates POST /carts/add, so DELETE is
  // validated against an existing cart id from the API dataset.
  const cartId = 1;

  const deleteResponse = await dummyJson.deleteCart(cartId);
  expect(deleteResponse.ok()).toBeTruthy();

  const deletedCart = (await deleteResponse.json()) as CartResponse;
  expect(deletedCart.id).toBe(cartId);
  expect(deletedCart.isDeleted).toBe(true);
  expect(deletedCart.deletedOn).toBeTruthy();
  expect(deletedCart.products.length).toBeGreaterThan(0);
});
