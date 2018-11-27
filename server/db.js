var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true },(err,res)=>{
    if(err){
        console.log(err)
    }
})


var navListSchema = new mongoose.Schema({
	id: String,
	text: String,
})

var tagListSchema = new mongoose.Schema({
	id: String,
	tagName: String,
})

var ArticleListSchema = new mongoose.Schema({
	id: String,
	articleName: String,
    articleTags: Array,
    articleContent: String,
    articleContentResult: String,
    articleContentLength: Number,
    thumbnailUrl: String,
    createDate: Date,
    updateDate: Date,
})

var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
})

var Models = {
	NavList: mongoose.model('NavList', navListSchema),
	TagList: mongoose.model('TagList', tagListSchema),
	ArticleList: mongoose.model('ArticleList', ArticleListSchema),
	User: mongoose.model('User', UserSchema),
}

module.exports = Models
