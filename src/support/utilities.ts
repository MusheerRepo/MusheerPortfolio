import { Browser, Builder, WebDriver } from 'selenium-webdriver';
import * as fs from 'fs';
import { config } from './config';
import * as XLSX from 'xlsx';

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

export function readData(path: string) {
    const fileBuffer = fs.readFileSync(path);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    return jsonData as string[][];
}
