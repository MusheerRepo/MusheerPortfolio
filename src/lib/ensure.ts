import { Logger } from './logger';
import { WebDriver, WebElement } from 'selenium-webdriver';
import { AssertionError } from 'assert';

// This class is a base class for all assertion operations
export class Ensure {
    private page: WebDriver;
    private logger: Logger;

    constructor(page: WebDriver, logger: Logger) {
        this.page = page;
        this.logger = logger;
    }

    async isTrue(condition: boolean, message: string = 'Condition is not true'): Promise<void> {
        this.logger.log(`Ensuring condition is true: ${condition}`);
        if (!condition) {
            this.logger.log(`Assertion failed: ${message}`, 'error');
            throw new AssertionError({ message: message });
        }
        this.logger.log(`Condition is true`);
    }

    async isFalse(condition: boolean, message: string = 'Condition is not false'): Promise<void> {
        this.logger.log(`Ensuring condition is false: ${condition}`);
        if (condition) {
            this.logger.log(`Assertion failed: ${message}`, 'error');
            throw new AssertionError({ message: message });
        }
        this.logger.log(`Condition is false`);
    }

    async areEqual<T>(
        actual: T,
        expected: T,
        message: string = `Values are not equal. Expected: ${expected}, Actual: ${actual}`,
    ): Promise<void> {
        this.logger.log(`Ensuring values are equal. Expected: ${expected}, Actual: ${actual}`);
        if (actual !== expected) {
            this.logger.log(`Assertion failed: ${message}`, 'error');
            throw new AssertionError({ message: message });
        }
        this.logger.log(`Values are equal`);
    }

    async areNotEqual<T>(
        actual: T,
        expected: T,
        message: string = `Values are equal but should not be. Value: ${actual}`,
    ): Promise<void> {
        this.logger.log(`Ensuring values are not equal. Expected: ${expected}, Actual: ${actual}`);
        if (actual === expected) {
            this.logger.log(`Assertion failed: ${message}`, 'error');
            throw new AssertionError({ message: message });
        }
        this.logger.log(`Values are not equal`);
    }

    async stringContains(
        actual: string,
        expectedSubstring: string,
        message: string = `String does not contain substring. String: ${actual}, Substring: ${expectedSubstring}`,
    ): Promise<void> {
        this.logger.log(
            `Ensuring string contains substring. String: ${actual}, Substring: ${expectedSubstring}`,
        );
        if (!actual.includes(expectedSubstring)) {
            this.logger.log(`Assertion failed: ${message}`, 'error');
            throw new AssertionError({ message: message });
        }
        this.logger.log(`String contains substring`);
    }

    async stringStartsWith(
        actual: string,
        expectedStart: string,
        message: string = `String does not start with expected substring. String: ${actual}, Expected start: ${expectedStart}`,
    ): Promise<void> {
        this.logger.log(
            `Ensuring string starts with substring. String: ${actual}, Substring: ${expectedStart}`,
        );
        if (!actual.startsWith(expectedStart)) {
            this.logger.log(`Assertion failed: ${message}`, 'error');
            throw new AssertionError({ message: message });
        }
        this.logger.log(`String starts with substring`);
    }

    async stringEndsWith(
        actual: string,
        expectedEnd: string,
        message: string = `String does not end with expected substring. String: ${actual}, Expected end: ${expectedEnd}`,
    ): Promise<void> {
        this.logger.log(
            `Ensuring string ends with substring. String: ${actual}, Substring: ${expectedEnd}`,
        );
        if (!actual.endsWith(expectedEnd)) {
            this.logger.log(`Assertion failed: ${message}`, 'error');
            throw new AssertionError({ message: message });
        }
        this.logger.log(`String ends with substring`);
    }

    async elementIsDisplayed(
        element: WebElement,
        message: string = 'Element is not displayed',
    ): Promise<void> {
        this.logger.log(`Ensuring element is displayed: ${element}`);
        try {
            const isDisplayed = await element.isDisplayed();
            if (!isDisplayed) {
                this.logger.log(`Assertion failed: ${message}`, 'error');
                throw new AssertionError({ message: message });
            }
            this.logger.log(`Element is displayed`);
        } catch (error: any) {
            this.logger.log(`Error during elementIsDisplayed check: ${error.message}`, 'error');
            throw new AssertionError({
                message: `Error while checking if element is displayed: ${error.message}`,
            });
        }
    }

