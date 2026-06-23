import { test } from '../fixtures';
import { credentials } from '../../../config/urls';

// Negative UI scenario: invalid credentials should show an error and block access. 
// This is a negative test.  
test('failed login shows error message', async ({ login }) => {
  const { username, password } = credentials.sauceDemo.invalid;

  // Go to login page
  await login.goto();

  // Login with invalid credentials
  await login.login(username, password);

  // Expect login error
  await login.expectLoginError(/Username and password do not match/);
});
