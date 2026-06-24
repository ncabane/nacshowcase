import { test, expect } from '../fixtures';
import { api } from '../../../config/testData';
import type { CartResponse } from '../clients/dummyJsonApi';

test('delete cart returns deleted cart payload', async ({ dummyJson }) => {
  // Send DELETE request for seeded cart id
  const deleteResponse = await dummyJson.deleteCart(api.seededCartId);

  // Expect HTTP response to be successful
  expect(deleteResponse.ok()).toBeTruthy();

  // Parse response body as deleted cart payload
  const deletedCart = (await deleteResponse.json()) as CartResponse;

  // Expect deleted cart id to match requested id
  expect(deletedCart.id).toBe(api.seededCartId);

  // Expect cart to be marked as deleted
  expect(deletedCart.isDeleted).toBe(true);

  // Expect deletion timestamp to be present
  expect(deletedCart.deletedOn).toBeTruthy();

  // Expect deleted cart to still include products
  expect(deletedCart.products.length).toBeTruthy();
});
