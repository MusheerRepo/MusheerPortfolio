import { AfterAll, Before, BeforeAll, World } from '@cucumber/cucumber';
import { CustomWorld } from './cucumberWorld';
import { config } from './config';
import * as fs from 'fs';
import * as path from 'path';
import { WebDriver } from 'selenium-webdriver';
import winston from 'winston';
import { createSeleniumDriver } from './utilities';

let logger: winston.Logger;
let page: WebDriver | undefined;

BeforeAll(async function () {
    // Check if the directory exists, create it if it doesn't
    const downloadDir = config.downloadDir;
    const outputDir = config.outputDir;
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
    }

    if (fs.existsSync(outputDir)) {
        // Remove all files inside the directory of previous run
        fs.readdirSync(outputDir).forEach((file) => {
            const filePath = path.join(outputDir, file);
            if (fs.lstatSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            }
        });
    } else {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    //Initializing page
    console.log(process.env?.BROWSER);
    page = await createSeleniumDriver(process.env?.BROWSER || 'Chrome');
});

Before(async function (this: CustomWorld) {
    // Initializing logger
});

AfterAll(async function () {
    await page?.quit();
});
