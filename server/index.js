var express = require("express");
var session = require("express-session");
var FileStore = require("session-file-store")(session);
var api = express.Router();
var fs = require("fs");
var db = require("./db");
var co = require("co");
var { CLIENT, ALI_OSS } = require("./private-constants"); // 这里不方便暴露自己的信息， 配置可看以下注释

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

const identityKey = "skey";

api.use(
  session({
    name: identityKey,
    secret: "zongyuan.ning", // 用来对session id相关的cookie进行签名
    store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
      maxAge: 1000 * 3600 * 24 * 7 // 有效期，单位是毫秒
    }
  })
);

// 登录接口
api.post("/api/signIn", function (req, res) {
  const { username, password } = req.body;
  db.User.find({ username, password }, function (err, docs) {
    console.log("🚀 ~ file: api.js ~ line 47 ~ err, docs", err, docs);
    if (err) {
      console.log("出错" + err);
      return;
    }
    if (docs.length > 0) {
      let user = docs[0];
      req.session.regenerate(function (err) {
        if (err) {
          return res.json({ status: 400, message: "登录失败" });
        }
        req.session && (req.session.loginUser = user.username);
        res.json({ status: 200, message: "登录成功" });
        res.send();
      });
    } else {
      res.json({
        status: 404,
        message: "登录失败，账号不存在或用户名密码错误"
      });
    }
  });
});

// 登出接口
api.post("/api/logOut", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      res.json({ status: 500, message: "登出失败" });
      return;
    }
    req.session && (req.session.loginUser = null);
    res.json({ status: 200, message: "登出成功" });
  });
});

// 检查是否登录
api.get("/api/isSignIn", function (req, res) {
  var sess = req.session;
  var loginUser = sess.loginUser;
  var isLogined = !!loginUser;
  if (isLogined) {
    res.json({
      status: 200,
      message: "成功，用户已登录！",
      data: loginUser
    });
  } else {
    res.json({ status: 404, message: "失败，用户未登录！" });
  }
});

// 获取 navlist
api.get("/api/getNavList", function (req, res) {
  db.NavList.find({}, function (err, docs) {
    if (err) {
      console.log("出错" + err);
      return;
    }
    res.json({ status: 500, message: "操作成功", data: docs });
  });
});

// 获取标签列表
api.get("/api/getTagList", function (req, res) {
  var DB = db.TagList;
  var options = req.query;
  var is_search_all = JSON.stringify(options) == "{}";
  if (!is_search_all) {
    var sort = options.sort || { _id: -1 };
    var pageSize = Number(options.pageSize) || DB.defaultOptions.pageSize;
    var currentPage = Number(options.currentPage) || 1;
    var filter = options.filter || {};
  }

  // 先查询总条数
  DB.find({}, function (err, docs) {
    if (err) {
      console.log("出错" + err);
      return;
    }
    var totalCount = docs.length;
    // 查询文章 - 赋值每个标签含有多少篇文章
    let articleList;
    db.ArticleList.find({}, function (err, docs_2) {
      articleList = docs_2;
      docs = docs.map(function (v, i, a) {
        v.articleNum = 0;
        articleList.forEach(function (v2, i2, a2) {
          if (v2.articleTags.includes(v.tagName)) {
            v.articleNum++;
          }
        });
        return v;
      });
      var data = {
        totalCount: totalCount,
        list: docs
      };
      if (is_search_all) {
        res.json({ status: 200, message: "操作成功", data: data });
        return;
      }
      // 此部分为条件查询/分页查询
      DB.find(filter)
        .sort(sort)
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
        .exec(function (err, docs) {
          if (err) {
            console.log("出错" + err);
            return;
          }
          var data = {
            totalCount: totalCount,
            list: docs
          };
          res.json({ status: 200, message: "操作成功", data: data });
        });
    });
  });
});

// 新增标签
api.post("/api/addTag", function (req, res) {
  var data = { tagName: req.body.tagName };
  var insertData = function (data) {
    db.TagList(data).save(function (err, result) {
      if (err) {
        console.log("出错" + err);
        return;
      }
      if (result) {
        res.json({ status: 200, message: "操作成功" });
      }
    });
  };
  db.TagList.find(data, function (err, docs) {
    if (err) {
      console.log("出错" + err);
      return;
    }
    if (docs.length > 0) {
      res.json({
        status: 500,
        message: "当前已存在【" + data.tagName + "】标签"
      });
    } else {
      insertData(data);
    }
  });
});

// 更新标签
api.post("/api/updateTag", function (req, res) {
  db.TagList.find({ _id: req.body._id }, function (err, docs) {
    if (err) {
      return;
    }
    docs[0].tagName = req.body.tagName;
    db.TagList(docs[0]).save(function (err) {
      if (err) {
        res.json({ status: 500, message: "操作失败" });
        return;
      }
      res.json({ status: 200, message: "操作成功" });
    });
  });
});

