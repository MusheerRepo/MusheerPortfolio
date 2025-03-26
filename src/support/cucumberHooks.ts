import { After, AfterAll, Before, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { ICustomWorld } from './cucumberWorld';
import { config } from './config';
import * as fs from 'fs';
import * as path from 'path';
import { WebDriver } from 'selenium-webdriver';
import { createSeleniumDriver } from './utilities';
import { PageObjects } from '../lib/pageObjects';
import { PageActions } from '../lib/pageActions';
import { Logger } from '../lib/logger';
import { AllureCucumberTestRuntime } from 'allure-cucumberjs';

let logger: Logger;
let page: WebDriver;

setDefaultTimeout(10 * 1000);

BeforeAll(async function () {
    // Check if the directory exists, create it if it doesn't
    const directories = [
        config.downloadDir,
        config.outputDir,
        config.logsDir,
        config.screenshotDir,
        config.allureResults,
        config.allureReports,
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
    page = await createSeleniumDriver(config.browserName);
});

Before(async function (this: ICustomWorld, scenario) {
    this.feature = scenario;
    this.testName = this.feature.pickle.name;
    this.allure = new AllureCucumberTestRuntime();

    // Initializing logger
    logger = new Logger(this, config.logger(this.testName));
    this.logger = logger;

    this.logger?.log(`Scenario Started: ${this.testName}`);

    // Initalizing page
    this.page = page;
    this.PageObjects = new PageObjects(page, this.logger);
    this.pageActions = new PageActions(page, this.logger);
});

After(async function (this: ICustomWorld) {
    try {
        this.logger?.log(`Scenario Finished: ${this.testName}`);
        // Attaching screenshots on failure
        if (this.feature?.result?.status?.toString().toLowerCase() != 'passed') {
            const screenshotPath = await this.pageActions?.takeScreenshot(
                `${this.testName}Failure`,
            );
            if (screenshotPath) {
                await this.allure?.attachmentFromPath('Failure screenshot', screenshotPath, {
                    contentType: 'image/png',
                    fileExtension: '.png',
                });
            }
        }

        // Attaching in execution screenshots
        const screenshotPath = path.join(config.screenshotDir, `${this.testName}.png`);
        if (fs.existsSync(screenshotPath)) {
            const screenshotBuffer = await fs.promises.readFile(screenshotPath);

            await this.allure?.attachment('Screenshot', screenshotBuffer, {
                contentType: 'image/png',
                fileExtension: '.png',
            });
        }

        // Attach Logs
        const logFilePath = path.join(config.logsDir, `${this.testName}.log`);
        if (fs.existsSync(logFilePath)) {
            const logContent = await fs.promises.readFile(logFilePath, 'utf-8');
            await this.allure?.attachment('Logs', logContent, {
                contentType: 'text/plain',
                fileExtension: '.log',
            });
        }
    } catch (e) {
        this.logger?.log(`Error attaching reports: ${String(e)}`, 'error');
    }
});

AfterAll(async function () {
    await page?.quit();
});
