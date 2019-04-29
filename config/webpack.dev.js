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
    mode: 'development',
    entry: {
      rci: './src/rci.js'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].min.js',
      library: 'rciSdk',
      publicPath: '/',
      // library: '',
      // libraryTarget: 'commonjs'
      libraryTarget: 'umd',
      // globalObject: 'this',
      // libraryExport: 'default'
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


// const path = require('path');
// const webpack = require('webpack');

// module.exports = [{
//   entry: './src/rci.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'rci.min.js',
//     library: 'rciSdk'
//   },
//   plugins: [
//     new webpack.optimize.LimitChunkCountPlugin({
//       maxChunks: 1, // disable creating additional chunks
//     })
//   ]
// }];
