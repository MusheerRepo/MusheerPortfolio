import { Given, When } from '@cucumber/cucumber';
import { CustomWorld, ICustomWorld } from '../support/cucumberWorld';
import { config } from '../support/config';
import { By, locateWith } from 'selenium-webdriver';
import * as fs from 'fs';
import path from 'path';
import { Ensure } from '../lib/ensure';
import { HomePage } from '../lib/pageObjects/homePage';

Given('User is on base url', () => {
    // User is already on base url
});

When('enter name {string}', async function (this: ICustomWorld, string: string) {
    const homePage = new HomePage(this);
    await homePage.writeName(string);
    await homePage.assertText(string);
});
