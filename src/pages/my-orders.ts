import { Locator, Page } from "@playwright/test";
export class MyOrdersPage {
  private page: Page;

  private latestOrderCellLocator: Locator;
  private bookRowsLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.latestOrderCellLocator = page.getByRole("cell").first();
    this.bookRowsLocator = page.locator("tr").getByRole("row");
  }

  async clickLatestOrderCell() {
    await this.latestOrderCellLocator.click();
  }
  async clickLatestOrderCellForAnOrderId(orderId: string) {
    await this.page.getByText(orderId).click();
  }

  async getBookRowByBookNameAmountPaidAndQuantity(
    bookName: string,
    bookQuantity: string,
    amountPaid: string
  ) {
    return this.bookRowsLocator
      .filter({
        has: this.page.getByText(bookName),
      })
      .filter({ has: this.page.getByRole("cell", { name: bookQuantity }) })
      .filter({
        has: this.page.getByText(amountPaid),
      });
  }
}
