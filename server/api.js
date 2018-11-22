var express = require('express');
var api = express.Router();
var db = require('./db');


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


// 获取文章标签列表
api.get('/api/getTagList', function(req, res) {
    var DB = db.TagList;
    var options = req.query;
    var is_search_all = JSON.stringify(options) == "{}";
    if (!is_search_all) {
        var sort = options.sort || {_id: -1};
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

// 新增文章标签
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

// 更新文章标签
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

// 删除文章标签
api.post('/api/removeTag', function(req, res) {
    db.TagList.remove({ _id: req.body._id }, function(err, docs) {
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
                    return res.json({ status: 400, msg: '登录失败' });
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

module.exports = api