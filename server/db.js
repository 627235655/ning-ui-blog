var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var { MONGODB_CONNECT_STR } = require('./private-constants'); // 这里不方便暴露自己的信息， 配置可看以下注释

// mongoose.connect('mongodb://127.0.0.1:27017/test', {
// 	useNewUrlParser: true
// }, (err, res) => {
// 	if (err) {
// 		console.log(err)
// 	}
// })

// https://www.runoob.com/mongodb/mongodb-connections.html
// mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

// mongodb:// 这是固定的格式，必须要指定。
// username:password@ 可选项，如果设置，在连接数据库服务器之后，驱动都会尝试登录这个数据库
// host1 必须的指定至少一个host, host1 是这个URI唯一要填写的。它指定了要连接服务器的地址。如果要连接复制集，请指定多个主机地址。
// portX 可选的指定端口，如果不填，默认为27017
// /database 如果指定username:password@，连接并验证登录指定数据库。若不指定，默认打开 test 数据库。
// ?options 是连接选项。如果不使用/database，则前面需要加上/。所有连接选项都是键值对name=value，键值对之间通过&或;（分号）隔开

// 此处使用默认的 test
const dbName = 'test';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
let connectPath =
  process.env.NODE_ENV === 'development'
    ? `mongodb://127.0.0.1:27017/${dbName}`
    : MONGODB_CONNECT_STR;

// 配置密码连接
// mongoose.connect(
//   connectPath,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err, res) => {
//     if (err) {
//       console.log(`连接数据库失败~ err：`, err);
//     } else {
//       console.log(`连接数据库成功~`);
//     }
//   }
// );

mongoose.connect(connectPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.on('error', (err) => {
  console.log(`连接数据库失败~ err：`, err);
});
connection.once('open', () => {
  console.log(
    `数据库已连接成功，Server is running at:http://127.0.0.1:27017/， db is ${dbName}`
  );
});

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

var navListSchema = new mongoose.Schema({
  id: String,
  text: String,
});

var tagListSchema = new mongoose.Schema({
  id: String,
  tagName: String,
  articleNum: Number,
});

var articleListSchema = new mongoose.Schema({
  id: String,
  articleName: String,
  articleTags: Array,
  articleSummary: String,
  isPrivate: String,
  articleContent: String,
  articleContentResult: String,
  articleContentLength: Number,
  thumbnailUrl: String,
  likeCount: Number,
  readCount: Number,
  commentCount: Number,
  createDate: Date,
  updateDate: Date,
});

var commentListSchema = new mongoose.Schema({
  id: String,
  parentId: String,
  articleId: String,
  articleName: String,
  userName: String,
  toUserName: String,
  isAuthor: Number,
  email: String,
  website: String,
  content: String,
  subCommentList: Array,
  likeCount: Number,
  createDate: Date,
});

// model 第一个参数如果不带 s，影射到数据库里的 collection 名称会带上 s
// User 对应数据库中是 users 数据库中为小写
// NavList -> navlists
const Models = {
  NavList: mongoose.model('NavList', navListSchema),
  TagList: mongoose.model('TagList', tagListSchema),
  ArticleList: mongoose.model('ArticleList', articleListSchema),
  User: mongoose.model('User', UserSchema),
  CommentList: mongoose.model('CommentList', commentListSchema),
};

module.exports = Models;
