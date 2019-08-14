import axios from 'assets/js/axios';

const server = {
	imgPath: {},
	logOut: '/api/logOut',
	isSignIn: '/api/isSignIn',
	updateArticle: '/api/updateArticle',
	getArticleDetail: '/api/getArticleDetail',
	getArticleList: '/api/getArticleList',
}

export default server

// 获取文章列表
export const getArticleList = params =>
    axios
        .get(server.getArticleList, {params})
        .then(res => res)
        .catch();
