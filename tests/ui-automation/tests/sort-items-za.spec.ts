import { expect } from '@playwright/test';
import { test } from '../fixtures';

test('sort items by name Z-A and validate order', async ({ authenticatedInventory }) => {
  // Sort items by name Z-A
  await authenticatedInventory.sortByNameDescending();

  // Get item names
  const itemNames = await authenticatedInventory.getItemNames();
  // Get expected order by sorting the item names by name Z-A
  const expectedOrder = [...itemNames].sort((a, b) => b.localeCompare(a));

  // Expect item names to be sorted by name Z-A by checking the length and the expected order
  expect(itemNames.length).toBeGreaterThan(1);
  expect(itemNames).toEqual(expectedOrder);
});
