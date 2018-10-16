const path = require('path')
const os = require('os');
const _root = path.resolve(__dirname, '..');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin") //打包css的插件



/**
 * Get ip(v4) address
 * @return {String} the ipv4 address or 'localhost'
 */
const getIP = function () {
  var ifaces = os.networkInterfaces();
  var ip = '';
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address;
        return;
      }
    });
  }
  return ip || "127.0.0.1";
};


module.exports = {
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: { minimize: true }
                }]
            }
            ,
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    "css-loader?minimize"
                ],
                include: path.join(__dirname, 'src'), //限制范围，提高打包速度
                exclude: path.join(__dirname, 'node_modules'), // 排除 node_modules 目录下的文件
            },
            {
                test: /\.scss/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                    options: {
                      sourceMap: true,
                      config: {
                        path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                      }
                    }
                }, {
                    loader: 'sass-loader'
                }]
            },
            {
                // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/', // 图片输出的路径
                        limit: 10 * 1024
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
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8888,
        host: getIP(),
        hot:true
    }
};