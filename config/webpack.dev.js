const path = require('path')
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common');
const {
    getIP,
    root
} = require('./webpack.util');


module.exports = webpackMerge(common, {
    mode: 'development',
    // devtool: 'cheap-module-eval-source-map',
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            // {
            //     // 使用sourcemap调试
            //     // enforce:pre表示这个loader要在别的loader执行前执行
            //     enforce: "pre",
            //     test: /\.js$/,
            //     loader: "source-map-loader"
            // },
            {
                test: /\.css$/,
                use: [
                    "style-loader", // 使用 style-loader 可以配合热刷新(HotModuleReplacementPlugin)功能，MiniCssExtractPlugin 则不行
                    "css-loader?minimize"
                ],
                include: path.join(__dirname, '../src'), // 限制范围，提高打包速度
                exclude: path.join(__dirname, '../node_modules'), // 排除 node_modules 目录下的文件
            },
            {
                test: /\.scss/,
                use: [
                    "style-loader",
                    'css-loader?minimize',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js' // 这个得在项目根目录创建此文件
                            }
                        }
                    }, {
                        loader: 'sass-loader'
                    }, {
                        loader: 'sass-resources-loader',
                        options: {
                            sourceMap: true,
                            resources: ['./src/assets/ning-ui/sass/variable.scss'],
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
        filename: 'index.js'
    },
    devServer: {
        // hot: true,
        contentBase: path.join(__dirname, "./dist"),
        host: getIP(),
        port: 1111,
        historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
        open: true,
        openPage: 'blog/index/home',
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:80',
                changeOrigin: true,
                secure: false
            }
        },
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin()
    ]
});