import { Given } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/cucumberWorld';
import { saveScreenshot } from '../support/utilities';

Given('Hello', async function (this: ICustomWorld) {
    this.pageActions?.navigateTo('https://youtube.com');
    await this.pageActions?.takeScreenshot(this.testName);
});

Given('Hello1', async function (this: ICustomWorld) {
    this.pageActions?.navigateTo('https://youtube.com');
    this.pageActions?.pageObjects.findAllByXPath('');
});
