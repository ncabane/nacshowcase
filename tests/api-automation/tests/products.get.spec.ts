import { test, expect } from '../fixtures';
import { api } from '../../../config/testData';
import type { Product } from '../clients/dummyJsonApi';

test('get product by id returns expected content', async ({ dummyJson }) => {
  const response = await dummyJson.getProduct(api.productId);
  expect(response.ok()).toBeTruthy();

  const product = (await response.json()) as Product;
  expect(product.id).toBe(api.productId);
  expect(product.title).toBeTruthy();
  expect(product.description).toBeTruthy();
  expect(product.price).toBeGreaterThan(0);
  expect(product.brand).toBeTruthy();
  expect(product.category).toBeTruthy();
  expect(product.thumbnail).toMatch(/^https?:\/\//);
});
