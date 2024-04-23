import { expect } from "@playwright/test";
import {
  AnnotationDescription,
  AnnotationsType,
} from "../../src/constants/annotations.ts";
import { TestTags } from "../../src/constants/test-tags.ts";
import { loggedInTest, test } from "../fixtures/fixtures.ts";
import { getDataFromCsvFile } from "../../src/utils/file-utils.ts";
import { FilePaths } from "../../src/constants/globals.ts";
import { BasePage } from "../../src/pages/base-page.ts";

// loggedInTest(
//   "Validate search box auto-suggestions(Logged-in)",
//   {
//     tag: [TestTags.REGRESSION, TestTags.SANITY, TestTags.AUTO_SUGGESTIONS],
//     annotation: {
//       type: AnnotationsType.DESKTOP,
//       description: AnnotationDescription.DESKTOP,
//     },
//   },
//   async ({ basePage }) => {
//     await basePage.searchPage.fillSearchInput("harry");
//     await validateAutoSuggestionNamesForKeyword(basePage, "Harry");
//   }
// );

// loggedInTest(
//   "Select one book from auto-suggestions and validate the results(Logged-in)",
//   {
//     tag: [TestTags.REGRESSION, TestTags.SANITY, TestTags.AUTO_SUGGESTIONS],
//     annotation: {
//       type: AnnotationsType.DESKTOP,
//       description: AnnotationDescription.DESKTOP,
//     },
//   },
//   async ({ basePage }) => {
//     await expect(async () => {
//       expect(
//         (await (await basePage.searchPage.getAllBooksFromSearchPage()).all())
//           .length
//       ).toBeGreaterThanOrEqual(10);
//     }).toPass();

//     await basePage.searchPage.fillSearchInput("harry");

//     const autoSuggestionsList =
//       await basePage.searchPage.getAllAutoSuggestions();

//     const firstBookLocatorFromList = autoSuggestionsList[0];

//     const bookTitle = await firstBookLocatorFromList.textContent();
//     console.log(`Selected book title: ${bookTitle}`);
//     await firstBookLocatorFromList.click();

//     await expect(
//       await basePage.searchPage.getAllBooksFromSearchPage()
//     ).toHaveCount(1);

//     await expect(
//       (
//         await basePage.searchPage.getAllBooksFromSearchPage()
//       ).filter({ has: basePage.page.getByText(bookTitle) })
//     ).toBeVisible();
//   }
// );

test.describe(
  "Auto-suggestions tests for CSV Keywords",
  {
    tag: [
      TestTags.REGRESSION,
      TestTags.SANITY,
      TestTags.AUTO_SUGGESTIONS,
      TestTags.CSV_DATA_DRIVEN,
    ],
    annotation: {
      type: AnnotationsType.DESKTOP,
      description: AnnotationDescription.DESKTOP,
    },
  },
  () => {
    const csvData = getDataFromCsvFile(FilePaths.SEARCH_KEYWRODS_DATA_FILE);

    for (const data of csvData) {
      const searchKeyword = data.keyword;
      console.log(`Running test for search keyword ${searchKeyword}`);

      test(`Validate auto-suggestions for keyword ${searchKeyword}`, async ({
        basePage,
      }) => {
        await expect(async () => {
          expect(
            (
              await (
                await basePage.searchPage.getAllBooksFromSearchPage()
              ).all()
            ).length
          ).toBeGreaterThanOrEqual(10);
        }).toPass();

        //Validate auto-suggestions for the keyword
        await basePage.searchPage.fillSearchInput(searchKeyword);
        await validateAutoSuggestionNamesForKeyword(basePage, searchKeyword);

        const autoSuggestionsList =
          await basePage.searchPage.getAllAutoSuggestions();

        //Select first suggestion for clicking
        const firstBookLocatorFromList = autoSuggestionsList[0];

        const bookTitle = await firstBookLocatorFromList.textContent();
        console.log(`Selected book title: ${bookTitle}`);
        await firstBookLocatorFromList.click();

        //Validate that page has only one book which is clicked in previous step
        await expect(
          await basePage.searchPage.getAllBooksFromSearchPage()
        ).toHaveCount(1);

        await expect(
          (
            await basePage.searchPage.getAllBooksFromSearchPage()
          ).filter({ has: basePage.page.getByText(bookTitle) })
        ).toBeVisible();
      });
    }
  }
);

/**
 * These are helper functions
 */

async function validateAutoSuggestionNamesForKeyword(
  basePage: BasePage,
  searchKeyword: string
) {
  const autoSuggestionsList = await basePage.searchPage.getAllAutoSuggestions();

  for (const autoSuggestedBookName of autoSuggestionsList) {
    const bookNameSuggested = await autoSuggestedBookName.textContent();
    console.log(bookNameSuggested);
    expect(bookNameSuggested).toContain(searchKeyword);
  }
}
