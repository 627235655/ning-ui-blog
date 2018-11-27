var express = require('express');
var api = express.Router();
var fs = require('fs');
var db = require('./db');
var co = require('co');
var { client, ali_oss } = require('./alioss') // 这里不方便暴露自己的信息， 配置可看以下注释

// alioss.js
// 初始化Client
// var OSS = require('ali-oss')

// var client = new OSS({
//     region: 'oss-cn-shenzhen',
//     accessKeyId: 'xxxxxxxxx',
//     accessKeySecret: 'xxxxxxxx',
//     secure: true
// });

// var ali_oss = {
//     bucket: 'xxx', // bucket的名称
//     dirName: 'xxx', // bucket下文件夹的名称
//     endPoint: 'oss-cn-shenzhen.aliyuncs.com',
// }
// module.exports = { client, ali_oss };


// 获取navlist
api.get('/api/getNavList', function(req, res) {
    db.NavList.find({}, function(err, docs) {
        if (err) {
            console.log('出错' + err);
            return
        }
        res.json({ status: 500, message: '操作成功', data: docs })
    })
});

// 获取标签列表
api.get('/api/getTagList', function(req, res) {
    var DB = db.TagList;
    var options = req.query;
    var is_search_all = JSON.stringify(options) == "{}";
    if (!is_search_all) {
        var sort = options.sort || { _id: -1 };
        var pageSize = Number(options.pageSize) || DB.defaultOptions.pageSize;
        var currentPage = Number(options.currentPage) || 1;
        var condition = options.condition || {}
    }
    // 先查询总条数
    DB.find({}, function(err, docs) {
        if (err) {
            console.log('出错' + err);
            return
        }
        var totalCount = docs.length;
        var data = {
            totalCount: totalCount,
            list: docs
        }
        if (is_search_all) {
            res.json({ status: 200, message: '操作成功', data: data })
            return
        }
        // 此部分为条件查询/分页查询
        DB.find(condition).sort(sort).skip((currentPage - 1) * pageSize).limit(pageSize).exec(function(err, docs) {
            if (err) {
                console.log('出错' + err);
                return
            }
            var data = {
                totalCount: totalCount,
                list: docs
            }
            res.json({ status: 200, message: '操作成功', data: data })
        })
    })
});

// 新增标签
api.post('/api/addTag', function(req, res) {
    var data = { tagName: req.body.tagName };
    var insertData = function(data) {
        db.TagList(data).save(function(err, result) {
            if (err) {
                console.log('出错' + err);
                return
            }
            if (result) {
                res.json({ status: 200, message: '操作成功' })
            }
        });
    }
    db.TagList.find(data, function(err, docs) {
        if (err) {
            console.log('出错' + err);
            return
        }
        if (docs.length > 0) {
            res.json({ status: 500, message: '当前已存在【' + data.tagName + '】标签' })
        } else {
            insertData(data);
        }
    })
});

// 更新标签
api.post('/api/updateTag', function(req, res) {
    db.TagList.find({ _id: req.body._id }, function(err, docs) {
        if (err) {
            return
        }
        docs[0].tagName = req.body.tagName
        db.TagList(docs[0]).save(function(err) {
            if (err) {
                res.json({ status: 500, message: '操作失败' })
                return
            }
            res.json({ status: 200, message: '操作成功' })
        })
    })
});

// 删除标签
api.post('/api/removeTag', function(req, res) {
    db.TagList.remove({ _id: req.body._id }, function(err, docs) {
        if (err) {
            res.json({ status: 500, message: '操作失败' })
            return
        }
        res.json({ status: 200, message: '操作成功' })
    })
});

// 获取文章列表
api.get('/api/getArticleList', function(req, res) {
    var DB = db.ArticleList;
    var options = req.query;
    var is_search_all = JSON.stringify(options) == "{}";
    if (!is_search_all) {
        var sort = options.sort || { _id: -1 };
        var pageSize = Number(options.pageSize) || DB.defaultOptions.pageSize;
        var currentPage = Number(options.currentPage) || 1;
        var condition = options.condition || {}
    }
    // 先查询总条数
    DB.find({}, function(err, docs) {
        if (err) {
            console.log('出错' + err);
            return
        }
        var totalCount = docs.length;
        var data = {
            totalCount: totalCount,
            list: docs
        }
        if (is_search_all) {
            res.json({ status: 200, message: '操作成功', data: data })
            return
        }
        // 此部分为条件查询/分页查询
        DB.find(condition).sort(sort).skip((currentPage - 1) * pageSize).limit(pageSize).exec(function(err, docs) {
            if (err) {
                console.log('出错' + err);
                return
            }
            var data = {
                totalCount: totalCount,
                list: docs
            }
            res.json({ status: 200, message: '操作成功', data: data })
        })
    })
});

