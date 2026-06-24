import { test, expect } from '../fixtures';
import { credentials, api } from '../../../config/testData';

// Two negative cases on different endpoints, as required by the assignment
test.describe('negative API scenarios', () => {
  // Case 1: invalid login credentials should return 400
  test('login with invalid password returns 400', async ({ dummyJson }) => {
    // Send POST request to login with invalid credentials
    const response = await dummyJson.login(
      credentials.dummyJson.invalid.username,
      credentials.dummyJson.invalid.password,
    );

    // Expect HTTP response to be unsuccessful
    expect(response.status()).toBe(400);

    // Parse response body as login payload
    const body = await response.json();

    // Expect error message to mention invalid credentials by checking the message
    expect(body.message).toMatch(/Invalid credentials/i);
  });

  // Case 2: non-existent product should return 404
  test('get non-existent product returns 404', async ({ dummyJson }) => {
    // Send GET request for a product id that does not exist
    const response = await dummyJson.getProduct(api.invalidProductId);

    // Expect HTTP status code to be 404
    expect(response.status()).toBe(404);

    // Parse response body
    const body = await response.json();

    // Expect error message to mention not found
    expect(body.message).toMatch(/not found/i);
  });
});
