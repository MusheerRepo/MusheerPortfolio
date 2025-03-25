import { Given } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/cucumberWorld';
import { saveScreenshot } from '../support/utilities';

Given('Hello', async function (this: ICustomWorld) {
    console.log('Hello was called');
    this.page?.get('https://youtube.com');
    await saveScreenshot(await this.page?.takeScreenshot(), this.testName, this.logger);
});
