import {
    World,
    IWorldOptions,
    setWorldConstructor,
    ITestCaseHookParameter,
    ITestStepHookParameter,
} from '@cucumber/cucumber';
import { WebDriver } from 'selenium-webdriver';
import { PageObjects } from '../lib/pageObjects';
import { PageActions } from '../lib/pageActions';
import { Logger } from '../lib/logger';
import { AllureCucumberTestRuntime } from 'allure-cucumberjs';
import { Ensure } from '../lib/ensure';
import { HomePage } from '../pageObjects/homePage';

export interface ICustomWorld extends World {
    page?: WebDriver;
    pageActions?: PageActions;
    pageObjects?: PageObjects;
    logger?: Logger;
    testName?: string;
    feature?: ITestCaseHookParameter;
    allure?: AllureCucumberTestRuntime;
    ensure?: Ensure;
    data: { [key: string]: any };

    // Getter methods
    getPage: () => WebDriver;
    getPageActions: () => PageActions;
    getPageObjects: () => PageObjects;
    getLogger: () => Logger;
    getEnsure: () => Ensure;
    getPages: () => { homePage: HomePage };
}

export class CustomWorld extends World implements ICustomWorld {
    page?: WebDriver;
    pageActions?: PageActions;
    pageObjects?: PageObjects;
    logger?: Logger;
    testName?: string;
    feature?: ITestCaseHookParameter;
    allure?: AllureCucumberTestRuntime;
    step?: ITestStepHookParameter;
    ensure?: Ensure;
    data: { [key: string]: string } = {};

    constructor(options: IWorldOptions) {
        super(options);
    }

    public getPage(): WebDriver {
        if (!this.page) {
            throw new Error('WebDriver accessed before initialization in Before hook!');
        }
        return this.page;
    }

    public getPageActions(): PageActions {
        if (!this.pageActions) {
            throw new Error('PageActions accessed before initialization in Before hook!');
        }
        return this.pageActions;
    }

    public getPageObjects(): PageObjects {
        if (!this.pageObjects) {
            throw new Error('PageObjects accessed before initialization in Before hook!');
        }
        return this.pageObjects;
    }

    public getLogger(): Logger {
        if (!this.logger) {
            throw new Error('Logger accessed before initialization!');
        }
        return this.logger;
    }

    public getEnsure(): Ensure {
        if (!this.ensure) {
            throw new Error('Ensure accessed before initialization!');
        }
        return this.ensure;
    }

    public getPages() {
        return {
            homePage: new HomePage(this),
        };
    }
}

setWorldConstructor(CustomWorld);
