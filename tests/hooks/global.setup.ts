import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures.ts";

/**
 * Create a new folder playwright/.auth
 * Define the storage stage path in config file for the project in test use options
 * Login the user and save the storage state in above file
 * Add this folder in .gitignore -- It must not be pushed to remote.
 */

//Location for storing user state
const authFile = "playwright/.auth/user.json";

/**
 * Placeholder for global setup method.
 */
// test("Global setup - Save user logged in state", async ({ basePage, page }) => {
//   // console.log("Preparing storage state for test user");
//   // await page.goto("/login");
//   // const username: any = process.env.BOOK_STORE_USERNAME;
//   // const password: any = process.env.BOOK_STORE_PASSWORD;
//   // await basePage.loginPage.login(username, password);
//   // await expect(await basePage.searchPage.getHeaderLocator()).toContainText(
//   //   username
//   // );
//   // //The user is logged in. Save this session data to the file
//   // await page.context().storageState({ path: authFile });
// });