    async elementIsNotDisplayed(
        element: WebElement,
        message: string = 'Element is displayed but should not be',
    ): Promise<void> {
        this.logger.log(`Ensuring element is not displayed: ${element}`);
        try {
            const isDisplayed = await element.isDisplayed();
            if (isDisplayed) {
                this.logger.log(`Assertion failed: ${message}`, 'error');
                throw new AssertionError({ message: message });
            }
            this.logger.log(`Element is not displayed`);
        } catch (error: any) {
            this.logger.log(`Element is not displayed (likely not found): ${error.message}`);
        }
    }

    async elementIsEnabled(
        element: WebElement,
        message: string = 'Element is not enabled',
    ): Promise<void> {
        this.logger.log(`Ensuring element is enabled: ${element}`);
        try {
            const isEnabled = await element.isEnabled();
            if (!isEnabled) {
                this.logger.log(`Assertion failed: ${message}`, 'error');
                throw new AssertionError({ message: message });
            }
            this.logger.log(`Element is enabled`);
        } catch (error: any) {
            this.logger.log(`Error during elementIsEnabled check: ${error.message}`, 'error');
            throw new AssertionError({
                message: `Error while checking if element is enabled: ${error.message}`,
            });
        }
    }

    async elementIsDisabled(
        element: WebElement,
        message: string = 'Element is enabled but should not be',
    ): Promise<void> {
        this.logger.log(`Ensuring element is disabled: ${element}`);
        try {
            const isEnabled = await element.isEnabled();
            if (isEnabled) {
                this.logger.log(`Assertion failed: ${message}`, 'error');
                throw new AssertionError({ message: message });
            }
            this.logger.log(`Element is disabled`);
        } catch (error: any) {
            this.logger.log(`Error during elementIsDisabled check: ${error.message}`, 'error');
            throw new AssertionError({
                message: `Error while checking if element is disabled: ${error.message}`,
            });
        }
    }

    async elementIsSelected(
        element: WebElement,
        message: string = 'Element is not selected',
    ): Promise<void> {
        this.logger.log(`Ensuring element is selected: ${element}`);
        try {
            const isSelected = await element.isSelected();
            if (!isSelected) {
                this.logger.log(`Assertion failed: ${message}`, 'error');
                throw new AssertionError({ message: message });
            }
            this.logger.log(`Element is selected`);
        } catch (error: any) {
            this.logger.log(`Error during elementIsSelected check: ${error.message}`, 'error');
            throw new AssertionError({
                message: `Error while checking if element is selected: ${error.message}`,
            });
        }
    }

    async elementIsNotSelected(
        element: WebElement,
        message: string = 'Element is selected but should not be',
    ): Promise<void> {
        this.logger.log(`Ensuring element is not selected: ${element}`);
        try {
            const isSelected = await element.isSelected();
            if (isSelected) {
                this.logger.log(`Assertion failed: ${message}`, 'error');
                throw new AssertionError({ message: message });
            }
            this.logger.log(`Element is not selected`);
        } catch (error: any) {
            this.logger.log(`Error during elementIsNotSelected check: ${error.message}`, 'error');
            throw new AssertionError({
                message: `Error while checking if element is not selected: ${error.message}`,
            });
        }
    }

    async elementHasText(
        element: WebElement,
        expectedText: string,
        message: string = `Element text does not match expected text. Expected: ${expectedText}`,
    ): Promise<void> {
        this.logger.log(`Ensuring element text matches expected text. Expected: ${expectedText}`);
        try {
            const actualText = await element.getText();
            if (actualText !== expectedText) {
                this.logger.log(`Assertion failed: ${message}, Actual: ${actualText}`, 'error');
                throw new AssertionError({ message: `${message}, Actual: ${actualText}` });
            }
            this.logger.log(`Element text matches expected text`);
        } catch (error: any) {
            this.logger.log(`Error during elementHasText check: ${error.message}`, 'error');
            throw new AssertionError({
                message: `Error while checking element text: ${error.message}`,
            });
        }
    }

    async elementDoesNotHaveText(
        element: WebElement,
        unexpectedText: string,
        message: string = `Element text matches unexpected text. Text: ${unexpectedText}`,
    ): Promise<void> {
        this.logger.log(`Ensuring element text does not match unexpected text: ${unexpectedText}`);
        try {
            const actualText = await element.getText();
            if (actualText === unexpectedText) {
                this.logger.log(`Assertion failed: ${message}`, 'error');
                throw new AssertionError({ message: `${message}, Actual: ${actualText}` });
            }
            this.logger.log(`Element text does not match unexpected text`);
        } catch (error: any) {
            this.logger.log(`Error during elementDoesNotHaveText check: ${error.message}`, 'error');
            throw new AssertionError({
                message: `Error while checking if element text does not match: ${error.message}`,
            });
        }
    }

