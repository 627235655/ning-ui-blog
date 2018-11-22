var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

mongoose.connect('mongodb://localhost:27017/test')

var navListSchema = new mongoose.Schema({
	id: String,
	text: String,
})

var tagListSchema = new mongoose.Schema({
	id: String,
	tagName: String,
})

var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
})

var Models = {
	NavList: mongoose.model('NavList', navListSchema),
	TagList: mongoose.model('TagList', tagListSchema),
	User: mongoose.model('User', UserSchema),
}

module.exports = Models
