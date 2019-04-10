const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const PACKAGE = require('./package.json');

const banner = `${PACKAGE.name} - ${PACKAGE.version}`;

module.exports = [
  {
    entry: './src/rci.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'rci.min.js'
    },
    module: {
      rules: [
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
      ]
    },
    stats: {
      colors: true
    },
    devtool: 'source-map',
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true,
            }
          }
        })
      ]
    },
    plugins: [
      new webpack.BannerPlugin(banner),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  }
];
