import { test, expect } from '../fixtures';
import { isSortedDescending } from '../page-objects/inventoryPage';

// Validates that the inventory sort control reorders products by name descending.
test('sort items by name Z-A and validate order', async ({ authenticatedInventory }) => {
  await authenticatedInventory.sortByNameDescending();

  const itemNames = await authenticatedInventory.getItemNames();
  expect(itemNames.length).toBeGreaterThan(1);
  expect(isSortedDescending(itemNames)).toBe(true);
});
