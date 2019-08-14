const path = require('path')
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.js');
const { root } = require('./webpack.util');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css 提取到单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 压缩插件
const TerserPlugin = require('terser-webpack-plugin'); // js 压缩插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 检测webpack打包过程中各个部分所花费的时间
const smp = new SpeedMeasurePlugin();
const Version = Date.now();

module.exports = smp.wrap(webpackMerge(common, {
    mode: 'production', // 生产模式
    // devtool: 'cheap-module-source-map', // 用于定位文件报错信息
    output: {
        path: root('dist'), // 输出的文件目录
        publicPath: '/', // 输出文件名前加的默认资源路径
        filename: './blog/index.js?v=' + Version, // 输出的文件名，与 entry 对应
        chunkFilename: './blog/[name].[chunkhash:8].js', // 非入口 entry 的模块，会自动拆分文件，即按需加载
        // hash - 模块标识符的hash,一般应用于filename：'[name].[hash].js'
        // chunkhash - 按需加载块内容的 hash，根据chunk自身的内容计算而来,'[name].[chunkhash:8].js'
        // contenthash - 这个没有用过，看了下文档它是在提取css文件时根据内容计算而来的 hash ，结合ExtractTextWebpackPlugin插件使用
        // hash 长度 - 默认20，可自定:[hash:8]、[chunkhash:16]
    },
    // 打包时排除以下第三方库， 在页面中用 cdn 加载
    // 属性名 react-dom 指的是 import ReactDOM from 'react-dom' 的 react-dom
    // 属性值 ReactDOM 指的是 import ReactDOM from 'react-dom' 的 ReactDOM
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'swiper': 'Swiper',
        '@antv/g2': 'G2',
        'highlight.js': 'hljs',
        'marked': 'marked',
        'axios': 'axios'
    },
    optimization: { // 根据需要自定义一些优化构建打包的策略配置
        minimizer: [ // 用于配置 minimizers 和选项
            new TerserPlugin({}),
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    minSize: 30000,
                    minChunks: 1,
                    chunks: 'all', // 可选 'initial | async | all'，分别代表，初始化时加载、异步加载、两者皆使用
                    priority: 1  // 该配置项是设置处理的优先级，数值越大越优先处理
                },
                commons: {
                    // test: /[\\/]src[\\/]assets[\\/]/,
                    name: 'commons',
                    minSize: 30000,
                    minChunks: 2,
                    chunks: 'all',
                    priority: -1,
                    reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
                }
            }
        }
    },
    module: {
        rules: [{
                // exclude: /node_modules/,
                test: /\.js$/, // 生产环境不能排除 node_modules，UglifyJsPlugin 不会对 es6 格式的 js 压缩
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
                include: path.join(__dirname, '../src'), // 限制范围，提高打包速度
                exclude: path.join(__dirname, '../node_modules') // 排除 node_modules 目录下的文件
            },
            {
                test: /\.scss/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
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
                include: path.join(__dirname, '../src'), //限制范围，提高打包速度
                exclude: path.join(__dirname, '../node_modules') // 排除 node_modules 目录下的文件
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./blog/index.css?v=" + Version,
            chunkFilename: "[name].css"
        })
    ]
}));