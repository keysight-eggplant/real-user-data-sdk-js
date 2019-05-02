const path = require('path');
const webpack = require('webpack');
const PACKAGE = require('./../package.json');

const banner = `${PACKAGE.name} - ${PACKAGE.version}`;

const rules = [
  {
    test: /\.(js)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  }
];

const plugins = [
  new webpack.BannerPlugin(banner),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  })
];

module.exports = [
  {
    mode: 'production',
    entry: {
      rci: './src/rci.js'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].min.js',
      library: 'rciSdk',
      publicPath: '/',
      libraryTarget: 'umd'
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
