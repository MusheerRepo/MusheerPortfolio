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
import { Ensure } from '../lib/ensure';

setDefaultTimeout(60 * 1000);

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
});

Before(async function (this: ICustomWorld, scenario) {
    this.feature = scenario;
    this.testName = this.feature.pickle.name;
    this.allure = new AllureCucumberTestRuntime();

    //Initializing page
    this.page = await createSeleniumDriver(config.browserName);

    // Initializing logger
    this.logger = new Logger(this, config.logger(this.testName));

    this.logger.log(`Scenario Started: ${this.testName}`);

    // Initalizing page
    this.pageActions = new PageActions(this.page, this.logger);
    this.pageObjects = new PageObjects(this.page, this.logger);
    this.ensure = new Ensure(this.page, this.logger);
});

After(async function (this: ICustomWorld, { result }) {
    try {
        this.getLogger().log(`Scenario Finished: ${this.testName}`);
        // Attaching screenshots on failure
        if (result?.status.toString().toLowerCase() != 'passed') {
            const screenshotBuffer = await this.getPageActions().takeScreenshot(
                `${this.testName}Failure`,
            );
            if (screenshotBuffer) {
                //Attaching to allure
                await this.allure?.attachmentFromPath('Failure screenshot', screenshotBuffer, {
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
        this.getLogger().log(`Error attaching reports: ${String(e)}`, 'error');
    } finally {
        await this.getPage().quit();
    }
});

AfterAll(async function () {
    // Nothing to do here
});
