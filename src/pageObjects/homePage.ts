import { ICustomWorld } from '../support/cucumberWorld';
import { PageActions } from '../lib/pageActions';
import { PageObjects } from '../lib/pageObjects';
import { Ensure } from '../lib/ensure';
import { readData } from '../support/utilities';
import { config } from '../support/config';
import path from 'path';

export class HomePage {
    readonly formInput: string;
    readonly formResult: string;
    readonly dragElement: string;
    readonly dropElement: string;
    readonly countryDrpDwn: string;
    readonly link: string;
    readonly sundayChkbox: string;
    readonly fileForm: string;
    readonly fileFormInput: string;

    readonly pageActions: PageActions;
    readonly pageObjects: PageObjects;
    readonly ensure: Ensure;
    readonly world: ICustomWorld;

    constructor(world: ICustomWorld) {
        this.formInput = 'Wikipedia1_wikipedia-search-input';
        this.formResult = 'wikipedia-search-result-link';
        this.link = 'apple';
        this.sundayChkbox = 'sunday';
        this.dragElement = 'draggable';
        this.dropElement = 'droppable';
        this.countryDrpDwn = 'country';
        this.fileForm = 'singleFileForm';
        this.fileFormInput = 'singleFileInput';

        this.world = world;
        this.pageActions = world.getPageActions();
        this.pageObjects = world.getPageObjects();
        this.ensure = world.getEnsure();
    }

    async goToBaseUrl() {
        await this.pageActions.navigateTo(config.baseURL);
    }

    async enterFormDetails() {
        this.world.data['readData'] = readData(path.join(config.dataDir, config.details));
        await this.pageActions.enterText(
            await this.pageObjects.findById(this.formInput),
            this.world.data['readData'][1][1],
        );
    }

    async theUserClicksTheSubmitButton() {
        await this.pageActions.submitForm(await this.pageObjects.findById(this.formInput));
    }

    async aSuccessMessageShouldBeDisplayed() {
        await this.ensure.elementHasText(
            await this.pageObjects.findById(this.formResult),
            this.world.data['readData'][1][1],
        );
    }

    async theUserClicksALink() {
        await this.pageActions.clickElement(await this.pageObjects.findById(this.link));
    }

    async theBrowserShouldNavigateToCorrectPage(value: string) {
        await this.ensure.areEqual(await this.pageActions.getUrl(), value);
    }

    async triggerAlert(alertType: string) {
        await this.pageActions.clickElement(await this.pageObjects.findById(`${alertType}Btn`));
    }

    async acceptAlert() {
        await this.pageActions.acceptAlert();
    }

    async dismissAlert() {
        await this.pageActions.dismissAlert();
    }

    async enterAlertText(text: string) {
        await this.pageActions.enterAlertText(text);
        await this.pageActions.acceptAlert();
    }

    async checkTheCheckBox() {
        await this.pageActions.checkElement(await this.pageObjects.findById(this.sundayChkbox));
    }

    async isCheckboxChecked() {
        await this.ensure.elementIsSelected(await this.pageObjects.findById(this.sundayChkbox));
    }

    async dragAndDropElement() {
        await this.pageActions.dragAndDrop(
            await this.pageObjects.findById(this.dragElement),
            await this.pageObjects.findById(this.dropElement),
        );
    }

    async checkDroppedElement(text: string) {
        await this.ensure.elementHasText(await this.pageObjects.findById(this.dropElement), text);
    }

    async selectCountryDropDown(option: string) {
        await this.pageActions.selectByVisibleText(
            await this.pageObjects.findById(this.countryDrpDwn),
            option,
        );
    }

    async assertCountrySelection(option: string) {
        await this.ensure.areEqual(
            await this.pageActions.getInnerText(await this.pageObjects.findByCss('option:checked')),
            option,
        );
    }

    async uploadFileOnPage(file: string) {
        await this.pageActions.uploadFile(
            await this.pageObjects.findById(this.fileFormInput),
            file,
        );
        await this.pageActions.submitForm(await this.pageObjects.findById(this.fileForm));
    }
}
