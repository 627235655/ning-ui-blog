const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Version = Date.now()

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/, // 不能排除 node_modules，UglifyJsPlugin 不会对 es6 格式的 js 压缩
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.html$/,
            use: [{
                loader: "html-loader",
                options: {
                    minimize: true
                }
            }]
        }, {
            // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
            test: /\.(png|jpg|jpeg|gif|svg)/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]',
                    outputPath: 'images/', // 图片输出的路径
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html"
        })
    ],
    resolve: {
        // 模糊匹配
        alias: {
            assets: path.join(__dirname, '../src/assets'),
            components: path.join(__dirname, '../src/components'),
            pages: path.join(__dirname, '../src/pages'),
            router: path.join(__dirname, '../src/router'),
            server: path.join(__dirname, '../src/server'),
        }
    }
};