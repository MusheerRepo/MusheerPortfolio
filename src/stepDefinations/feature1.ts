import { Given, When } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/cucumberWorld';
import { config } from '../support/config';
import { By, locateWith } from 'selenium-webdriver';
import * as fs from 'fs';
import path from 'path';

Given('User is on base url', () => {
    // User is already on base url
});

When('user clicks {string}', async function (this: ICustomWorld, link) {
    if (this.page) {
        const element = await this.page.findElement(By.linkText(link));
        const data = await element.takeScreenshot();
        await fs.writeFileSync(
            path.join(config.outputDir, 'Element screenshot.png'),
            data,
            'base64',
        );
        await element.click();
    }
});

When('fetch data of children of list', async function (this: ICustomWorld) {
    if (this.page) {
        const element = await this.page?.findElement(
            locateWith(By.css('.active')).toRightOf(By.xpath("//li[normalize-space()='Home']/a")),
        );
        const data = await element.takeScreenshot();
        await fs.writeFileSync(
            path.join(config.outputDir, 'Element screenshot.png'),
            data,
            'base64',
        );
        console.log(`Value of element is ${await element.getText()}`);
        await this.page.sleep(10000);
    }
});

Given('Hello1', async function (this: ICustomWorld) {
    await this.pageActions?.navigateTo('https://youtube.com');
    await this.PageObjects?.findByName('search_query');
});