    async elementHasAttributeValue(
        element: WebElement,
        attributeName: string,
        expectedValue: string,
        message: string = `Element attribute does not match expected value. Attribute: ${attributeName}, Expected: ${expectedValue}`,
    ): Promise<void> {
        this.logger.log(
            `Ensuring element attribute matches expected value. Attribute: ${attributeName}, Expected: ${expectedValue}`,
        );
        try {
            const actualValue = await element.getAttribute(attributeName);
            if (actualValue !== expectedValue) {
                this.logger.log(`Assertion failed: ${message}, Actual: ${actualValue}`, 'error');
                throw new AssertionError({ message: `${message}, Actual: ${actualValue}` });
            }
            this.logger.log(`Element attribute matches expected value`);
        } catch (error: any) {
            this.logger.log(
                `Error during elementHasAttributeValue check: ${error.message}`,
                'error',
            );
            throw new AssertionError({
                message: `Error while checking element attribute: ${error.message}`,
            });
        }
    }

    async elementDoesNotHaveAttributeValue(
        element: WebElement,
        attributeName: string,
        unexpectedValue: string,
        message: string = `Element attribute matches unexpected value. Attribute: ${attributeName}, Value: ${unexpectedValue}`,
    ): Promise<void> {
        this.logger.log(
            `Ensuring element attribute does not match unexpected value. Attribute: ${attributeName}, Value: ${unexpectedValue}`,
        );
        try {
            const actualValue = await element.getAttribute(attributeName);
            if (actualValue === unexpectedValue) {
                this.logger.log(`Assertion failed: ${message}`, 'error');
                throw new AssertionError({ message: `${message}, Actual: ${actualValue}` });
            }
            this.logger.log(`Element attribute does not match unexpected value`);
        } catch (error: any) {
            this.logger.log(
                `Error during elementDoesNotHaveAttributeValue check: ${error.message}`,
                'error',
            );
            throw new AssertionError({
                message: `Error while checking element attribute: ${error.message}`,
            });
        }
    }

    async urlIs(
        expectedUrl: string,
        message: string = `URL does not match expected URL. Expected: ${expectedUrl}`,
    ): Promise<void> {
        this.logger.log(`Ensuring URL matches expected URL: ${expectedUrl}`);
        try {
            const actualUrl = await this.page.getCurrentUrl();
            if (actualUrl !== expectedUrl) {
                this.logger.log(`Assertion failed: ${message}, Actual: ${actualUrl}`, 'error');
                throw new AssertionError({ message: `${message}, Actual: ${actualUrl}` });
            }
            this.logger.log(`URL matches expected URL`);
        } catch (error: any) {
            this.logger.log(`Error during urlIs check: ${error.message}`, 'error');
            throw new AssertionError({ message: `Error while checking the URL: ${error.message}` });
        }
    }

    async urlContains(
        expectedUrl: string,
        message: string = `URL does not contain expected URL. Expected: ${expectedUrl}`,
    ): Promise<void> {
        this.logger.log(`Ensuring URL contains expected URL: ${expectedUrl}`);
        try {
            const actualUrl = await this.page.getCurrentUrl();
            if (!actualUrl.includes(expectedUrl)) {
                this.logger.log(`Assertion failed: ${message}, Actual: ${actualUrl}`, 'error');
                throw new AssertionError({ message: `${message}, Actual: ${actualUrl}` });
            }
            this.logger.log(`URL contains expected URL`);
        } catch (error: any) {
            this.logger.log(`Error during urlIs check: ${error.message}`, 'error');
            throw new AssertionError({ message: `Error while checking the URL: ${error.message}` });
        }
    }

    async urlIsNot(
        unexpectedUrl: string,
        message: string = `URL matches unexpected URL. Expected: ${unexpectedUrl}`,
    ): Promise<void> {
        this.logger.log(`Ensuring URL is not equal to expected URL: ${unexpectedUrl}`);
        try {
            const actualUrl = await this.page.getCurrentUrl();
            if (actualUrl === unexpectedUrl) {
                this.logger.log(`Assertion failed: ${message}, Actual: ${actualUrl}`, 'error');
                throw new AssertionError({ message: `${message}, Actual: ${actualUrl}` });
            }
            this.logger.log(`URL is not equal to expected URL`);
        } catch (error: any) {
            this.logger.log(`Error during urlIs check: ${error.message}`, 'error');
            throw new AssertionError({ message: `Error while checking the URL: ${error.message}` });
        }
    }
}
