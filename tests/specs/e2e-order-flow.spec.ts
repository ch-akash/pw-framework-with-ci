import { newUserTest } from "../fixtures/fixtures.ts";
import { TestTags } from "../../src/constants/test-tags.ts";
import {
  AnnotationDescription,
  AnnotationsType,
} from "../../src/constants/annotations.ts";
import { expect } from "@playwright/test";
import { BasePage } from "../../src/pages/base-page.ts";
import { ApiConstants } from "../../src/constants/globals.ts";

//book names: A Princess in Theory and Roomies
const bookOne = "Roomies";
const bookTwo = "A Princess in Theory";

/**
 * Add more test cases from assignment in this spec file (only which are related to order flow)
 */

/**
 * This test will add two books to the cart and place an order.
 * The order will be validated in the My Orders page.
 * The user is created using the API and then logged in.
 * See this fixture here: {@link newUserTest}
 */
newUserTest(
  "Place an order for any random book from SRP",
  {
    tag: [TestTags.E2E, TestTags.ORDER_FLOW],
    annotation: {
      type: AnnotationsType.LOGGED_IN,
      description: AnnotationDescription.LOGGED_IN,
    },
  },
  async ({ basePage }) => {
    await addBookToCartAndValidate(basePage, bookOne);
    await addBookToCartAndValidate(basePage, bookTwo);
    await basePage.searchPage.clickShoppingCart();
    await basePage.cartPage.clickCheckout();
    await basePage.cartPage.fillUserDetailsForm();
    await validateOrderSummary(basePage, [bookOne, bookTwo]);
    await basePage.cartPage.confirmOrder();
    await validateOrderPlacedMessage(basePage);

    //Validate that order is visible in orders table
    await basePage.myOrdersPage.clickLatestOrderCell();
    await expect(
      await basePage.myOrdersPage.getBookRowByBookNameAmountPaidAndQuantity(
        bookOne,
        "1",
        "334"
      )
    ).toBeVisible();
    await expect(
      await basePage.myOrdersPage.getBookRowByBookNameAmountPaidAndQuantity(
        bookTwo,
        "1",
        "545"
      )
    ).toBeVisible();
  }
);

/**
 * This test will add two books to the cart and place an order.
 * The order will be validated in the My Orders page.
 * The order ID from the API response will be extracted for validations
 * on the My Orders page.
 * The user is created using the API and then logged in.
 * See this fixture here: {@link newUserTest}
 */
newUserTest(
  "Place an order and user order ID from API Response in Browser",
  {
    tag: [TestTags.E2E, TestTags.ORDER_FLOW, TestTags.ORDER_API],
    annotation: {
      type: AnnotationsType.LOGGED_IN,
      description: AnnotationDescription.LOGGED_IN,
    },
  },
  async ({ basePage }) => {
    await addBookToCartAndValidate(basePage, bookOne);
    await addBookToCartAndValidate(basePage, bookTwo);
    await basePage.searchPage.clickShoppingCart();
    await basePage.cartPage.clickCheckout();
    await basePage.cartPage.fillUserDetailsForm();
    await validateOrderSummary(basePage, [bookOne, bookTwo]);

    //Wait for the Order API response and then extract the order ID
    //Note that we have NOT made any API calls.
    const responsePromise = basePage.page.waitForResponse(
      ApiConstants.ORDER_API_REGEX
    );
    await basePage.cartPage.confirmOrder();
    const orderApiResponseText = (await responsePromise).text();
    const orderApiResponseJson = JSON.parse(await orderApiResponseText);
    const orderId = orderApiResponseJson[0].orderId;

    console.log(`Created order ID: ${orderId}`);

    await validateOrderPlacedMessage(basePage);

    //Validate that order is visible in orders table
    await basePage.myOrdersPage.clickLatestOrderCellForAnOrderId(orderId);
    await expect(
      await basePage.myOrdersPage.getBookRowByBookNameAmountPaidAndQuantity(
        bookOne,
        "1",
        "334"
      )
    ).toBeVisible();
    await expect(
      await basePage.myOrdersPage.getBookRowByBookNameAmountPaidAndQuantity(
        bookTwo,
        "1",
        "545"
      )
    ).toBeVisible();
  }
);

/**
 * Helper Functions for assertions and validations.
 */
async function addBookToCartAndValidate(basePage: BasePage, bookName: string) {
  const successMessageLocatorOnSrp =
    await basePage.searchPage.getAddBookToCartSuccessMessageLocator();
  await basePage.searchPage.addBookToCartByName(bookName);
  await expect(successMessageLocatorOnSrp).toHaveCount(1);
  await expect(successMessageLocatorOnSrp).not.toBeVisible();
}

async function validateOrderPlacedMessage(basePage: BasePage) {
  const orderPlacedMessageLocator = basePage.page.getByText(
    "Order placed successfully"
  );

  await expect(orderPlacedMessageLocator).toBeVisible();
  await expect(orderPlacedMessageLocator).not.toBeVisible();
}

async function validateOrderSummary(
  basePage: BasePage,
  bookNames: Array<string>
) {
  for (const bookName of bookNames) {
    await expect(basePage.page.getByText(bookName)).toBeVisible();
  }
}
