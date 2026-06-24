import { expect, Locator, Page } from '@playwright/test';
import type { CheckoutCustomer } from '../../../config/testData';

// CheckoutPage represents the checkout page and its actions
export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly completeHeader: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.itemTotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
  }

  // Fill customer info by filling the first name, last name and postal code and clicking the continue button
  async fillCustomerInfo(checkoutCustomer: CheckoutCustomer) {
    await this.firstNameInput.fill(checkoutCustomer.firstName);
    await this.lastNameInput.fill(checkoutCustomer.lastName);
    await this.postalCodeInput.fill(checkoutCustomer.postalCode);
    await this.continueButton.click();
  }

  // Finish order by clicking the finish button
  async finishOrder() {
    await this.finishButton.click();
  }

  // AI-generated solution:
  // Parse dollar amount from a checkout summary label
  async getSummaryAmount(label: Locator): Promise<number> {
    const text = (await label.textContent()) ?? '';
    const match = text.match(/\$([0-9]+(?:\.[0-9]{2})?)/);
    if (!match) {
      throw new Error(`Could not parse amount from summary label: ${text}`);
    }
    return Number.parseFloat(match[1]);
  }

  // AI-generated solution:
  // Validate item total, tax (8%), and final total against expected subtotal
  async expectTotalsMatchExpected(itemSubtotal: number) {
    const itemTotal = await this.getSummaryAmount(this.itemTotalLabel);
    const tax = await this.getSummaryAmount(this.taxLabel);
    const total = await this.getSummaryAmount(this.totalLabel);

    expect(itemTotal).toBeCloseTo(itemSubtotal, 2);
    // Sauce Demo applies a flat 8% tax on the item subtotal
    expect(tax).toBeCloseTo(itemSubtotal * 0.08, 2);
    expect(total).toBeCloseTo(itemSubtotal + itemSubtotal * 0.08, 2);
  }

  // AI-generated solution:
  // Confirm the order completion message is shown
  async expectOrderComplete() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
