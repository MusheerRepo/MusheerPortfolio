import {
    World,
    IWorldOptions,
    setWorldConstructor,
    ITestCaseHookParameter,
} from '@cucumber/cucumber';
import { WebDriver } from 'selenium-webdriver';
import { BrowserActions } from '../lib/browserActions';
import { PageActions } from '../lib/pageActions';
import { Logger } from '../lib/logger';
import { AllureCucumberTestRuntime } from 'allure-cucumberjs';

export interface ICustomWorld extends World {
    page?: WebDriver;
    pageActions?: PageActions;
    browserActions?: BrowserActions;
    logger?: Logger;
    testName?: string;
    feature?: ITestCaseHookParameter;
    allure?: AllureCucumberTestRuntime;
}

export class CustomWorld extends World implements ICustomWorld {
    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);
