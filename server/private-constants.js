var OSS = require('ali-oss');

var CLIENT = new OSS({
	region: 'oss-cn-shenzhen',
	accessKeyId: 'LTAIhIcAZXMgRyOE',
	accessKeySecret: 'vncv3gGjyroZFcONzGKvre1OgEKWix',
	secure: true,
});

var ALI_OSS = {
	bucket: 'zongyuan',
	dirName: 'ning-ui-blog',
	endPoint: 'oss-cn-shenzhen.aliyuncs.com',
};

var MONGODB_CONNECT_STR =
	'mongodb://root:nzy960402nzy@127.0.0.1:27017/test?authSource=admin';

module.exports = { CLIENT, ALI_OSS, MONGODB_CONNECT_STR };
