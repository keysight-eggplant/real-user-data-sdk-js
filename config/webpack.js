/* eslint-disable prefer-destructuring */
import path from 'path';
import webpack from 'webpack';
import PACKAGE from '../package.json' assert { type: 'json' };
import yargs from 'yargs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @typedef {Object} RCIWebpackConfig
 * @property {String} mode - The mode to run the webpack compiler in.
 * @property {String} rootFolderPath - The path to the root folder.
 * @property {String} scope - The scope to use.
 * @property {String} intVersion - The internal version to use.
 * @property {String} rulesTarget - The rules target to use.
 * @property {String} includeRulesTargetSuffix - If this is on true, the asset that was compiled for legacy browsers, will include an "-legacy" in the name.
 * @property {String} outputPath - The path to the output folder.
 * @property {String} outputFilename - The filename to use for the output.
 * */

const PRODUCTION_MODE = 'production';



export class WebpackWrapper {

  static currentRules = [
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
                  browsers: ['last 2 versions']
                }
              }
            ]
          ],
          plugins: [
            ['@babel/plugin-proposal-class-properties']
          ]
        }
      }
    }
  ];

  static legacyRules = [
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

  /**
   * 
   * @param {RCIWebpackConfig} config 
   * @returns 
   */
  static generateBanner(config) {
    return `Scope: ${config.scope} - ${PACKAGE.name} - ${PACKAGE.version} targeting ${config.rulesTarget} browsers compiled at ${(new Date()).toISOString()}`;
  }

  /**
   * 
   * @param {RCIWebpackConfig} config 
   * @returns 
   */
  static provisionWebpack(config) {

    // Normalize filename
    if (config.fileName === null || config.fileName === true || config.fileName === '' || typeof config.fileName === 'undefined') {
      config.fileName = config.entryPoint;
      config.fileName = config.fileName.replace(/^.*[\\\/]/, '')
      config.fileName = config.fileName.replace(/\.[^/.]+$/, '');
    }

    console.log(config);
    let banner = WebpackWrapper.generateBanner(config);
    console.log(banner);

    // Compose plugins
    let webpackPlugins = [
      new webpack.BannerPlugin({
        banner: banner,
        entryOnly: true
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.DefinePlugin({
        __VERSION__: `'${PACKAGE.version}'`
      })
    ];

    let rules;
    let suffix = '';
    if (config.rulesTarget === 'current') {
      rules = WebpackWrapper.currentRules;
    } else if (config.rulesTarget === 'legacy') {
      rules = WebpackWrapper.legacyRules;
      if (config.includeRulesTargetSuffix === true) {
        suffix = '-legacy';
      }
    }

    return [
      {
        target: 'web',
        mode: `${config.mode}`,
        entry: {
          rci: `${config.entryPoint}`
        },
        output: {
          path: path.resolve(__dirname, '../dist'),
          filename: `${config.fileName}${suffix}.min.js`,
          publicPath: '/',
          library: {
            name: 'rciSdk',
            type: 'window'
          }
        },
        module: {
          rules
        },
        stats: {
          colors: true
        },
        devtool: 'source-map',
        plugins: webpackPlugins
      }
    ];

  }
}

if (path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {

  // It is being run directly from CLI

yargs(process.argv.slice(2))
  .usage('Usage: node $0 <command> [options]')
  .version(false)
  .example('node ./config/webpack.js help')
  .example('node ./config/webpack.js --scope=core --rulesTarget=current --mode=development')
  .example('node ./config/webpack.js --entryPoint=./src/rci.js --scope=core --rulesTarget=current --mode=development')
  .example('node ./config/webpack.js --entryPoint=./src/rci.js --scope=core --rulesTarget=legacy --mode=production')
  .example('node ./config/webpack.js --entryPoint=./examples/Vanilla/OnLoad/onload.js  --scope=implementation --rulesTarget=current --mode=production')
  .option('entryPoint', {
    alias: 'ep',
    type: 'string',
    default: './src/rci.js',
    description: 'This only applies if you want to specify a specific entry point. Useful if you want to update examples'
  })
  .option('scope', {
    alias: 's',
    choices: ['core', 'implementation'],
    // demandOption: true,
    default: 'core',
    type: 'string',
    description: 'This can be one of the following: "core" if you are compiling the RCI Core SDK or "implementation" if you compile an instrumentation of the Core'
  })
  .option('fileName', {
    default: '',
    alias: 'fn',
    type: 'string',
    description: 'A custom file name can be provided. Usage not advisable if you want to maintain consistency. If not provided, the file name will be extracted from the folder structure (entry point).'
  })
  .option('rulesTarget', {
    alias: 'rt',
    choices: ['current', 'legacy'],
    default: 'current',
    type: 'string',
    description: 'This can be one of the following: "current" or "legacy". This is either targeting the modern browsers(with the value "current") that everyone uses or the legacy browsers(with the value "legacy") that are still in use such as IE 11'
  })
  .option('includeRulesTargetSuffix', {
    alias: 'irts',
    default: true,
    type: 'boolean',
    description: 'If this is on true, the asset that was compiled for legacy browsers, will include an "-legacy" in the name.'
  })
  .option('mode', {
    alias: 'm',
    choices: [PRODUCTION_MODE, 'development'],
    default: 'development',
    type: 'string',
    description: `This can be one of the following: "development" or "${PRODUCTION_MODE}". Basically minified or not`
  })
  .option('help', {
    alias: 'h',
    description: 'Help for the script'
  })
  .command({
    command: '$0',
    handler: (cliArguments) => {
      webpack(WebpackWrapper.provisionWebpack(cliArguments), (err, stats) => {
        console.log('Running via CLI');
        if (err || stats.hasErrors()) {
          console.log(err);
        } else {
          console.log(stats.stats.toString());
        }
        console.log('Done webpacking');
      });
    }
  })
  .epilog('All rights reserved, RCI Team')
  .parse();

}