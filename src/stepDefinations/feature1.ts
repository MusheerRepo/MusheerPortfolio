import { Given } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/cucumberWorld';

Given('Hello', async function (this: ICustomWorld) {
    await this.pageActions?.navigateTo('https://youtube.com');
    await this.pageActions?.takeScreenshot(this.testName);
});

Given('Hello1', async function (this: ICustomWorld) {
    await this.pageActions?.navigateTo('https://youtube.com');
    await this.PageObjects?.findByName('search_query');
});
