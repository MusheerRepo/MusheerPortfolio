import { Logger } from './logger';
import { Actions, By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { config } from '../support/config';
import * as path from 'path';
import * as fs from 'fs';

// This class is a base class for all page actions
export class PageActions {
    private page: WebDriver;
    private logger: Logger;

    constructor(page: WebDriver, logger: Logger) {
        this.page = page;
        this.logger = logger;
    }

    // Wait function for page to load
    async waitForPageToLoad() {
        try {
            this.logger.log('Waiting for page to load');
            await this.page.wait(async () => {
                const readyState = await this.page.executeScript('return document.readyState');
                return readyState === 'complete';
            }, config.waitTimeout);
            await this.page.wait(until.elementLocated(By.css('body')));
            this.logger.log('Page loaded successfully');
        } catch (error: any) {
            this.logger.log('Failed to load page: ' + error.message);
            throw error;
        }
    }

    // Navigation Actions
    async navigateTo(url: string): Promise<void> {
        try {
            this.logger.log(`Navigating to URL: ${url}`);
            await this.page.get(url);
            await this.waitForPageToLoad();
            this.logger.log('Navigation successful');
        } catch (error: any) {
            this.logger.log(`Failed to navigate to URL: ${url}, Error: ${error.message}`);
            throw error;
        }
    }

    async getUrl(): Promise<string> {
        try {
            this.logger.log(`Fetching URL`);
            const url = await this.page.getCurrentUrl();
            this.logger.log(`Fetched URL: ${url}`);
            return url;
        } catch (error: any) {
            this.logger.log(`Failed to fetch current url, Error: ${error.message}`);
            throw error;
        }
    }

    async refreshPage(): Promise<void> {
        try {
            this.logger.log('Refreshing the page');
            await this.page.navigate().refresh();
            await this.waitForPageToLoad();
            this.logger.log('Page refreshed successfully');
        } catch (error: any) {
            this.logger.log('Failed to refresh page: ' + error.message);
            throw error;
        }
    }

    async goBack(): Promise<void> {
        try {
            this.logger.log('Navigating back to the previous page');
            await this.page.navigate().back();
            await this.waitForPageToLoad();
            this.logger.log('Navigated back successfully');
        } catch (error: any) {
            this.logger.log('Failed to navigate back: ' + error.message);
            throw error;
        }
    }

    async goForward(): Promise<void> {
        try {
            this.logger.log('Navigating forward to the next page');
            await this.page.navigate().forward();
            await this.waitForPageToLoad();
            this.logger.log('Navigated forward successfully');
        } catch (error: any) {
            this.logger.log('Failed to navigate forward: ' + error.message);
            throw error;
        }
    }

    // Element Interaction Actions
    async clickElement(element: WebElement): Promise<void> {
        try {
            this.logger.log(`Clicking on element: ${element}`);
            await element.click();
            this.logger.log('Element clicked successfully');
        } catch (error: any) {
            this.logger.log(`Failed to click element: ${element}, Error: ${error.message}`);
            throw error;
        }
    }

    async enterText(element: WebElement, text: string): Promise<void> {
        try {
            this.logger.log(`Entering text '${text}' in element: ${element}`);
            await element.clear();
            await element.sendKeys(text);
            this.logger.log('Text entered successfully');
        } catch (error: any) {
            this.logger.log(`Failed to enter text in element: ${element}, Error: ${error.message}`);
            throw error;
        }
    }

    async clearText(element: WebElement): Promise<void> {
        try {
            this.logger.log(`Clearing text from element: ${element}`);
            await element.clear();
            this.logger.log('Text cleared successfully');
        } catch (error: any) {
            this.logger.log(
                `Failed to clear text from element: ${element}, Error: ${error.message}`,
            );
            throw error;
        }
    }

    async getInnerText(element: WebElement): Promise<string> {
        try {
            this.logger.log(`Fetching text of element: ${element}`);
            const text = await element.getText();
            this.logger.log('Text fetched successfully');
            return text;
        } catch (error: any) {
            this.logger.log(
                `Failed to fetch text from element: ${element}, Error: ${error.message}`,
            );
            throw error;
        }
    }

    async getInputValue(element: WebElement): Promise<string> {
        try {
            this.logger.log(`Fetching value of input element: ${element}`);
            const value = await element.getAttribute('value');
            this.logger.log('Input value fetched successfully');
            return value;
        } catch (error: any) {
            this.logger.log(
                `Failed to fetch value from input element: ${element}, Error: ${error.message}`,
            );
            throw error;
        }
    }

    async submitForm(element: WebElement): Promise<void> {
        try {
            this.logger.log(`Submitting form for element: ${element}`);
            await element.submit();
            this.logger.log('Form submitted successfully');
        } catch (error: any) {
            this.logger.log(
                `Failed to submit form for element: ${element}, Error: ${error.message}`,
            );
            throw error;
        }
    }

    // Keyboard & Mouse Actions
    async hoverOverElement(element: WebElement): Promise<void> {
        try {
            this.logger.log(`Hovering over element: ${element}`);
            await new Actions(this.page).move({ origin: element }).perform();
            this.logger.log('Hovered over element successfully');
        } catch (error: any) {
            this.logger.log(`Failed to hover over element: ${element}, Error: ${error.message}`);
            throw error;
        }
    }

    async rightClickElement(element: WebElement): Promise<void> {
        try {
            this.logger.log(`Right-clicking on element: ${element}`);
            await new Actions(this.page).contextClick(element).perform();
            this.logger.log('Right-clicked element successfully');
        } catch (error: any) {
            this.logger.log(`Failed to right-click element: ${element}, Error: ${error.message}`);
            throw error;
        }
    }

    async doubleClickElement(element: WebElement): Promise<void> {
        try {
            this.logger.log(`Double-clicking on element: ${element}`);
            await new Actions(this.page).doubleClick(element).perform();
            this.logger.log('Double-clicked element successfully');
        } catch (error: any) {
            this.logger.log(`Failed to double-click element: ${element}, Error: ${error.message}`);
            throw error;
        }
    }

    async pressKey(key: string): Promise<void> {
        try {
            this.logger.log(`Pressing key: ${key}`);
            await new Actions(this.page).sendKeys(key).perform();
            this.logger.log('Key pressed successfully');
        } catch (error: any) {
            this.logger.log(`Failed to press key: ${key}, Error: ${error.message}`);
            throw error;
        }
    }

    async dragAndDrop(sourceElement: WebElement, targetElement: WebElement): Promise<void> {
        try {
            this.logger.log(`Dragging element from ${sourceElement} to ${targetElement}`);
            await new Actions(this.page).dragAndDrop(sourceElement, targetElement).perform();
            this.logger.log('Drag and drop successful');
        } catch (error: any) {
            this.logger.log(
                `Failed to drag and drop element from ${sourceElement} to ${targetElement}, Error: ${error.message}`,
            );
            throw error;
        }
    }

    // Dropdown Actions
    async selectByVisibleText(element: WebElement, text: string): Promise<void> {
        try {
            this.logger.log(`Selecting '${text}' from dropdown: ${element}`);
            await element.sendKeys(text);
            this.logger.log('Dropdown selection successful');
        } catch (error: any) {
            this.logger.log(
                `Failed to select '${text}' from dropdown: ${element}, Error: ${error.message}`,
            );
            throw error;
        }
    }

    // Window & Alert Handling
    async getWindowHandle(): Promise<string> {
        try {
            this.logger.log(`Fetching window handle`);
            const handle = await this.page.getWindowHandle();
            this.logger.log('Window handle fetched successfully');
            return handle;
        } catch (error: any) {
            this.logger.log('Failed to fetch window handle: ' + error.message);
            throw error;
        }
    }

    async getWindowHandles(): Promise<string[]> {
        try {
            this.logger.log(`Fetching window handles`);
            const handles = await this.page.getAllWindowHandles();
            this.logger.log('Window handles fetched successfully');
            return handles;
        } catch (error: any) {
            this.logger.log('Failed to fetch window handles: ' + error.message);
            throw error;
        }
    }

    async switchToWindow(handle: string): Promise<void> {
        try {
            this.logger.log(`Switching to window: ${handle}`);
            await this.page.switchTo().window(handle);
            this.logger.log('Switched to window successfully');
        } catch (error: any) {
            this.logger.log(`Failed to switch to window: ${handle}, Error: ${error.message}`);
            throw error;
        }
    }

    async switchToNewTab(): Promise<void> {
        try {
            this.logger.log('Switching to new tab');
            const handles = await this.page.getAllWindowHandles();
            await this.page.switchTo().window(handles[handles.length - 1]);
            this.logger.log('Switched to new tab successfully');
        } catch (error: any) {
            this.logger.log('Failed to switch to new tab: ' + error.message);
            throw error;
        }
    }

    async acceptAlert(): Promise<void> {
        try {
            this.logger.log('Accepting alert');
            await this.page.switchTo().alert().accept();
            this.logger.log('Alert accepted successfully');
        } catch (error: any) {
            this.logger.log('Failed to accept alert: ' + error.message);
            throw error;
        }
    }

    async getAlertText(): Promise<string> {
        try {
            this.logger.log('Fetching alert text');
            const text = await this.page.switchTo().alert().getText();
            this.logger.log('Fetched alert text successfully' + text);
            return text;
        } catch (error: any) {
            this.logger.log('Failed to accept alert: ' + error.message);
            throw error;
        }
    }

    async dismissAlert(): Promise<void> {
        try {
            this.logger.log('Dismissing alert');
            await this.page.switchTo().alert().dismiss();
            this.logger.log('Alert dismissed successfully');
        } catch (error: any) {
            this.logger.log('Failed to dismiss alert: ' + error.message);
            throw error;
        }
    }

    async enterAlertText(text: string): Promise<void> {
        try {
            this.logger.log(`Entering text '${text}' in alert`);
            await this.page.switchTo().alert().sendKeys(text);
            this.logger.log('Text entered in alert successfully');
        } catch (error: any) {
            this.logger.log(`Failed to enter text in alert: ${text}, Error: ${error.message}`);
            throw error;
        }
    }

    // Frame Handling
    async switchToFrame(frameLocator: By): Promise<void> {
        try {
            this.logger.log(`Switching to frame: ${frameLocator}`);
            const frame = await this.page.findElement(frameLocator);
            await this.page.switchTo().frame(frame);
            this.logger.log('Switched to frame successfully');
        } catch (error: any) {
            this.logger.log(`Failed to switch to frame: ${frameLocator}, Error: ${error.message}`);
            throw error;
        }
    }

    async switchToDefaultContent(): Promise<void> {
        try {
            this.logger.log('Switching back to the main content');
            await this.page.switchTo().defaultContent();
            this.logger.log('Switched to main content successfully');
        } catch (error: any) {
            this.logger.log('Failed to switch to main content: ' + error.message);
            throw error;
        }
    }

    // JavaScript Execution
    async executeScript(script: string, ...args: any[]): Promise<any> {
        try {
            this.logger.log(`Executing JavaScript: ${script}`);
            const result = await this.page.executeScript(script, ...args);
            this.logger.log('JavaScript executed successfully');
            return result;
        } catch (error: any) {
            this.logger.log(`Failed to execute JavaScript: ${script}, Error: ${error.message}`);
            throw error;
        }
    }

    // Screenshot & Logs
    async takeScreenshot(fileName = 'screenshot', element?: WebElement): Promise<string> {
        try {
            const screenshotDir = config.screenshotDir;
            const filePath = path.join(screenshotDir, `${fileName}.png`);
            this.logger.log('Saving screenshot');
            let data;
            element
                ? (data = await element.takeScreenshot())
                : (data = await this.page?.takeScreenshot());
            fs.writeFileSync(filePath, data, 'base64');
            this.logger.log(`Saved screenshot at path: ${filePath}`);
            return filePath;
        } catch (error: any) {
            this.logger.log('Unable to take screenshot: ' + error.message);
            throw error;
        }
    }

    async getBrowserLogs(): Promise<void> {
        try {
            this.logger.log('Retrieving browser logs');
            const logs = await this.page.manage().logs().get('browser');
            logs.forEach((log) => this.logger.log(log.message));
            this.logger.log('Browser logs retrieved successfully');
        } catch (error: any) {
            this.logger.log('Failed to retrieve browser logs: ' + error.message);
            throw error;
        }
    }

    async closeTab(): Promise<void> {
        try {
            this.logger.log('Closing current tab');
            await this.page.close();
            this.logger.log('Tab closed successfully');
        } catch (error: any) {
            this.logger.log('Failed to close tab: ' + error.message);
            throw error;
        }
    }

    // Element Verification
    async isElementDisplayed(locator: By): Promise<boolean> {
        try {
            this.logger.log(`Checking if element ${locator} is displayed`);
            const element = await this.page.findElement(locator);
            const isDisplayed = await element.isDisplayed();
            this.logger.log(`Element ${locator} is displayed: ${isDisplayed}`);
            return isDisplayed;
        } catch (error: any) {
            this.logger.log(
                `Failed to check if element is displayed: ${locator}, Error: ${error.message}`,
            );
            throw error;
        }
    }

    async isElementEnabled(locator: By): Promise<boolean> {
        try {
            this.logger.log(`Checking if element ${locator} is enabled`);
            const element = await this.page.findElement(locator);
            const isEnabled = await element.isEnabled();
            this.logger.log(`Element ${locator} is enabled: ${isEnabled}`);
            return isEnabled;
        } catch (error: any) {
            this.logger.log(
                `Failed to check if element is enabled: ${locator}, Error: ${error.message}`,
            );
            throw error;
        }
    }

    async isElementSelected(locator: By): Promise<boolean> {
        try {
            this.logger.log(`Checking if element ${locator} is selected`);
            const element = await this.page.findElement(locator);
            const isSelected = await element.isSelected();
            this.logger.log(`Element ${locator} is selected: ${isSelected}`);
            return isSelected;
        } catch (error: any) {
            this.logger.log(
                `Failed to check if element is selected: ${locator}, Error: ${error.message}`,
            );
            throw error;
        }
    }

    // Wait Actions
    async waitForElementVisible(
        locator: By,
        timeout: number = config.waitTimeout,
    ): Promise<WebElement> {
        try {
            this.logger.log(`Waiting for element ${locator} to be visible`);
            const element = await this.page.wait(until.elementLocated(locator), timeout);
            await this.page.wait(until.elementIsVisible(element), timeout);
            this.logger.log(`Element ${locator} is visible`);
            return element;
        } catch (error: any) {
            this.logger.log(
                `Failed to wait for element to be visible: ${locator}, Error: ${error.message}`,
            );
            throw error;
        }
    }

    async waitForElementClickable(
        locator: By,
        timeout: number = config.waitTimeout,
    ): Promise<WebElement> {
        try {
            this.logger.log(`Waiting for element ${locator} to be clickable`);
            const element = await this.page.wait(until.elementLocated(locator), timeout);
            await this.page.wait(until.elementIsEnabled(element), timeout);
            this.logger.log(`Element ${locator} is clickable`);
            return element;
        } catch (error: any) {
            this.logger.log(
                `Failed to wait for element to be clickable: ${locator}, Error: ${error.message}`,
            );
            throw error;
        }
    }

    // Wait for alert to be present
    async waitForAlert(timeout = config.waitTimeout): Promise<void> {
        try {
            this.logger.log('Waiting for alert to be present...');
            await this.page.wait(until.alertIsPresent(), timeout);
            this.logger.log('Alert is present');
        } catch (error: any) {
            this.logger.log(`Failed to wait for alert: ${error.message}`);
            throw error;
        }
    }

    // Wait for frame to be available and switch to it
    async waitForFrameAndSwitch(frameLocator: By, timeout = config.waitTimeout): Promise<void> {
        try {
            this.logger.log(`Waiting for frame ${frameLocator} to be available...`);
            const frame = await this.page.wait(until.ableToSwitchToFrame(frameLocator), timeout);
            await this.page.switchTo().frame(frame);
            this.logger.log(`Switched to frame: ${frameLocator}`);
        } catch (error: any) {
            this.logger.log(`Failed to wait for frame: ${frameLocator}, Error: ${error.message}`);
            throw error;
        }
    }

    async waitForUrl(url: string, timeout = config.waitTimeout): Promise<void> {
        try {
            this.logger.log(`Waiting for url ${url}`);
            await this.page.wait(until.urlIs(url), timeout);
            this.logger.log(`Url is : ${url}`);
        } catch (error: any) {
            this.logger.log(`Failed to wait until url is ${url}, Error: ${error.message}`);
            throw error;
        }
    }

    async waitForElementTextToBe(
        element: WebElement,
        text: string,
        timeout = config.waitTimeout,
    ): Promise<void> {
        try {
            this.logger.log(`Waiting for element text to be ${text}`);
            await this.page.wait(until.elementTextIs(element, text), timeout);
            this.logger.log(`Element text is : ${text}`);
        } catch (error: any) {
            this.logger.log(
                `Failed to wait until element text is ${text}, Error: ${error.message}`,
            );
            throw error;
        }
    }
}
