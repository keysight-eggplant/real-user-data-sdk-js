const path = require('path');
// const webpack = require('webpack');
// const PACKAGE = require('./package.json');

// const banner = `${PACKAGE.name} - ${PACKAGE.version}`;

module.exports = [
  {
    // entry: './src/rci.js',
    // mode: 'development',
    entry: {
      rci: './src/rci.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].min.js',
      // library: 'rciSdk',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            // options: {
            //   presets: ['@babel/preset-env']
            // }
          }
        }
      ]
    },
    stats: {
      colors: true
    },
    devtool: 'source-map',
    plugins: [
      // new webpack.BannerPlugin(banner),
      // new webpack.optimize.LimitChunkCountPlugin({
      //   maxChunks: 1
      // })
    ]
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
