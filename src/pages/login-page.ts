import { Locator, Page } from "playwright/test";

export class LoginPage {
  private page: Page;
  private usernameLocator: Locator;
  private passwordLocator: Locator;
  private loginSubmitButtonLocator: Locator;
  private registerButtonLocator: Locator;
  private passwordVisibilityOffLocator: Locator;
  private passwordVisibilityOnLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passwordLocator = page.getByPlaceholder("Password");
    this.usernameLocator = page.getByPlaceholder("Username");
    this.loginSubmitButtonLocator = page
      .locator("mat-card-actions")
      .getByRole("button", { name: "Login" });
    this.registerButtonLocator = page.getByRole("button", { name: "Register" });
    this.passwordVisibilityOffLocator = page.getByText("visibility_off");
    this.passwordVisibilityOnLocator = page.getByText("visibility");
  }

  async login(username: string, password: string) {
    await this.usernameLocator.fill(username);
    await this.passwordLocator.fill(password);
    await this.loginSubmitButtonLocator.click();
  }
}
