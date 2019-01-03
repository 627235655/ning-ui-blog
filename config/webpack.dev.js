const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common');
const {
    getIP,
    root
} = require('./webpack.util');


module.exports = webpackMerge(common, {
    mode: 'development',
    output: {
        path: root('dist'),
        publicPath: '/',
        filename: 'index.js'
    },
    devServer: {
        contentBase: root('src'),
        compress: true,
        port: 8888,
        host: getIP(),
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        open: true,
        openPage: 'blog/index/home',
        proxy: {
            '/api/*': {
                target: 'http://localhost:9999',
                changeOrigin: true,
                secure: false
            }
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});