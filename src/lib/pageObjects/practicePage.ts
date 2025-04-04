import { WebDriver } from 'selenium-webdriver';
import { ICustomWorld } from '../../support/cucumberWorld';
import { PageActions } from '../pageActions';
import { PageObjects } from '../pageObjects';
import { Ensure } from '../ensure';

export class HomePage {
    readonly name: string;
    readonly page: WebDriver;
    readonly pageActions: PageActions;
    readonly pageObjects: PageObjects;
    readonly ensure: Ensure;

    constructor(world: ICustomWorld) {
        this.name = 'text-input';
        this.page = world.getPage();
        this.pageActions = world.getPageActions();
        this.pageObjects = world.getPageObjects();
        this.ensure = world.getEnsure();
    }

    async writeName(value: string) {
        await this.pageActions.getWindowHandle();
        const element = await this.pageObjects.findById(this.name);
        await this.pageActions.enterText(element, value);
        await this.page.sleep(5000);
    }

    async assertText(value: string) {
        await this.ensure.areEqual(
            await this.pageActions.getInputValue(await this.pageObjects.findById(this.name)),
            value,
        );
    }
}