// 获取文章详情
api.get('/api/getArticleDetail', function(req, res) {
    var DB = db.ArticleList;
    var options = req.query;
    // 根据_id查询
    DB.find(options, function(err, docs) {
        if (err) {
            console.log('出错' + err);
            return
        }
        res.json({ status: 200, message: '操作成功', data: docs[0] })
    })
});

// 新增文章
api.post('/api/addArticle', function(req, res) {
    var DB = db.ArticleList;
    var data = req.body;
    var insertData = function(data) {
        DB(data).save(function(err, result) {
            if (err) {
                console.log('出错' + err);
                return
            }
            if (result) {
                res.json({ status: 200, message: '操作成功' })
            }
        });
    }
    DB.find(data, function(err, docs) {
        if (err) {
            console.log('出错' + err);
            return
        }
        if (docs.length > 0) {
            res.json({ status: 500, message: '当前已存在【' + data.articleName + '】文章' })
        } else {
            insertData(data);
        }
    })
});

// 更新文章
api.post('/api/updateArticle', function(req, res) {
    var DB = db.ArticleList;
    DB.find({ _id: req.body._id }, function(err, docs) {
        if (err) {
            return
        }
        Object.assign(docs[0], req.body)
        DB(docs[0]).save(function(err) {
            if (err) {
                res.json({ status: 500, message: '操作失败' })
                return
            }
            res.json({ status: 200, message: '操作成功' })
        })
    })
});

// 删除文章
api.post('/api/removeArticle', function(req, res) {
    var DB = db.ArticleList;
    DB.remove({ _id: req.body._id }, function(err, docs) {
        if (err) {
            res.json({ status: 500, message: '操作失败' })
            return
        }
        res.json({ status: 200, message: '操作成功' })
    })
});

// 登录接口
api.post('/api/signIn', function(req, res) {
    db.User.find({ username: req.body.username, password: req.body.password }, function(err, docs) {
        if (err) {
            console.log('出错' + err);
            return
        }
        if (docs.length > 0) {
            let user = docs[0];
            req.session.regenerate(function(err) {
                if (err) {
                    return res.json({ status: 400, message: '登录失败' });
                }
                req.session.loginUser = user.username;
                res.json({ status: 500, message: '登录成功' })
            });
        } else {
            res.json({ status: 404, message: '登录失败，账号不存在或用户名密码错误' })
        }
    })
});

// 登录接口
api.get('/api/isSignIn', function(req, res) {
    var sess = req.session;
    var sess = req.session;
    var loginUser = sess.loginUser;
    var isLogined = !!loginUser;
    if (isLogined) {
        res.json({ status: 500, message: '成功，用户已登录！', data: loginUser })
    } else {
        res.json({ status: 404, message: '失败，用户未登录！' })
    }
});

// 图片上传
var multer = require('multer')
var upload = multer({ dest: './upload/' })
// 图片上传
api.all('/api/uploadFile', upload.single('file'), function(req, res, next) {
    console.log(req.file)
    // 文件路径
    var filePath = './' + req.file.path;
    // 文件类型
    var temp = req.file.originalname.split('.');
    var fileType = temp[temp.length - 1];
    var lastName = '.' + fileType;
    // 构建图片名
    var fileName = Date.now() + lastName;
    // 图片重命名
    fs.rename(filePath, fileName, (err) => {
        if (err) {
            res.json({ status: 500, message: '文件写入失败' });
        } else {
            var localFile = './' + fileName;
            var key = 'ning-ui-blog/' + fileName;
            // 阿里云 上传文件
            co(function*() {
                client.useBucket(ali_oss.bucket);
                var result = yield client.put(key, localFile);
                console.log(result)
                // 上传之后删除本地文件
                fs.unlinkSync(localFile);
                // 设置超时时间
                // var Expires = new Date('2028-01-01').getTime();
                // store.getRtmpUrl('123', {
                //   expires: 3600
                // });
                // console.log(url);
                res.json({ status: 200, message: '上传成功', imageUrl: result.url});
            }).catch(function(err) {
                console.log(err)
                // 上传之后删除本地文件
                fs.unlinkSync(localFile);
                res.json({ status: 500, message: '上传失败', error: JSON.stringify(err) });
            });
        }
    });
})

module.exports = api