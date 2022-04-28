import { get, post } from "../assets/js/axios";

const API_PATH = {
  imgPath: {},
  signIn: "/api/signIn",
  logOut: "/api/logOut",
  isSignIn: "/api/isSignIn",
  updateArticle: "/api/updateArticle",
  getArticleDetail: "/api/getArticleDetail",
  getArticleList: "/api/getArticleList"
};

export default API_PATH;

// 登出
export const signIn = (data) => post(API_PATH.signIn, data);

// 获取文章列表
export const getArticleList = (data) => get(API_PATH.getArticleList, data);

// 登录信息获取
export const isSignIn = (data) => get(API_PATH.isSignIn, data);

// 登出
export const logOut = (data) => post(API_PATH.logOut, data);
