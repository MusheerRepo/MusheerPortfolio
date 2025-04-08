import { Given, Then, When } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/cucumberWorld';

Given('the user is on the practice page', async function (this: ICustomWorld) {
    await this.getPages().homePage.goToBaseUrl();
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

When('the user checks a checkbox', async function (this: ICustomWorld) {
    await this.getPages().homePage.checkTheCheckBox();
});

Then('the checkbox should be checked', async function (this: ICustomWorld) {
    await this.getPages().homePage.isCheckboxChecked();
});

When('the user drags an element to a droppable area', async function (this: ICustomWorld) {
    await this.getPages().homePage.dragAndDropElement();
});

Then(
    'the droppable element should have {string} text',
    async function (this: ICustomWorld, text: string) {
        await this.getPages().homePage.checkDroppedElement(text);
    },
);

When(
    'the user selects an {string} option from the dropdown',
    async function (this: ICustomWorld, country: string) {
        await this.getPages().homePage.selectCountryDropDown(country);
    },
);

Then(
    'the selected {string} option should be displayed',
    async function (this: ICustomWorld, country: string) {
        await this.getPages().homePage.selectCountryDropDown(country);
    },
);

When('the user uploads {string} file', async function (this: ICustomWorld, fileName) {
    await this.getPages().homePage.uploadFileOnPage(fileName);
});
