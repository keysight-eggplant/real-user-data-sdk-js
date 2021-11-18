/* eslint-disable prefer-destructuring */
const path = require('path');
const webpack = require('webpack');
const cliArguments = require('minimist')(process.argv.slice(2));
const PACKAGE = require('./../package.json');

console.log(cliArguments);

// Explode values to handle the new way webpack is working

let nameVal;

for (let i = 0; i < cliArguments.env.length; i++) {
  nameVal = cliArguments.env[i].split('=');
  cliArguments[nameVal[0]] = nameVal[1];
}

/** Complete with defaults */

/**
 * This only applies if you want to specify a specific entry point. Useful if you want to update examples
 * */
if (cliArguments.entryPoint === null || cliArguments.entryPoint === true || cliArguments.entryPoint === '' || typeof cliArguments.entryPoint === 'undefined') {
  cliArguments.entryPoint = './src/rci.js';
}

/**
 * This can be one of the following: "core" or "implementation".
 * It can be passed into CLI by writing something like: "--env=scope= core" where "core" is the value
 * */
if (cliArguments.scope === null || cliArguments.scope === true || cliArguments.scope === '' || typeof cliArguments.scope === 'undefined') {
  cliArguments.scope = 'core';
}

/**
 * This will take the entrypoint filename, it will trim it and then assign it to the new
 * transpile filename only if is not explicitly passed into CLI.
 * It can be passed into CLI by writing something like: "--fileName lorem" where "lorem" is the value, therefore
 * the name of the transpiled file will be "lorem.min.js" if is not targeting "legacy"
 * */
if (cliArguments.fileName === null || cliArguments.fileName === true || cliArguments.fileName === '' || typeof cliArguments.fileName === 'undefined') {
  cliArguments.fileName = cliArguments.entryPoint.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, '');
}

/**
 * This can be one of the following: "current" or "legacy".
 * This is either targeting the modern browsers that everyone use (with the value "current") or
 * Old deprecated browsers like IE 11 (with the value "legacy")
 * It can be passed into CLI by writing something like: "--target current" where "current" is the value
 * */
if (cliArguments.rulesTarget === null || cliArguments.rulesTarget === true || cliArguments.rulesTarget === '' || typeof cliArguments.rulesTarget === 'undefined') {
  cliArguments.rulesTarget = 'current';
}

/**
 * This can be one of the following: "development" or "production".
 * Basically minified or not
 * It can be passed into CLI by writing something like: "--env=mode= production" where "production" is the value
 * */
if (cliArguments.mode === null || cliArguments.mode === true || cliArguments.mode === '' || typeof cliArguments.mode === 'undefined') {
  cliArguments.mode = 'production';
}

console.log(cliArguments);

const banner = `Scope: ${cliArguments.scope} - ${PACKAGE.name} - ${PACKAGE.version} compiled at ${(new Date()).toISOString()}`;

const currentRules = [
  {
    test: /\.(js)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [
          ['@babel/plugin-proposal-class-properties']
        ]
      }
    }
  }
];

const legacyRules = [
  {
    test: /\.(js)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['last 2 versions', 'ie >= 11']
              }
            }
          ]
        ],
        plugins: [
          ['@babel/plugin-transform-runtime', {
            corejs: 2
          }, '@babel/plugin-proposal-class-properties']
        ]
      }
    }
  }
];

let rules;
if (cliArguments.rulesTarget === 'current') {
  rules = currentRules;
} else if (cliArguments.rulesTarget === 'legacy') {
  rules = legacyRules;
}

let suffix;
if (cliArguments.rulesTarget === 'current') {
  suffix = '';
} else if (cliArguments.rulesTarget === 'legacy') {
  suffix = '-legacy';
}


const plugins = [
  new webpack.BannerPlugin(banner),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  }),
  new webpack.DefinePlugin({
    __VERSION__: `'${PACKAGE.version}'`
  })
];

module.exports = [
  {
    target: 'web',
    mode: `${cliArguments.mode}`,
    entry: {
      rci: `${cliArguments.entryPoint}`
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: `${cliArguments.fileName}${suffix}.min.js`,
      library: 'rciSdk',
      publicPath: '/',
      libraryTarget: 'window'
    },
    module: {
      rules
    },
    stats: {
      colors: true
    },
    devtool: 'source-map',
    plugins
  }
];
