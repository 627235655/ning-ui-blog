const path = require('path')
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.js');
const { root } = require('./webpack.util');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css 提取到单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // js 压缩插件
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
    externals : {
       'react': 'react',
       'react-dom': 'ReactDOM',
       'swiper': 'Swiper',
       '@antv/g2': 'G2',
       'highlight.js': 'hljs',
       'marked': 'marked',
       'axios': 'axios'
    },
    optimization: { // 根据需要自定义一些优化构建打包的策略配置
        // minimizer: [
        //     // 自定义js优化配置，将会覆盖默认配置
        //     new UglifyJsPlugin({
        //         exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        //         cache: true,
        //         parallel: true, // 开启并行压缩，充分利用cpu
        //         sourceMap: false,
        //         extractComments: false, // 移除注释
        //         uglifyOptions: {
        //             compress: {
        //                 // 在UglifyJs删除没有用到的代码时不输出警告
        //                 warnings: false,
        //                 // 删除所有的 `console` 语句，可以兼容ie浏览器
        //                 drop_console: true,
        //                 // 内嵌定义了但是只用到一次的变量
        //                 collapse_vars: true,
        //                 // 提取出出现多次但是没有定义成变量去引用的静态值
        //                 reduce_vars: true,
        //             },
        //             output: {
        //                 // 最紧凑的输出
        //                 beautify: false,
        //                 // 删除所有的注释
        //                 comments: false,
        //             }
        //         }
        //     })
        // ],
        // minimizer: [ // 用于配置 minimizers 和选项
        //     new UglifyJsPlugin({
        //         cache: true,
        //         parallel: true,
        //         sourceMap: true
        //     }),
        //     new OptimizeCssAssetsPlugin({})
        // ],
        // splitChunks: {
        //     chunks: 'all',
        //     minSize: 30000,
        //     maxSize: 0,
        //     minChunks: 1,
        //     maxAsyncRequests: 5,
        //     maxInitialRequests: 3,
        //     automaticNameDelimiter: '~',
        //     name: true,
        //     cacheGroups: {
        //         vendors: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: 'vendors',
        //             minSize: 30000,
        //             minChunks: 1,
        //             chunks: 'all', // 可选 'initial | async | all'，分别代表，初始化时加载、异步加载、两者皆使用
        //             priority: 1  // 该配置项是设置处理的优先级，数值越大越优先处理
        //         },
        //         commons: {
        //             // test: /[\\/]src[\\/]assets[\\/]/,
        //             name: 'commons',
        //             minSize: 30000,
        //             minChunks: 2,
        //             chunks: 'all',
        //             priority: -1,
        //             reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
        //         }
        //     }
        // }
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
                    "css-loader"
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
                    }, {
                        loader: 'sass-loader'
                    }, {
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
            // chunkFilename: "[id].css"
        }),
        new OptimizeCssAssetsPlugin()
        // new OptimizeCssAssetsPlugin({
        //     // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
        //     assetNameRegExp: /\.(sa|sc|c)ss$/g,
        //     // 指定一个优化css的处理器，默认cssnano
        //     cssProcessor: require('cssnano'),
        //     cssProcessorPluginOptions: {
        //         preset: ['default', {
        //             discardComments: { removeAll: true }, // 对注释的处理
        //             normalizeUnicode: false, // 建议false,否则在使用unicode-range的时候会产生乱码
        //             // 避免 cssnano 重新计算 z-index
        //             safe: true,
        //             // cssnano 集成了autoprefixer的功能
        //             // 会使用到autoprefixer进行无关前缀的清理
        //             // 关闭autoprefixer功能
        //             // 使用postcss的autoprefixer功能
        //             autoprefixer: false
        //         }]
        //     },
        //     canPrint: true // 是否打印编译过程中的日志
        // })
    ]
}));