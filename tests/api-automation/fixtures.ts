import { test as base, expect } from '@playwright/test';
import { DummyJsonApi, LoginResponse } from './clients/dummyJsonApi';

type ApiFixtures = {
  dummyJson: DummyJsonApi;
  authenticatedUser: LoginResponse;
};

export const test = base.extend<ApiFixtures>({
  dummyJson: async ({ request }, use) => {
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
