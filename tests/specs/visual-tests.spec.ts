import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures.ts";

test("Valdaite no books found error message on Search Page", async ({
  basePage,
}) => {
  //Mocking empty JSON
  await basePage.searchPage.mockBookApiResponse([{}]);
  await basePage.page.goto("/");
  await expect(basePage.page.getByText("No books found.")).toBeVisible();
  //Visual comparison for empty search page
  await expect(basePage.page).toHaveScreenshot();
});