// 删除标签
api.post("/api/removeTag", function (req, res) {
  db.TagList.remove({ _id: req.body._id }, function (err, docs) {
    if (err) {
      res.json({ status: 500, message: "操作失败" });
      return;
    }
    res.json({ status: 200, message: "操作成功" });
  });
});

// 获取时间列表
api.get("/api/getDateList", function (req, res) {
  var DB = db.ArticleList;
  // 先查询总条数
  DB.find({}, function (err, docs) {
    if (err) {
      console.log("出错" + err);
      return;
    }
    var totalCount = docs.length;
    let arr = docs.map((v, i) => {
      return new Date(v.createDate).Format("yyyy-MM");
    });
    let new_arr = [];
    arr.map((v, i) => {
      if (new_arr.length === 0) {
        let obj = {
          createDate: v,
          articleNum: 1
        };
        new_arr.push(obj);
      } else {
        let is_existed;
        new_arr.map((v2, i2) => {
          if (v2.createDate === v) {
            is_existed = true;
            v2.articleNum++;
          } else {
            is_existed = false;
          }
        });
        if (!is_existed) {
          let obj = {
            createDate: v,
            articleNum: 1
          };
          new_arr.push(obj);
        }
      }
    });
    var data = {
      totalCount: totalCount,
      list: new_arr
    };
    res.json({ status: 200, message: "操作成功", data: data });
    return;
  });
});

// 获取文章列表
api.get("/api/getArticleList", function (req, res) {
  var DB = db.ArticleList;
  var options = req.query;
  var is_search_all = JSON.stringify(options) == "{}";
  var sess = req.session;
  var loginUser = sess.loginUser;
  var isLogined = !!loginUser;
  var filter = {};
  if (!is_search_all) {
    var sort = options.sort || { _id: -1 };
    var pageSize = Number(options.pageSize) || DB.defaultOptions.pageSize;
    var currentPage = Number(options.currentPage) || 1;
    if (options.filter) {
      filter = JSON.parse(options.filter);
      if (filter.articleTags.length === 0 && filter.createDates.length === 0) {
        filter = {};
      }
      // 按标签搜索
      else if (
        filter.articleTags.length > 0 &&
        filter.createDates.length === 0
      ) {
        delete filter.createDates;
        let arr = filter.articleTags;
        filter.articleTags = {
          $in: arr
        };
      }
      // 按时间搜索
      else if (
        filter.articleTags.length === 0 &&
        filter.createDates.length > 0
      ) {
        delete filter.articleTags;
        let arr = filter.createDates;
        filter = {
          $and: [
            { createDate: { $gt: arr[0] } },
            { createDate: { $lt: arr[1] } }
          ]
        };
      }
      if (!isLogined) {
        filter.isPrivate = "0";
      }
    }
  }
  if (!isLogined) {
    filter.isPrivate = "0";
  }
  // 先查询总条数
  DB.find(filter, function (err, docs) {
    if (err) {
      console.log("出错" + err);
      return;
    }
    var totalCount = docs.length;
    var data = {
      totalCount: totalCount,
      list: docs
    };
    if (is_search_all) {
      res.json({ status: 200, message: "操作成功", data: data });
      return;
    }
    // 此部分为条件查询/分页查询
    DB.find(filter)
      .sort(sort)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .exec(function (err, docs) {
        if (err) {
          console.log("出错" + err);
          return;
        }
        var data = {
          totalCount: totalCount,
          list: docs
        };
        res.json({ status: 200, message: "操作成功", data: data });
      });
  });
});

// 获取文章详情
api.get("/api/getArticleDetail", function (req, res) {
  var DB = db.ArticleList;
  var options = req.query;
  // 根据_id查询
  DB.find(options, function (err, docs) {
    if (err) {
      console.log("出错" + err);
      return;
    }
    res.json({ status: 200, message: "操作成功", data: docs[0] });
  });
});

// 新增文章
api.post("/api/addArticle", function (req, res) {
  var DB = db.ArticleList;
  var data = req.body;
  var insertData = function (data) {
    DB(data).save(function (err, result) {
      if (err) {
        console.log("出错" + err);
        return;
      }
      if (result) {
        res.json({ status: 200, message: "操作成功" });
      }
    });
  };
  DB.find(data, function (err, docs) {
    if (err) {
      console.log("出错" + err);
      return;
    }
    if (docs.length > 0) {
      res.json({
        status: 500,
        message: "当前已存在【" + data.articleName + "】文章"
      });
    } else {
      insertData(data);
    }
  });
});

// 更新文章
api.post("/api/updateArticle", function (req, res) {
  var DB = db.ArticleList;
  DB.find({ _id: req.body._id }, function (err, docs) {
    if (err) {
      return;
    }
    Object.assign(docs[0], req.body);
    DB(docs[0]).save(function (err) {
      if (err) {
        res.json({ status: 500, message: "操作失败" });
        return;
      }
      res.json({ status: 200, message: "操作成功" });
    });
  });
});

// 删除文章
api.post("/api/removeArticle", function (req, res) {
  var DB = db.ArticleList;
  DB.remove({ _id: req.body._id }, function (err, docs) {
    if (err) {
      res.json({ status: 500, message: "操作失败" });
      return;
    }
    res.json({ status: 200, message: "操作成功" });
  });
});

