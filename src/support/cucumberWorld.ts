import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { WebDriver } from 'selenium-webdriver';
import { BrowserActions } from '../lib/browserActions';
import { PageActions } from '../lib/pageActions';
import { Logger } from '../lib/logger';

export interface ICustomWorld extends World {
    page?: WebDriver;
    pageActions?: PageActions;
    browserActions?: BrowserActions;
    logger?: Logger;
}

export class CustomWorld extends World implements ICustomWorld {
    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);
