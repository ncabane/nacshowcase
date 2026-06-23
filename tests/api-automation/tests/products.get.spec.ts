import { test, expect } from '../fixtures';
import type { Product } from '../clients/dummyJsonApi';

// Get product by id returns expected content. This is a happy path test
test('get product by id returns expected content', async ({ dummyJson }) => {
  const productId = 1;
  const response = await dummyJson.getProduct(productId);
  expect(response.ok()).toBeTruthy();

  const product = (await response.json()) as Product;
  expect(product.id).toBe(productId);
  expect(product.title).toBeTruthy();
  expect(product.description).toBeTruthy();
  expect(product.price).toBeGreaterThan(0);
  expect(product.brand).toBeTruthy();
  expect(product.category).toBeTruthy();
  expect(product.thumbnail).toMatch(/^https?:\/\//);
});
