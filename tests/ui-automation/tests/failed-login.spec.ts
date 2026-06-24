import { test } from '../fixtures';
import { credentials } from '../../../config/testData';

// Negative UI scenario: invalid credentials should show an error and block access
test('failed login shows error message', async ({ login }) => {
  // Get invalid credentials from test data
  const { username, password } = credentials.sauceDemo.invalid;

  // Go to login page by navigating to the base URL
  await login.goto();

  // Login with invalid credentials by filling the username and password inputs and clicking the login button
  await login.login(username, password);

  // Expect login error by checking the error message and the URL
  await login.expectLoginError(/Username and password do not match/);
});
