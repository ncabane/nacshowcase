import { test, expect } from '../fixtures';
import { credentials } from '../../../config/urls';

// Two negative cases on different endpoints, as required by the assignment.
test.describe('negative API scenarios', () => {
  test('login with invalid password returns 400', async ({ dummyJson }) => {
    const response = await dummyJson.login(
      credentials.dummyJson.invalid.username,
      credentials.dummyJson.invalid.password,
    );

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.message).toMatch(/Invalid credentials/i);
  });

  test('get non-existent product returns 404', async ({ dummyJson }) => {
    const response = await dummyJson.getProduct(999_999);
    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.message).toMatch(/not found/i);
  });
});
