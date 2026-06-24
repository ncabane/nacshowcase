import { test, expect } from '../fixtures';
import { api } from '../../../config/testData';
import type { Product } from '../clients/dummyJsonApi';

test('get product by id returns expected content', async ({ dummyJson }) => {
  // Send GET request for product by id
  const response = await dummyJson.getProduct(api.productId);

  // Expect HTTP response to be successful
  expect(response.ok()).toBeTruthy();

  // Parse response body as product payload
  const product = (await response.json()) as Product;

  // Expect product id to match requested id
  expect(product.id).toBe(api.productId);

  // Expect product title to be present
  expect(product.title).toBeTruthy();

  // Expect product description to be present
  expect(product.description).toBeTruthy();

  // Expect product price to be present
  expect(product.price).toBeTruthy();

  // Expect product brand to be present
  expect(product.brand).toBeTruthy();

  // Expect product category to be present
  expect(product.category).toBeTruthy();

  // Expect product thumbnail to be present
  expect(product.thumbnail).toBeTruthy();
});
