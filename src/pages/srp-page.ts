import { Locator, Page } from "@playwright/test";
import { ApiConstants } from "../constants/globals.ts";

export class SearchResultsPage {
  private page: Page;
  private shoppingCartLocator: Locator;
  private categoryListLocator: Locator;
  private bookCardContentLocator: Locator;
  private appHomeLocator: Locator;
  private toolbarHeaderLocator: Locator;
  private addedToCartMessageLocator: Locator;
  private sliderLocator: Locator;
  private bookAmountsLocator: Locator;
  private searchBoxLocator: Locator;
  private autoSuggestionsListLocator: Locator;
  private allBooksCardContentListLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLocator = page.locator("[ng-reflect-router-link*='cart']");
    this.categoryListLocator = page.locator("mat-list-item");
    this.bookCardContentLocator = page.locator("mat-card-content");
    this.appHomeLocator = page.locator("app-home");
    this.toolbarHeaderLocator = page.locator("mat-toolbar-row");
    this.addedToCartMessageLocator = page.getByText("One Item added to cart");
    this.sliderLocator = page.getByRole("slider");
    this.bookAmountsLocator = page.locator("mat-card-content p");
    this.searchBoxLocator = page.getByPlaceholder("Search books or authors");
    this.autoSuggestionsListLocator = page.getByRole("option");
    this.allBooksCardContentListLocator = page.locator("app-book-card");
  }

  async getHeaderLocator() {
    return this.toolbarHeaderLocator;
  }

  async selectBookCategory(categoryName: string) {
    return await this.categoryListLocator
      .filter({ hasText: categoryName })
      .click();
  }

  async addBookToCartByName(bookName: string) {
    return await this.bookCardContentLocator
      .filter({ hasText: bookName })
      .getByRole("button", { name: "Add to Cart" })
      .click();
  }

  async getAllBookCategories() {
    return this.categoryListLocator;
  }

  async clickShoppingCart() {
    await this.shoppingCartLocator.click();
  }

  async clickProductTitle(title: string) {
    await this.page.getByText(title, { exact: true }).click();
  }

  async filterBookByName(bookName: string) {
    return this.appHomeLocator.filter({ hasText: bookName });
  }

  async getAddBookToCartSuccessMessageLocator() {
    return this.addedToCartMessageLocator;
  }

  async applyPriceFilterUsingSlider(amoutToFilter: string) {
    return await this.sliderLocator.fill(amoutToFilter);
  }

  async getAmountsOfAllBooks() {
    return this.bookAmountsLocator;
  }

  async fillSearchInput(input: string) {
    return this.searchBoxLocator.fill(input);
  }

  async getAllAutoSuggestions() {
    return await this.autoSuggestionsListLocator.all();
  }

  async getAllBooksFromSearchPage() {
    return this.allBooksCardContentListLocator;
  }

  async mockBookApiResponse(json: any) {
    await this.page.route(ApiConstants.BOOK_API_REGEX, async (route) => {
      await route.fulfill({ json });
    });
  }
}
