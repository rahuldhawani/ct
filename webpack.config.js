const path = require('path');
module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }]

  }
};