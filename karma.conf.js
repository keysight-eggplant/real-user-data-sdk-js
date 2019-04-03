module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],

        files: [
            'dist/rci.dist.js',
            'tests/*.spec.js'
        ],

        browsers: [
            'Chrome',
            'ChromeHeadless',
            'Firefox',
            'FirefoxHeadless'
        ],
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: [ '-headless' ],
            },
        },
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-chrome-launcher',
            'karma-firefox-launcher'
        ],
        singleRun: true
    });
};