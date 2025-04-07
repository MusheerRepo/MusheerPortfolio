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

When('the user clicks a link', async function (this: ICustomWorld) {
    await this.getPages().homePage.theUserClicksALink();
});

Then('the browser should navigate to {string}', async function (this: ICustomWorld, value: string) {
    await this.getPages().homePage.theBrowserShouldNavigateToCorrectPage(value);
});

When(
    'the user performs an action that triggers a {string} alert',
    async function (this: ICustomWorld, alertType: string) {
        await this.getPages().homePage.triggerAlert(alertType);
    },
);

Then(
    'the user should be able to {string} the alert',
    async function (this: ICustomWorld, action: string) {
        if (action.localeCompare('accept')) {
            await this.getPages().homePage.acceptAlert();
        } else if (action.localeCompare('dismiss')) {
            await this.getPages().homePage.dismissAlert();
        } else {
            throw new Error('Invalid action on prompt');
        }
    },
);

Then(
    'the user should be able to enter {string} and accept the alert',
    async function (this: ICustomWorld, text: string) {
        await this.getPages().homePage.enterAlertText(text);
    },
);
