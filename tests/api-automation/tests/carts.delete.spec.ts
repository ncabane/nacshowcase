import { test, expect } from '../fixtures';
import { api } from '../../../config/testData';
import type { CartResponse } from '../clients/dummyJsonApi';

test('delete cart returns deleted cart payload', async ({ dummyJson }) => {
  const deleteResponse = await dummyJson.deleteCart(api.seededCartId);
  expect(deleteResponse.ok()).toBeTruthy();

  const deletedCart = (await deleteResponse.json()) as CartResponse;
  expect(deletedCart.id).toBe(api.seededCartId);
  expect(deletedCart.isDeleted).toBe(true);
  expect(deletedCart.deletedOn).toBeTruthy();
  expect(deletedCart.products.length).toBeGreaterThan(0);
});
