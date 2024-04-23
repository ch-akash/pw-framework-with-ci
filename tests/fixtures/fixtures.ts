import { test as baseTest, expect, APIResponse } from "playwright/test";
import { BasePage } from "../../src/pages/base-page.ts";
import { ApiConstants } from "../../src/constants/globals.ts";
import { faker } from "@faker-js/faker/locale/en_IN";

const authFile = "playwright/.auth/user.json";

/**
 * This fixture can be used if test requires a base page with no user logged in.
 */
export const test = baseTest.extend<{ basePage: BasePage }>({
  basePage: async ({ page }, use) => {
    console.log("Initialising BasePage");
    await page.goto("/");
    await use(new BasePage(page));
  },
});

/**
 * This fixture can be used if test requires a logged-in user.
 */
export const loggedInTest = baseTest.extend<{ basePage: BasePage }>({
  basePage: async ({ page }, use) => {
    console.log("Initialising BasePage");
    const basePage = new BasePage(page);
    console.log("Preparing storage state for test user");
    await page.goto("/login");
    const username: any = process.env.BOOK_STORE_USERNAME;
    const password: any = process.env.BOOK_STORE_PASSWORD;
    await basePage.loginPage.login(username, password);
    await expect(await basePage.searchPage.getHeaderLocator()).toContainText(
      username
    );

    //The user is logged in. Save this session data to the file
    await page.context().storageState({ path: authFile });

    await use(new BasePage(page));
  },
});

/**
 * This fixture can be used if test requires a new user to be created and logged in.
 * See usage in "specs/e2e-order-flow.spec"
 */
export const newUserTest = baseTest.extend<{ basePage: BasePage }>({
  basePage: async ({ page, baseURL }, use) => {
    console.log("Initialising BasePage");
    const basePage = new BasePage(page);

    const passwordForNewUser = faker.internet.password({
      length: 20,
      prefix: "@",
    });
    const newUserName = faker.internet.userName();
    //Create a new user using API
    const createUserApiResponse: APIResponse = await page.request.post(
      `${baseURL}${ApiConstants.CREATE_USER_API_PATH}`,
      {
        data: {
          firstname: faker.person.firstName(),
          lastname: faker.person.lastName(),
          username: newUserName,
          password: passwordForNewUser,
          confirmPassword: passwordForNewUser,
          gender: "Male",
        },
      }
    );

    await expect(createUserApiResponse).toBeOK();

    console.log("Preparing storage state for new test user");
    await page.goto("/login");
    await basePage.loginPage.login(newUserName, passwordForNewUser);
    await expect(await basePage.searchPage.getHeaderLocator()).toContainText(
      newUserName
    );

    //The user is logged in. Save this session data to the file
    await page.context().storageState({ path: authFile });

    await use(new BasePage(page));
  },
});
