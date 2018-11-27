import Vue from 'vue'
import App from './App.vue'
import router from "./router/router.js"
import common from './assets/ning-ui/js/ning-ui'
import hljs from 'highlight.js' // 引入JS
import 'highlight.js/styles/ocean.css' //样式文件

common.init()

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
