import { expect } from '@playwright/test';
import { test } from '../fixtures';

test('sort items by name Z-A and validate order', async ({ authenticatedInventory }) => {
  await authenticatedInventory.sortByNameDescending();

  const itemNames = await authenticatedInventory.getItemNames();
  const expectedOrder = [...itemNames].sort((a, b) => b.localeCompare(a));

  expect(itemNames.length).toBeGreaterThan(1);
  expect(itemNames).toEqual(expectedOrder);
});
