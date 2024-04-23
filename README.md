# Real Project with Playwright and TypeScript

***

* [Description](#description)
* [Folder Structure](#folder-structure)
* [Installation](#installation)
* [Run the Tests](#run-the-tests)
* [Sample Test Cases Covered](#run-the-tests)
* [Configuration](#configuration)
* [Design Philosophy](#design-philosophy)
* [Coding Principles](#coding-principles)
* [Contributing](#contributing)
* [Connect with Me](#connect-with-me)

## Description

***

This project is a real project that uses Playwright and TypeScript to automate the web application.
The project architecture is based on the Page Object Model (POM) design pattern.

## Folder Structure

***

The project is structured as follows:

```plaintext

├── README.md
├── package.json
├── tsconfig.json
├── src
│ ├── constants
│ ├── pages
│ │ ├── base-page.ts
│ │ ├── login-page.ts
│ │ └── srp-page.ts ... more page files
│ ├── utils
│ │ ├── file-utils.ts
│ │ └── test-data-util.ts
├── tests
│ ├── fixtures
│ │ └── fixtures.ts
│ ├── hooks
│ │ └── global.setup.ts
│ │ └── global.teardown.ts
│ ├── specs
│ │ ├── e2e.spec.ts
│ │ ├── search-validations.spec.ts
│ │ └── ... more test files
│ ├── resources

```

## Installation

***

1. Clone the repository
2. Install the dependencies by running `npm install`

## Run the Tests

***

1. Run the tests by running `npx playwright test`
2. Run the tests in headful mode by running `npx playwright test --headed`
3. Run a specific test by running `npx playwright test tests/specs/e2e.spec.ts`

## Test Cases Covered in Framework

***

1. E2E Place order for a new user(create new user for each test using fixtures).
2. E2E Place order and fetch order ID from browser API calls.
3. Apply price filter and validate results(non-logged in user).
4. Search a book for logged-in user and validate auto-suggestions.
5. Search books and keywords. Take test data from CSV.
6. Use mocked data for checking no results errors on search page.
7. Visual Test for test 6 and book category element.
8. Website Performance audit tests
   with [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).

## Configuration

***

The project uses Playwright's configuration file. The configuration file is located at `playwright.config.ts`.

> The project is using an open test practice website: 📚[Book Store](https://bookcart.azurewebsites.net/)

## Design Philosophy

***

The project is designed with the following principles in mind:

1. **Modularity**: The project is designed to be modular. Each page is a class that represents a page in the
   application. Each page class has methods that represent the actions that can be performed on the page.
2. **Re-usability**: The project is designed to be reusable. The page classes are designed to be reusable across
   different tests. The tests are designed to be reusable across different test suites.
3. **Readability**: The project is designed to be readable. The project uses TypeScript to provide type safety
   and to make the code more readable. The project uses descriptive method names to make the code more readable.
4. **Maintainability**: The project is designed to be maintainable. The project uses the Page Object Model (POM)
   design pattern to separate the page logic from the test logic. This makes it easier to maintain the project
   as the application changes.
5. **Scalability**: The project is designed to be scalable. The project is designed to be able to handle a large
   number of pages, tests, and test suites. The project is designed to be able to handle a large number of users
   and data.

## Coding Principles

***

The project follows the following best practices and guidelines:

1. **Naming Conventions**: The project uses descriptive names for classes, methods, and variables. The project uses
   camelCase for variables and methods, and PascalCase for classes.
2. **DRY and KISS Principles**: The project follows the DRY (Don't Repeat Yourself) and KISS (Keep It Simple,
   Stupid) principles. The project avoids code duplication and keeps the code simple and easy to understand.
3. **Code Comments**: The project uses comments to explain the code. The project uses comments to explain the
   purpose of classes, methods, and variables.
4. **Single Responsibility Principle(SRP)**: The project follows the Single Responsibility Principle. Each class has a
   single responsibility and does one thing well. Pages are responsible for interacting with the page, and tests are
   responsible for testing the page.
5. **Separation of Concerns**: The project follows the Separation of Concerns principle. The project separates the
   page logic from the test logic. The project separates the test logic from the assertion logic.

## Contributing

***

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or
feedback. Thank you!
***

## Connect with Me

* [LinkedIn](https://www.linkedin.com/in/akashch/)
* [Ask anything at Discord Server](https://discord.gg/hStwWQbPDw)
