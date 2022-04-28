import Vue from 'vue';
import VueRouter from 'vue-router';
import about from '../pages/about.vue';
import addArticle from '../pages/addArticle.vue';
import articleList from '../pages/articleList.vue';
import commentList from '../pages/commentList.vue';
// 引入组件
import home from '../pages/home.vue';
import tagPage from '../pages/tagPage.vue';

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: home,
  },
  {
    path: '/about',
    component: about,
  },
  {
    path: '/addArticle',
    component: addArticle,
  },
  {
    path: '/articleList',
    component: articleList,
  },
  {
    path: '/tagPage',
    component: tagPage,
  },
  {
    path: '/commentList',
    component: commentList,
  },
  // 重定向
  {
    path: '/',
    redirect: '/home',
  },
];

var router = new VueRouter({
  routes,
});
export default router;
