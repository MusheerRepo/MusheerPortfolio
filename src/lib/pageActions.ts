import { Logger } from './logger';
import { Actions, By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { PageObjects } from './pageObjects';
import { config } from '../support/config';

export class PageActions {
    private page: WebDriver;
    private logger: Logger;
    public pageObjects: PageObjects;

    constructor(page: WebDriver, pageObjects: PageObjects, logger: Logger) {
        this.page = page;
        this.logger = logger;
        this.pageObjects = pageObjects;
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
        this.logger?.log(`Navigating to URL: ${url}`);
        await this.page.get(url);
        this.waitForPageToLoad();
    }

    async refreshPage(): Promise<void> {
        this.logger?.log('Refreshing the page');
        await this.page.navigate().refresh();
        this.waitForPageToLoad();
    }

    async goBack(): Promise<void> {
        this.logger?.log('Navigating back to the previous page');
        await this.page.navigate().back();
        this.waitForPageToLoad();
    }

    async goForward(): Promise<void> {
        this.logger?.log('Navigating forward to the next page');
        await this.page.navigate().forward();
        this.waitForPageToLoad();
    }

    // Element Interaction Actions
    async clickElement(locator: By): Promise<void> {
        this.logger?.log(`Clicking on element: ${locator}`);
        const element = await this.page.findElement(locator);
        await element.click();
    }

    async enterText(locator: By, text: string): Promise<void> {
        this.logger?.log(`Entering text '${text}' in element: ${locator}`);
        const element = await this.page.findElement(locator);
        await element.sendKeys(text);
    }

    async clearText(locator: By): Promise<void> {
        this.logger?.log(`Clearing text from element: ${locator}`);
        const element = await this.page.findElement(locator);
        await element.clear();
    }

    async submitForm(locator: By): Promise<void> {
        this.logger?.log(`Submitting form for element: ${locator}`);
        const element = await this.page.findElement(locator);
        await element.submit();
    }

    // Keyboard & Mouse Actions
    async hoverOverElement(locator: By): Promise<void> {
        this.logger?.log(`Hovering over element: ${locator}`);
        const element = await this.page.findElement(locator);
        await new Actions(this.page).move({ origin: element }).perform();
    }

    async rightClickElement(locator: By): Promise<void> {
        this.logger?.log(`Right-clicking on element: ${locator}`);
        const element = await this.page.findElement(locator);
        await new Actions(this.page).contextClick(element).perform();
    }

    async doubleClickElement(locator: By): Promise<void> {
        this.logger?.log(`Double-clicking on element: ${locator}`);
        const element = await this.page.findElement(locator);
        await new Actions(this.page).doubleClick(element).perform();
    }

    async pressKey(key: string): Promise<void> {
        this.logger?.log(`Pressing key: ${key}`);
        await this.page.actions().sendKeys(key).perform();
    }

    async dragAndDrop(sourceLocator: By, targetLocator: By): Promise<void> {
        this.logger?.log(`Dragging element from ${sourceLocator} to ${targetLocator}`);
        const sourceElement = await this.page.findElement(sourceLocator);
        const targetElement = await this.page.findElement(targetLocator);
        await new Actions(this.page).dragAndDrop(sourceElement, targetElement).perform();
    }

    // Dropdown Actions
    async selectByVisibleText(locator: By, text: string): Promise<void> {
        this.logger?.log(`Selecting '${text}' from dropdown: ${locator}`);
        const element = await this.page.findElement(locator);
        await element.sendKeys(text);
    }

    // Window & Alert Handling
    async switchToWindow(handle: string): Promise<void> {
        this.logger?.log(`Switching to window: ${handle}`);
        await this.page.switchTo().window(handle);
    }

    async acceptAlert(): Promise<void> {
        this.logger?.log('Accepting alert');
        await this.page.switchTo().alert().accept();
    }

    async dismissAlert(): Promise<void> {
        this.logger?.log('Dismissing alert');
        await this.page.switchTo().alert().dismiss();
    }

    async enterAlertText(text: string): Promise<void> {
        this.logger?.log(`Entering text '${text}' in alert`);
        await this.page.switchTo().alert().sendKeys(text);
    }

    // Frame Handling
    async switchToFrame(frameLocator: By): Promise<void> {
        this.logger?.log(`Switching to frame: ${frameLocator}`);
        const frame = await this.page.findElement(frameLocator);
        await this.page.switchTo().frame(frame);
    }

    async switchToDefaultContent(): Promise<void> {
        this.logger?.log('Switching back to the main content');
        await this.page.switchTo().defaultContent();
    }

    // Element Verification
    async isElementDisplayed(locator: By): Promise<boolean> {
        this.logger?.log(`Checking if element ${locator} is displayed`);
        return await this.page.findElement(locator).isDisplayed();
    }

    async isElementEnabled(locator: By): Promise<boolean> {
        this.logger?.log(`Checking if element ${locator} is enabled`);
        return await this.page.findElement(locator).isEnabled();
    }

    async isElementSelected(locator: By): Promise<boolean> {
        this.logger?.log(`Checking if element ${locator} is selected`);
        return await this.page.findElement(locator).isSelected();
    }

    // Wait Actions
    async waitForElementVisible(locator: By, timeout: number = 5000): Promise<WebElement> {
        this.logger?.log(`Waiting for element ${locator} to be visible`);
        return await this.page.wait(until.elementLocated(locator), timeout);
    }

    async waitForElementClickable(locator: By, timeout: number = 5000): Promise<WebElement> {
        this.logger?.log(`Waiting for element ${locator} to be clickable`);
        return await this.page.wait(
            until.elementIsVisible(await this.page.findElement(locator)),
            timeout,
        );
    }

    // JavaScript Execution
    async executeScript(script: string, ...args: any[]): Promise<any> {
        this.logger?.log(`Executing JavaScript: ${script}`);
        return await this.page.executeScript(script, ...args);
    }

    // Screenshot & Logs
    async takeScreenshot(filename = 'screenshot'): Promise<void> {
        this.logger?.log(`Saving screenshot: ${filename}`);
        const image = await this.page.takeScreenshot();
        require('fs').writeFileSync(filename, image, 'base64');
    }

    async getBrowserLogs(): Promise<void> {
        this.logger?.log('Retrieving browser logs');
        const logs = await this.page.manage().logs().get('browser');
        logs.forEach((log) => this.logger?.log(log.message));
    }
}
