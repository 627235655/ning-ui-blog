var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var mime = require('mime');
var api = require('./server/api');
var compression = require('compression');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var app = express();

var resolve = file => path.resolve(__dirname, file);

app.use(compression());

app.use('/', express.static(resolve('./dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var identityKey = 'nzy';

app.use(session({
    name: identityKey,
    secret: 'ngpsf',  // 用来对 session id 相关的 cookie 进行签名
    store: new FileStore(),  // 本地存储 session（文本文件，也可以选择其他 store，比如 redis 的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议 false
    resave: false,  // 是否每次都重新保存会话，建议 false
    cookie: {
        maxAge:  24 * 60 * 60 * 1000  // 有效期，单位是毫秒, 这里设置的是 24 小时
    }
}));

app.use(api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
　　 // 如果是前端路由则如下处理
    fs.readFile(__dirname + '/dist/index.html', function(err, data){
        if(err){
            console.log(err);
            res.send('后台错误');
        } else {
            res.writeHead(200, {
                'Content-type': 'text/html',
                'Connection':'keep-alive'
            });
            res.end(data);
        }
    })
});

app.listen(process.env.PORT || 9999, function() {
    console.log("应用实例，访问地址为 localhost:9999")
});
