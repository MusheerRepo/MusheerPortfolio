import * as chrome from 'selenium-webdriver/chrome';
import * as firefox from 'selenium-webdriver/firefox';

let downloadDir = '/tmp/downloads';
export const config = {
    downloadDir: downloadDir,
    outputDir: 'outputDir',
    screenshot: 'screenshots',
    chrome: () => {
        const options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--start-maximized');
        options.setUserPreferences({
            'download.default_directory': downloadDir,
            'download.prompt_for_download': false,
            'download.directory_upgrade': true,
            'safebrowsing.enabled': true,
        });

        return options;
    },
    firefox: () => {
        const options = new firefox.Options();
        //options.addArguments('--headless');
        options.setPreference('browser.download.folderList', 2);
        options.setPreference('browser.download.dir', downloadDir);
        options.setPreference(
            'browser.helperApps.neverAsk.saveToDisk',
            'application/pdf,application/octet-stream',
        );
        options.setPreference('pdfjs.disabled', true);

        return options;
    },
};
