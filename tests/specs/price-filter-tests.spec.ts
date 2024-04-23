import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures.ts";
import { REGEX_PATTERN_FOR_CHAR_MATCH } from "../../src/constants/globals.ts";

test("Validate results after applying price filter(Slider)", async ({
  basePage,
}) => {
  //This is to poll until slider has the max range.
  //This is to avoid Malformed input error
  await expect(async () => {
    await basePage.searchPage.applyPriceFilterUsingSlider("1511");
  }).toPass();

  const allBookAmount = (
    await basePage.searchPage.getAmountsOfAllBooks()
  ).all();

  for (const amoutLocator of await allBookAmount) {
    const amoutFloatValue = parseFloat(
      (await amoutLocator.textContent()).replace(
        REGEX_PATTERN_FOR_CHAR_MATCH,
        ""
      )
    );
    console.log(`Amount fetched: ${amoutFloatValue}`);
    expect(amoutFloatValue).not.toBeGreaterThan(1511);
  }
});
