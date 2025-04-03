import { WebDriver } from 'selenium-webdriver';
import { ICustomWorld } from '../../support/cucumberWorld';
import { PageActions } from '../pageActions';
import { PageObjects } from '../pageObjects';

export class HomePage {
    readonly name: string;
    readonly page: WebDriver;
    readonly pageActions: PageActions;
    readonly pageObjects: PageObjects;

    constructor(world: ICustomWorld) {
        this.name = 'name';
        this.page = world.getPage();
        this.pageActions = world.getPageActions();
        this.pageObjects = world.getPageObjects();
    }

    async writeName() {
        await this.pageActions.getWindowHandle();
        const element = await this.pageObjects.findById(this.name);
        await this.pageActions.enterText(element, 'Hello');
        await this.page.sleep(5000);
    }
}
