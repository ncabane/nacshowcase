import { test } from '../fixtures';
import { credentials } from '../../../config/urls';

test('failed login shows error message', async ({ login }) => {
  const { username, password } = credentials.sauceDemo.invalid;

  await login.goto();
  await login.login(username, password);
  await login.expectLoginError(/Username and password do not match/);
});
