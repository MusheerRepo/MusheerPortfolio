import { WebDriver } from 'selenium-webdriver';

export class BrowserActions {
  private page: WebDriver;

  constructor(page: WebDriver) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.get(url);
  }
}
