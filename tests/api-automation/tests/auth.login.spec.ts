import { test, expect } from '../fixtures';
import { credentials } from '../../../config/testData';
import type { LoginResponse } from '../clients/dummyJsonApi';

test('successful login returns user profile and tokens', async ({ dummyJson }) => {
  // Send login request with valid credentials
  const response = await dummyJson.login();

  // Expect HTTP response to be successful
  expect(response.ok()).toBeTruthy();

  // Parse response body as login payload
  const body = (await response.json()) as LoginResponse;

  // Expect user id to be present
  expect(body.id).toBeTruthy();

  // Expect username to match the valid test user
  expect(body.username).toBe(credentials.dummyJson.valid.username);

  // Expect first name to be present
  expect(body.firstName).toBeTruthy();

  // Expect last name to be present
  expect(body.lastName).toBeTruthy();

  // Expect email to be present
  expect(body.email).toBeTruthy();

  // Expect access token to be present
  expect(body.accessToken).toBeTruthy();

  // Expect refresh token to be present
  expect(body.refreshToken).toBeTruthy();
});
