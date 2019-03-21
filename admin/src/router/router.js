import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import home from "../components/home.vue";
import about from "../components/about.vue";
import addArticle from "../components/addArticle.vue";
import articleList from "../components/articleList.vue";
import tagPage from "../components/tagPage.vue";
import commentList from "../components/commentList.vue";


// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path:"/home",
        component: home
    },
    {
        path: "/about",
        component: about
    },
    {
        path: "/addArticle",
        component: addArticle
    },
    {
        path: "/articleList",
        component: articleList
    },
    {
        path: "/tagPage",
        component: tagPage
    },
    {
        path: "/commentList",
        component: commentList
    },
     // 重定向
    {
        path: '/',
        redirect: '/home'
    }
]

var router =  new VueRouter({
    routes
})
export default router;
