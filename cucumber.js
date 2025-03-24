const getWorldParams = () => {
    const params = {
        foo: 'bar',
    };

    return params;
};

const config = {
    import: ['src/**/*.ts'],
    paths: ['src/features/**/*.feature'],
    format: [
        'json:reports/cucumber-report.json',
        'html:reports/report.html',
        'summary',
        'progress-bar',
    ],
    formatOptions: { snippetInterface: 'async-await' },
    worldParameters: getWorldParams(),
};

if (process.env.USE_ALLURE) {
    config.format.push('allure-cucumberjs/reporter');
} else {
    config.format.push('@cucumber/pretty-formatter');
}
export default config;
