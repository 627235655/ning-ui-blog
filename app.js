const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mime = require('mime');
const server = require('./server');
const compression = require('compression');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

const resolve = (file) => path.resolve(__dirname, file);

app.use(compression());

app.use('/', express.static(resolve('./dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const identityKey = 'nzy';

app.use(
  session({
    name: identityKey,
    secret: 'ngpsf', // 用来对 session id 相关的 cookie 进行签名
    store: new FileStore(), // 本地存储 session（文本文件，也可以选择其他 store，比如 redis 的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议 false
    resave: false, // 是否每次都重新保存会话，建议 false
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 有效期，单位是毫秒, 这里设置的是 24 小时
    }
  })
);

app.use(server);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // 如果是前端路由则如下处理
  fs.readFile(`${__dirname  }/dist/index.html`, (err, data) => {
    if (err) {
      console.log(err);
      res.send('后台错误');
    } else {
      res.writeHead(200, {
        'Content-type': 'text/html',
        Connection: 'keep-alive'
      });
      res.end(data);
    }
  });
});

app.listen(process.env.PORT || 80, () => {
  console.log('应用实例，访问地址为 localhost:80');
});
