const path = require('path')
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.js');
const { root } = require('./webpack.util');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css 提取到单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // js 压缩插件
const Version = Date.now();

module.exports = webpackMerge(common, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    output: {
        path: root('dist'),
        publicPath: '/',
        filename: 'index.js?v=' + Version
    },
    optimization: {
        minimizer: [
            // new UglifyJsPlugin({
            //     cache: true, // Boolean/String,字符串即是缓存文件存放的路径
            //     parallel: true, // 启用多线程并行运行提高编译速度
            //     sourceMap: true,
            //     uglifyOptions: {
            //         output: {
            //             comments: false // 删掉所有注释
            //         },
            //         compress: {
            //             warning: false, // 插件在进行删除一些无用的代码时不提示警告
            //             drop_console: true // 过滤console,即使写了console,线上也不显示
            //         }
            //     }
            // }),
            new OptimizeCssAssetsPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons', // 提取出来的文件命名
                    // name： ‘common/common’ //  即先生成common文件夹
                    chunks: 'initial', // initial表示提取入口文件的公共css及js部分
                    // chunks: 'all' // 提取所有文件的公共部分
                    test: '/\.css$/', // 只提取公共css ，命名可改styles
                    minChunks: 2, // 表示提取公共部分最少的文件数
                    minSize: 0 // 表示提取公共部分最小的大小
                    // 如果发现页面中未引用公共文件，加上enforce: true
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
                include: path.join(__dirname, '../src'), //限制范围，提高打包速度
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
            filename: "./index.css?v=" + Version,
            chunkFilename: "[id].css"
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
        //             normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
        //         }]
        //     },
        //     canPrint: true // 是否打印编译过程中的日志
        // })
    ]
});