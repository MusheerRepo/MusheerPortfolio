import { Logger } from './logger';
import { Actions, By, WebDriver, WebElement } from 'selenium-webdriver';
import { config } from '../support/config';
import * as path from 'path';
import * as fs from 'fs';

export class PageActions {
    private page: WebDriver;
    private logger: Logger;

    constructor(page: WebDriver, logger: Logger) {
        this.page = page;
        this.logger = logger;
    }

    //Wait function for page to load
    async waitForPageToLoad() {
        this.logger.log('Waiting for page to load');
        await this.page.wait(async () => {
            const readyState = await this.page.executeScript('return document.readyState');
            return readyState === 'complete';
        }, config.waitTimeout);
        this.logger.log('Page loaded');
    }

    // Navigation Actions
    async navigateTo(url: string): Promise<void> {
        this.logger.log(`Navigating to URL: ${url}`);
        await this.page.get(url);
        await this.waitForPageToLoad();
    }

    async refreshPage(): Promise<void> {
        this.logger?.log('Refreshing the page');
        await this.page.navigate().refresh();
        await this.waitForPageToLoad();
    }

    async goBack(): Promise<void> {
        this.logger.log('Navigating back to the previous page');
        await this.page.navigate().back();
        await this.waitForPageToLoad();
    }

    async goForward(): Promise<void> {
        this.logger.log('Navigating forward to the next page');
        await this.page.navigate().forward();
        await this.waitForPageToLoad();
    }

    // Element Interaction Actions
    async clickElement(element: WebElement): Promise<void> {
        this.logger.log(`Clicking on element: ${element}`);
        await element.click();
    }

    async enterText(element: WebElement, text: string): Promise<void> {
        this.logger.log(`Entering text '${text}' in element: ${element}`);
        await element.sendKeys(text);
    }

    async clearText(element: WebElement): Promise<void> {
        this.logger.log(`Clearing text from element: ${element}`);
        await element.clear();
    }

    async submitForm(element: WebElement): Promise<void> {
        this.logger.log(`Submitting form for element: ${element}`);
        await element.submit();
    }

    // Keyboard & Mouse Actions
    async hoverOverElement(element: WebElement): Promise<void> {
        this.logger.log(`Hovering over element: ${element}`);
        await new Actions(this.page).move({ origin: element }).perform();
    }

    async rightClickElement(element: WebElement): Promise<void> {
        this.logger.log(`Right-clicking on element: ${element}`);
        await new Actions(this.page).contextClick(element).perform();
    }

    async doubleClickElement(element: WebElement): Promise<void> {
        this.logger.log(`Double-clicking on element: ${element}`);
        await new Actions(this.page).doubleClick(element).perform();
    }

    async pressKey(key: string): Promise<void> {
        this.logger.log(`Pressing key: ${key}`);
        await this.page.actions().sendKeys(key).perform();
    }

    async dragAndDrop(sourceElement: WebElement, targetElement: WebElement): Promise<void> {
        this.logger.log(`Dragging element from ${sourceElement} to ${targetElement}`);
        await new Actions(this.page).dragAndDrop(sourceElement, targetElement).perform();
    }

    // Dropdown Actions
    async selectByVisibleText(element: WebElement, text: string): Promise<void> {
        this.logger.log(`Selecting '${text}' from dropdown: ${element}`);
        await element.sendKeys(text);
    }

    // Window & Alert Handling
    async getWindowHandle(): Promise<string> {
        this.logger.log(`Fetching window handle`);
        return await this.page.getWindowHandle();
    }

    async getWindowHandles(): Promise<string[]> {
        this.logger.log(`Fetching window handles`);
        return await this.page.getAllWindowHandles();
    }

    async switchToWindow(handle: string): Promise<void> {
        this.logger.log(`Switching to window: ${handle}`);
        await this.page.switchTo().window(handle);
    }

    async acceptAlert(): Promise<void> {
        this.logger.log('Accepting alert');
        await this.page.switchTo().alert().accept();
    }

    async dismissAlert(): Promise<void> {
        this.logger.log('Dismissing alert');
        await this.page.switchTo().alert().dismiss();
    }

    async enterAlertText(text: string): Promise<void> {
        this.logger.log(`Entering text '${text}' in alert`);
        await this.page.switchTo().alert().sendKeys(text);
    }

    // Frame Handling
    async switchToFrame(frameLocator: By): Promise<void> {
        this.logger.log(`Switching to frame: ${frameLocator}`);
        const frame = await this.page.findElement(frameLocator);
        await this.page.switchTo().frame(frame);
    }

    async switchToDefaultContent(): Promise<void> {
        this.logger.log('Switching back to the main content');
        await this.page.switchTo().defaultContent();
    }

    // JavaScript Execution
    async executeScript(script: string, ...args: any[]): Promise<any> {
        this.logger.log(`Executing JavaScript: ${script}`);
        return await this.page.executeScript(script, ...args);
    }

    // Screenshot & Logs
    async takeScreenshot(fileName = 'screenshot'): Promise<string> {
        const screenshotDir = config.screenshotDir;
        const filePath = path.join(screenshotDir, `${fileName}.png`);
        this.logger.log('Saving screenshot');
        const data = await this.page?.takeScreenshot();
        fs.writeFileSync(filePath, data, 'base64');
        this.logger.log(`Saved screenshot at path: ${filePath}`);
        return filePath;
    }

    async getBrowserLogs(): Promise<void> {
        this.logger.log('Retrieving browser logs');
        const logs = await this.page.manage().logs().get('browser');
        logs.forEach((log) => this.logger.log(log.message));
    }
}
