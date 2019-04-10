module.exports = config => {
  config.set({
    frameworks: ['mocha', 'chai'],

    files: [
      'dist/rci.min.js',
      'tests/*.spec.js'
    ],

    browsers: [
      'ChromeHeadless',
      'FirefoxHeadless'
    ],
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
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
