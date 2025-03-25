import { WebDriver, WebElement } from 'selenium-webdriver';
import { BrowserActions } from './browserActions';

export class PageActions {
    private page: WebDriver;
    private browserActions: BrowserActions;

    constructor(page: WebDriver, browserAction: BrowserActions) {
        this.page = page;
        this.browserActions = browserAction;
    }

    async click() {
        await this.browserActions.navigate('https://google.com');
    }
}
