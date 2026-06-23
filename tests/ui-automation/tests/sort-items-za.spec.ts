import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { isSortedDescending } from '../page-objects/inventoryPage';

// Validates that the inventory sort control reorders products by name descending
// This is a happy path test
test('sort items by name Z-A and validate order', async ({ authenticatedInventory }) => {
  // Sort items by name Z-A
  await authenticatedInventory.sortByNameDescending();

  // Get item names
  const itemNames = await authenticatedInventory.getItemNames();

  // Expect item names to be sorted descending
  await expect(itemNames.length).toBeGreaterThan(1);
  await expect(isSortedDescending(itemNames)).toBe(true);
});
