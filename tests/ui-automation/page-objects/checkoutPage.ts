import { expect, Locator, Page } from '@playwright/test';

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

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async getSummaryAmount(label: Locator): Promise<number> {
    const text = (await label.textContent()) ?? '';
    const match = text.match(/\$([0-9]+(?:\.[0-9]{2})?)/);
    if (!match) {
      throw new Error(`Could not parse amount from summary label: ${text}`);
    }
    return Number.parseFloat(match[1]);
  }

  async expectTotalsMatchExpected(itemSubtotal: number) {
    const itemTotal = await this.getSummaryAmount(this.itemTotalLabel);
    const tax = await this.getSummaryAmount(this.taxLabel);
    const total = await this.getSummaryAmount(this.totalLabel);

    expect(itemTotal).toBeCloseTo(itemSubtotal, 2);
    // Sauce Demo applies a flat 8% tax on the item subtotal.
    expect(tax).toBeCloseTo(itemSubtotal * 0.08, 2);
    expect(total).toBeCloseTo(itemSubtotal + itemSubtotal * 0.08, 2);
  }

  async expectOrderComplete() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
