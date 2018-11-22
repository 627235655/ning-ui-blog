const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.js');
const { root } = require('./webpack.util');
const  Version = new Date().getTime();

module.exports = webpackMerge(common, {
  mode: 'production',
  output: {
    path: root('dist'),
    publicPath: '/',
    filename: 'index.js?v=' + Version
  }
});
