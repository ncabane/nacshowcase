import { test, expect } from '../fixtures';
import { credentials, api } from '../../../config/testData';

// Two negative cases on different endpoints, as required by the assignment
test.describe('negative API scenarios', () => {
  
  // Case 1: Invalid login credentials should return a 400 status code
  test('login with invalid password returns 400', async ({ dummyJson }) => {
    const response = await dummyJson.login(
      credentials.dummyJson.invalid.username,
      credentials.dummyJson.invalid.password,
    );

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.message).toMatch(/Invalid credentials/i);
  });

  // Case 2: Non-existent product should return a 404 status code
  test('get non-existent product returns 404', async ({ dummyJson }) => {
    const response = await dummyJson.getProduct(api.invalidProductId);
    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.message).toMatch(/not found/i);
  });
});
