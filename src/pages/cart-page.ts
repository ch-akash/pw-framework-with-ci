import { faker } from "@faker-js/faker/locale/en_IN";
import { Locator, Page } from "@playwright/test";

export class CartPage {
  private checkoutButtonLocator: Locator;
  private placeOrderButtonLocator: Locator;
  private placeOrderedButtonLocator: Locator;
  private inputNameLocator: Locator;
  private inputAddressLineOneLocator: Locator;
  private inputAddressLineTwoLocator: Locator;
  private inputPinCodeLocator: Locator;
  private inputStateLocator: Locator;

  constructor(page: Page) {
    this.checkoutButtonLocator = page.getByRole("button", { name: "CheckOut" });
    this.placeOrderButtonLocator = page.getByRole("button", {
      name: "Place Order",
    });
    this.inputNameLocator = page.getByPlaceholder("Name");
    this.inputAddressLineOneLocator = page.getByPlaceholder("Address Line 1");
    this.inputAddressLineTwoLocator = page.getByPlaceholder("Address Line 2");
    this.inputPinCodeLocator = page.getByPlaceholder("Pincode");
    this.inputStateLocator = page.getByPlaceholder("State");
  }

  async clickCheckout() {
    await this.checkoutButtonLocator.click();
  }

  async confirmOrder() {
    await this.placeOrderButtonLocator.click();
  }

  async fillAddressForm(
    name: string,
    addressLineOne: string,
    addressLineTwo: string,
    state: string,
    pinCode: string
  ) {
    await this.inputNameLocator.fill(name);
    await this.inputAddressLineOneLocator.fill(addressLineOne);
    await this.inputAddressLineTwoLocator.fill(addressLineTwo);
    await this.inputPinCodeLocator.fill(pinCode);
    await this.inputStateLocator.fill(state);
  }

  /** This method uses default faker data to fill the form. Use {@link fillAddressForm()} to fill the form with custom data
   *
   **/
  async fillUserDetailsForm() {
    // Using faker to create random fake test data
    const name = faker.person.fullName();
    const addressLineOne = faker.location.streetAddress();
    const addressLineTwo = faker.location.buildingNumber();
    const state = faker.location.state();
    //The zipcode generated has spaces. Example: '123 456'
    //Fix the space
    const postalCode = faker.location.zipCode("2#####").replace(" ", "");
    await this.fillAddressForm(
      name,
      addressLineOne,
      addressLineTwo,
      state,
      postalCode
    );
  }
}
