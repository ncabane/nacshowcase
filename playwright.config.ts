import { defineConfig, devices } from '@playwright/test';

// Central Playwright configuration shared by UI and API tests.
// UI specs use `use.baseURL`; API specs call full URLs via the DummyJsonApi client.
export default defineConfig({
  testDir: './tests',
  testMatch: [
    'ui-automation/tests/**/*.spec.ts',
    'api-automation/tests/**/*.spec.ts',
  ],

  // Run specs in parallel locally; limit workers in CI for predictable resource usage.
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Using one worker to make debug and review easier
  workers: process.env.CI ? 1 : 1,

  // list  -> live terminal output while tests run
  // html  -> interactive report with per-test steps and failure attachments
  // junit -> machine-readable output for CI dashboards
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    // Keep traces and screenshots only when a test fails to reduce noise and disk usage.
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  // Chromium only: fast smoke coverage for the assignment scope.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
