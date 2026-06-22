import { test as base, expect } from '@playwright/test';
import { DummyJsonApi, LoginResponse } from './clients/dummyJsonApi';

// API fixtures provide a shared HTTP client and optional pre-authenticated user data.
type ApiFixtures = {
  dummyJson: DummyJsonApi;
  // Logs in before the test and exposes the parsed response body (id, tokens, etc.).
  authenticatedUser: LoginResponse;
};

export const test = base.extend<ApiFixtures>({
  dummyJson: async ({ request }, use) => {
    // Playwright's built-in `request` context handles cookies/headers for API calls.
    await use(new DummyJsonApi(request));
  },

  authenticatedUser: async ({ dummyJson }, use) => {
    const response = await dummyJson.login();
    expect(response.ok()).toBeTruthy();
    const body = (await response.json()) as LoginResponse;
    await use(body);
  },
});

export { expect };
