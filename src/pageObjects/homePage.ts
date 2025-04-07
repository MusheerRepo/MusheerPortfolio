import { ICustomWorld } from '../support/cucumberWorld';
import { PageActions } from '../lib/pageActions';
import { PageObjects } from '../lib/pageObjects';
import { Ensure } from '../lib/ensure';
import { readData } from '../support/utilities';
import { config } from '../support/config';
import path from 'path';

export class HomePage {
    readonly name: string;
    readonly email: string;
    readonly message: string;
    readonly form: string;
    readonly link: string;

    readonly pageActions: PageActions;
    readonly pageObjects: PageObjects;
    readonly ensure: Ensure;
    readonly world: ICustomWorld;

    constructor(world: ICustomWorld) {
        this.name = 'name';
        this.email = 'email';
        this.message = 'message';
        this.form = 'sample-form';
        this.link = 'link';

        this.world = world;
        this.pageActions = world.getPageActions();
        this.pageObjects = world.getPageObjects();
        this.ensure = world.getEnsure();
    }

    async enterFormDetails() {
        const data = readData(path.join(config.dataDir, config.details));
        await this.pageActions.enterText(await this.pageObjects.findById(this.name), data[1][1]);
        await this.pageActions.enterText(await this.pageObjects.findById(this.email), data[1][3]);
        await this.pageActions.enterText(
            await this.pageObjects.findById(this.message),
            'This is message',
        );
    }

    async theUserClicksTheSubmitButton() {
        await this.pageActions.submitForm(await this.pageObjects.findById(this.form));
        this.world.data['alert text'] = await this.pageActions.getAlertText();
    }

    async aSuccessMessageShouldBeDisplayed(value: string) {
        await this.pageActions.acceptAlert();
        await this.ensure.areEqual(this.world.data['alert text'], value);
    }

    async theUserClicksALink() {
        await this.pageActions.clickElement(await this.pageObjects.findById(this.link));
    }

    async theBrowserShouldNavigateToCorrectPage(value: string) {
        await this.ensure.areEqual(await this.pageActions.getUrl(), value);
    }

    async triggerAlert(alertType: string) {
        await this.pageActions.clickElement(
            await this.pageObjects.findByXPath(`//*[@data-testid="${alertType}-alert"]`),
        );
    }

    async acceptAlert() {
        await this.pageActions.acceptAlert();
    }

    async dismissAlert() {
        await this.pageActions.dismissAlert();
    }

    async enterAlertText(text: string) {
        await this.pageActions.enterAlertText(text);
        await this.pageActions.acceptAlert();
    }
}
