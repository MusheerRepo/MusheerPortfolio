import { Browser, Builder, WebDriver } from 'selenium-webdriver';
import { config } from './config';
import * as path from 'path';
import * as fs from 'fs';
import { Logger } from '../lib/logger';

export async function createSeleniumDriver(browser: string): Promise<WebDriver> {
    let page: WebDriver;
    if (browser.toLowerCase() == 'chrome') {
        page = new Builder()
            .forBrowser(Browser.CHROME)
            .setChromeOptions(config.chromeOptions())
            .build();
    } else {
        page = new Builder()
            .forBrowser(Browser.FIREFOX)
            .setFirefoxOptions(config.firefoxOptions())
            .build();
    }

    await page.manage().setTimeouts({
        implicit: config.implicit,
        pageLoad: config.pageLoad,
        script: config.script,
    });

    return page;
}
