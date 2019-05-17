import Vue from 'vue'
import App from './App.vue'
import router from "./router/router.js"
import hljs from 'highlight.js' // 引入JS
import 'highlight.js/styles/ocean.css' //样式文件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)


Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})

Vue.config.productionTip = false

new Vue({
  router,  // 注入到根实例中
  render: h => h(App),
}).$mount('#app')
