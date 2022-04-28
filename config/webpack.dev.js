const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common');
const { getIP, root } = require('./webpack.util');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

// 微服务添加 - start
const packageName = require('../package.json').name;

console.log('packageName', packageName);
// 微服务添加 - end

module.exports = webpackMerge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/, // jsx 或者 tsx 文件
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ]
            }
          },
          'awesome-typescript-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // 使用 style-loader 可以配合热刷新(HotModuleReplacementPlugin)功能，MiniCssExtractPlugin 则不行
          'css-loader?minimize'
        ],
        include: path.join(__dirname, '../src'), // 限制范围，提高打包速度
        exclude: path.join(__dirname, '../node_modules') // 排除 node_modules 目录下的文件
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          'css-loader?minimize',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js' // 这个得在项目根目录创建此文件
              }
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: ['./src/assets/ning-ui/sass/variable.scss']
            }
          }
        ],
        include: path.join(__dirname, '../src'), // 限制范围，提高打包速度
        exclude: path.join(__dirname, '../node_modules') // 排除 node_modules 目录下的文件
      }
    ]
  },
  output: {
    path: root('dist'),
    publicPath: '/',
    filename: 'index.js',
    // 微服务添加 - start
    library: `${packageName}`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}`
    // 微服务添加 - end
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, './dist'),
    host: getIP(),
    port: 1111,
    historyApiFallback: true, // 该选项的作用所有的 404 都连接到index.html
    open: true,
    openPage: 'blog/index/home',
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api/*': {
        target: 'http://127.0.0.1:80',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    plugins: [new TsConfigPathsPlugin()]
  }
});
