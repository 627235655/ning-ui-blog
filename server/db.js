var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var { mongodb_connect_str } = require('./alioss'); // 这里不方便暴露自己的信息， 配置可看以下注释

// mongoose.connect('mongodb://127.0.0.1:27017/test', {
// 	useNewUrlParser: true
// }, (err, res) => {
// 	if (err) {
// 		console.log(err)
// 	}
// })

// 配置密码连接
mongoose.connect(
	mongodb_connect_str,
	{
		useNewUrlParser: true,
	},
	(err, res) => {
		if (err) {
			console.log(err);
		}
	}
);

var navListSchema = new mongoose.Schema({
	id: String,
	text: String,
});

var tagListSchema = new mongoose.Schema({
	id: String,
	tagName: String,
	articleNum: Number,
});

var ArticleListSchema = new mongoose.Schema({
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

var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
});

var CommentListSchema = new mongoose.Schema({
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

var Models = {
	NavList: mongoose.model('NavList', navListSchema),
	TagList: mongoose.model('TagList', tagListSchema),
	ArticleList: mongoose.model('ArticleList', ArticleListSchema),
	User: mongoose.model('User', UserSchema),
	CommentList: mongoose.model('CommentList', CommentListSchema),
};

module.exports = Models;
