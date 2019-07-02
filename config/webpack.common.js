const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Version = Date.now()

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }]
            }, {
                // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用 file-loader 进行拷贝
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[ext]?[hash]',
                        outputPath: './blog/images/', // 图片输出的路径
                    }
                }]
            },
            {
                // 处理字体
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name]-[hash:5].min.[ext]',
                        limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                        publicPath: './blogfonts/',
                        outputPath: './blogfonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html"
        })
    ],
    resolve: {
        // extensions: 指定extensions之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
        extensions: [".js", ".jsx"],
        // alias: 配置别名可以加快webpack查找模块的速度
        alias: {
            assets: path.join(__dirname, '../src/assets'),
            components: path.join(__dirname, '../src/components'),
            pages: path.join(__dirname, '../src/pages'),
            router: path.join(__dirname, '../src/router'),
            server: path.join(__dirname, '../src/server'),
        },
        modules: ['node_modules'],
    }
};