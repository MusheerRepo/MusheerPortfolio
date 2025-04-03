import { config } from '../support/config';
import { Logger } from './logger';
import { By, Locator, WebDriver, WebElement, until } from 'selenium-webdriver';

// This class is a base class for all querying operations
export class PageObjects {
    private page: WebDriver;
    private logger: Logger;

    constructor(page: WebDriver, logger: Logger) {
        this.page = page;
        this.logger = logger;
    }

    // Waiting for element to be stable, attached and visible
    async waitForElement(
        locator: Locator,
        defaultTimeout = config.waitTimeout,
    ): Promise<WebElement> {
        this.logger.log('Waiting for the page and elements to fully load...');
        try {
            // Waiting for page to load
            await this.page.wait(async () => {
                const readyState = await this.page.executeScript('return document.readyState');
                return readyState === 'complete';
            }, defaultTimeout);

            // Waiting for element to be located
            const element = await this.page.wait(until.elementLocated(locator), defaultTimeout);

            // Waiting for element to be visible
            await this.page.wait(until.elementIsVisible(element), defaultTimeout);

            // Waiting for element to be stable
            let previousLocation = await element.getRect();
            await this.page.wait(async () => {
                const currentLocation = await element.getRect();
                const isStable =
                    JSON.stringify(previousLocation) === JSON.stringify(currentLocation);
                previousLocation = currentLocation;
                return isStable;
            }, defaultTimeout);
            return element;
        } catch (e) {
            this.logger.log(`Error while waiting for element: ${e}`, 'error');
            throw new Error(`Failed to wait for element: ${locator}`);
        }
    }

    // Find element by ID with proper waiting
    async findById(id: string): Promise<WebElement> {
        const element = await this.waitForElement(By.id(id));
        this.logger.log(`Element found by ID: ${id}`);
        return element;
    }

    // Find element by Name
    async findByName(name: string): Promise<WebElement> {
        const element = await this.waitForElement(By.name(name));
        this.logger.log(`Element found by Name: ${name}`);
        return element;
    }

    // Find element by Class Name
    async findByClassName(className: string): Promise<WebElement> {
        const element = await this.waitForElement(By.className(className));
        this.logger.log(`Element found by Class Name: ${className}`);
        return element;
    }

    // Find element by CSS Selector
    async findByCss(cssSelector: string): Promise<WebElement> {
        const element = await this.waitForElement(By.css(cssSelector));
        this.logger.log(`Element found by CSS Selector: ${cssSelector}`);
        return element;
    }

    // Find element by XPath
    async findByXPath(xpath: string): Promise<WebElement> {
        const element = await this.waitForElement(By.xpath(xpath));
        this.logger.log(`Element found by XPath: ${xpath}`);
        return element;
    }

    // Find element by Link Text
    async findByLinkText(linkText: string): Promise<WebElement> {
        const element = await this.waitForElement(By.linkText(linkText));
        this.logger.log(`Element found by Link Text: ${linkText}`);
        return element;
    }

    // Find element by Partial Link Text
    async findByPartialLinkText(partialText: string): Promise<WebElement> {
        const element = await this.waitForElement(By.partialLinkText(partialText));
        this.logger.log(`Element found by Partial Link Text: ${partialText}`);
        return element;
    }

    // Find all matching elements by CSS Selector
    async findAllByCss(cssSelector: string): Promise<WebElement[]> {
        await this.waitForElement(By.css(cssSelector));
        this.logger.log(`Found all elements by CSS Selector: ${cssSelector}`);
        return await this.page.findElements(By.css(cssSelector));
    }

    // Find all matching elements by XPath
    async findAllByXPath(xpath: string): Promise<WebElement[]> {
        await this.waitForElement(By.xpath(xpath));
        this.logger.log(`Found all elements by XPath: ${xpath}`);
        return await this.page.findElements(By.xpath(xpath));
    }

    // Element Verification
    async isElementDisplayed(locator: By): Promise<boolean> {
        this.logger.log(`Checking if element ${locator} is displayed`);
        return await this.page.findElement(locator).isDisplayed();
    }

    async isElementEnabled(locator: By): Promise<boolean> {
        this.logger.log(`Checking if element ${locator} is enabled`);
        return await this.page.findElement(locator).isEnabled();
    }

    async isElementSelected(locator: By): Promise<boolean> {
        this.logger.log(`Checking if element ${locator} is selected`);
        return await this.page.findElement(locator).isSelected();
    }

    // Wait Actions
    async waitForElementVisible(locator: By, timeout: number = 5000): Promise<WebElement> {
        this.logger.log(`Waiting for element ${locator} to be visible`);
        return await this.page.wait(until.elementLocated(locator), timeout);
    }

    async waitForElementClickable(locator: By, timeout: number = 5000): Promise<WebElement> {
        this.logger.log(`Waiting for element ${locator} to be clickable`);
        return await this.page.wait(
            until.elementIsVisible(await this.page.findElement(locator)),
            timeout,
        );
    }
}