var defaultOptions = {
  pageSize: 10
};

// 获取评论列表
api.get("/api/getCommentList", function (req, res) {
  var DB = db.CommentList;
  var options = req.query;
  // 是否查询全部信息
  var is_search_all = JSON.stringify(options) == "{}";
  if (is_search_all) {
    // 全部查询
    DB.find({}, function (err, docs) {
      if (err) {
        console.log("出错" + err);
        return;
      }
      var totalCount = docs.length;
      var data = {
        totalCount: totalCount,
        list: docs
      };
      res.json({ status: 200, message: "操作成功", data: data });
      return;
    });
  } else {
    // 分页查询
    var filter = {};
    var sort = options.sort || { _id: -1 };
    var pageSize = Number(options.pageSize) || defaultOptions.pageSize;
    var currentPage = Number(options.currentPage) || 1;
    if (options.filter) {
      filter = JSON.parse(options.filter);
    }
    DB.find(filter)
      .sort(sort)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .exec(function (err, docs) {
        if (err) {
          console.log("出错" + err);
          return;
        }
        var totalCount = docs.length;
        if (JSON.stringify(filter) == "{}") {
          var data = {
            totalCount: totalCount,
            list: docs
          };
          res.json({ status: 200, message: "操作成功", data: data });
          return;
        }
        let result = docs.filter((v, i) => {
          return v.parentId === v.articleId;
        });
        for (let v of result) {
          for (let obj of docs) {
            if (obj.parentId == v._id) {
              v.subCommentList.push(obj);
            }
          }
        }
        var data = {
          totalCount: totalCount,
          list: result
        };
        res.json({ status: 200, message: "操作成功", data: data });
        return;
      });
  }
});

// 新增评论
api.post("/api/addComment", function (req, res) {
  var DB = db.CommentList;
  var data = req.body;
  DB(data).save(function (err, result) {
    if (err) {
      console.log("出错" + err);
      return;
    }
    if (result) {
      // 同时把该文章的 commentCount + 1
      var DB2 = db.ArticleList;
      DB2.find({ _id: req.body.articleId }, function (err, docs) {
        if (err) {
          return;
        }
        docs[0].commentCount = docs[0].commentCount
          ? ++docs[0].commentCount
          : 1;
        DB2(docs[0]).save(function (err) {
          if (err) {
            res.json({ status: 500, message: "操作失败" });
            return;
          }
          res.json({ status: 200, message: "操作成功" });
        });
      });
    }
  });
});

// 点赞评论
api.post("/api/setCommentLikeCount", function (req, res) {
  var DB = db.CommentList;
  var data = req.body;
  DB.find({ _id: req.body._id }, function (err, docs) {
    if (err) {
      return;
    }
    docs[0].likeCount++;
    DB(docs[0]).save(function (err) {
      if (err) {
        res.json({ status: 500, message: "操作失败" });
        return;
      }
      res.json({ status: 200, message: "操作成功" });
    });
  });
});

// 删除评论
api.post("/api/removeComment", function (req, res) {
  var DB = db.CommentList;
  DB.remove({ _id: req.body._id }, function (err, docs) {
    if (err) {
      res.json({ status: 500, message: "操作失败" });
      return;
    }
    res.json({ status: 200, message: "操作成功" });
  });
});

// 图片上传
var multer = require("multer");
var upload = multer({ dest: "./upload/" });
// 图片上传
api.all("/api/uploadFile", upload.single("file"), function (req, res, next) {
  console.log(req.file);
  // 文件路径
  var filePath = "./" + req.file.path;
  // 文件类型
  var temp = req.file.originalname.split(".");
  var fileType = temp[temp.length - 1];
  var lastName = "." + fileType;
  // 构建图片名
  var fileName = Date.now() + lastName;
  // 图片重命名
  fs.rename(filePath, fileName, (err) => {
    if (err) {
      res.json({ status: 500, message: "文件写入失败" });
    } else {
      var localFile = "./" + fileName;
      var key = "ning-ui-blog/" + fileName;
      // 阿里云 上传文件
      co(function* () {
        CLIENT.useBucket(ALI_OSS.bucket);
        var result = yield CLIENT.put(key, localFile);
        console.log(result);
        // 上传之后删除本地文件
        fs.unlinkSync(localFile);
        // 设置超时时间
        // var Expires = new Date('2028-01-01').getTime();
        // store.getRtmpUrl('123', {
        //   expires: 3600
        // });
        // console.log(url);
        res.json({
          status: 200,
          message: "上传成功",
          imageUrl: result.url
        });
      }).catch(function (err) {
        console.log(err);
        // 上传之后删除本地文件
        fs.unlinkSync(localFile);
        res.json({
          status: 500,
          message: "上传失败",
          error: JSON.stringify(err)
        });
      });
    }
  });
});

Date.prototype.Format = function (param) {
  let fmt = param || "yyyy-MM-dd hh:mm:ss";
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

module.exports = api;
