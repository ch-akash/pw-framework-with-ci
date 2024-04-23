/**
 * This file holds enums for globally constant data.
 */

export const REGEX_PATTERN_FOR_CHAR_MATCH: any = /[^0-9-+.]/;

export enum FilePaths {
  TEST_DATA_FILE = "tests/resources/test-data.csv",
  SEARCH_KEYWRODS_DATA_FILE = "tests/resources/search-keywords.csv",
}
export enum ApiConstants {
  CREATE_USER_API_PATH = "/api/user/",
  ORDER_API_REGEX = "*/**/api/Order/**",
  BOOK_API_REGEX = "*/**/api/book/",
}
