import { Given, Then, When } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/cucumberWorld';

Given('the user is on the practice page', () => {
    // User is already on base url
});

When('the user fills out the form with valid data', async function (this: ICustomWorld) {
    await this.getPages().homePage.enterFormDetails();
});

When('the user clicks the submit button', async function (this: ICustomWorld) {
    await this.getPages().homePage.theUserClicksTheSubmitButton();
});

Then(
    'a success message {string} should be displayed',
    async function (this: ICustomWorld, value: string) {
        await this.getPages().homePage.aSuccessMessageShouldBeDisplayed(value);
    },
);
