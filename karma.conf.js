module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],

        files: [
            'dist/rci.dist.js',
            'tests/*.spec.js'
        ],

        browsers: [
            'Chrome'
        ],

        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-chrome-launcher'
        ],
        singleRun: true
    });
};