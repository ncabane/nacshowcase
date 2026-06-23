import { test, expect } from '../fixtures';
import type { LoginResponse } from '../clients/dummyJsonApi';

// Successful login returns user profile and tokens. This is a happy path test
test('successful login returns user profile and tokens', async ({ dummyJson }) => {
  const response = await dummyJson.login();
  expect(response.ok()).toBeTruthy();

  const body = (await response.json()) as LoginResponse;
  expect(body.id).toBeGreaterThan(0);
  expect(body.username).toBe('emilys');
  expect(body.email).toContain('@');
  expect(body.accessToken).toBeTruthy();
  expect(body.refreshToken).toBeTruthy();
});
