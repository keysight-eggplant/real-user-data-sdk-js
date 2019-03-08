const path = require('path');
const webpack = require('webpack');

module.exports = [{
  entry: "./src/rci.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'rci.dist.js',
    library: 'rciSdk'
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1, // disable creating additional chunks
    })
  ]
}];