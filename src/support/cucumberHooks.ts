import { AfterAll, Before, BeforeAll, World } from '@cucumber/cucumber';
import { CustomWorld, ICustomWorld } from './cucumberWorld';
import { config } from './config';
import * as fs from 'fs';
import * as path from 'path';
import { WebDriver } from 'selenium-webdriver';
import { createSeleniumDriver } from './utilities';
import { BrowserActions } from '../lib/browserActions';
import { PageActions } from '../lib/pageActions';
import { Logger } from '../lib/logger';

let logger: Logger;
let page: WebDriver;

BeforeAll(async function () {
    // Check if the directory exists, create it if it doesn't
    const directories = [
        config.downloadDir,
        config.outputDir,
        config.logsDir,
        config.screenshotDir,
    ];

    directories.forEach((directory) => {
        if (fs.existsSync(directory)) {
            // Remove all files inside the directory of previous run
            fs.readdirSync(directory).forEach((file) => {
                const filePath = path.join(directory, file);
                if (fs.lstatSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                }
            });
        } else {
            fs.mkdirSync(directory, { recursive: true });
        }
    });

    //Initializing page
    page = createSeleniumDriver(process.env?.BROWSER || 'Chrome');
});

Before(async function (this: ICustomWorld, scenarioResult) {
    // Initalizing page
    this.page = page;
    this.browserActions = new BrowserActions(page);
    this.pageActions = new PageActions(page, this.browserActions);
    this.testName = scenarioResult.result?.status?.toString() || 'H;;';

    // Initializing logger
    logger = new Logger(this, config.logger(this.testName));
    this.logger = logger;
});

AfterAll(async function () {
    await page?.quit();
});
