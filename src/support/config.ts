import * as chrome from 'selenium-webdriver/chrome';
import * as firefox from 'selenium-webdriver/firefox';
import winston from 'winston';
import * as path from 'path';

let downloadDir = path.join(process.cwd(), '/tmp/downloads');
let outputDir = path.join(process.cwd(), 'outputDir');
let logsDir = `${outputDir}/logs`;

export const config = {
    //browser config
    browserName: process.env?.BROWSER || 'Chrome',
    implicit: 10000,
    pageLoad: 30000,
    script: 30000,

    //directory config
    downloadDir: downloadDir,
    outputDir: outputDir,
    screenshotDir: `${outputDir}/screenshots`,
    logsDir: logsDir,
    allureResults: path.join(process.cwd(), 'allure-results'),
    allureReports: path.join(process.cwd(), 'allure-reports'),

    // browser option instance
    chrome: () => {
        const options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--start-maximized');
        options.setUserPreferences({
            'download.default_directory': downloadDir,
            'download.prompt_for_download': false,
            'download.directory_upgrade': true,
            'safebrowsing.enabled': true,
        });

        return options;
    },
    firefox: () => {
        const options = new firefox.Options();
        //options.addArguments('--headless');
        options.setPreference('browser.download.folderList', 2);
        options.setPreference('browser.download.dir', downloadDir);
        options.setPreference(
            'browser.helperApps.neverAsk.saveToDisk',
            'application/pdf,application/octet-stream',
        );
        options.setPreference('pdfjs.disabled', true);

        return options;
    },

    //Logger
    logger: (fileName: string, level = 'info') => {
        // Define the log file path (relative to your project root)
        const logFilePath = `${logsDir}/${fileName}.log`;

        // Configure Winston logger
        const logger = winston.createLogger({
            level: level,
            format: winston.format.combine(
                // Use combine for multiple formats
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss', // Customize the timestamp format
                }),
                winston.format.errors({ stack: true }), // Capture stack traces
                winston.format.splat(), // Properly format string interpolation
                winston.format.json(), // Log as JSON (good for file)
                winston.format.printf(({ timestamp, level, message, stack }) => {
                    return `${timestamp} ${level}: ${message} ${stack ? `\n${stack}` : ''}`;
                }),
            ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(), // Colorize console output
                        winston.format.printf(({ timestamp, level, message, stack }) => {
                            return `${timestamp} ${level}: ${message} ${stack ? `\n${stack}` : ''}`;
                        }),
                    ),
                }),
                new winston.transports.File({
                    filename: logFilePath, // Use the defined file path
                }),
            ],
            exceptionHandlers: [
                new winston.transports.File({ filename: 'exceptions.log' }), //Handle exceptions in separate file
            ],
            exitOnError: false, // Do not exit on exception
        });
        return logger;
    },
};
