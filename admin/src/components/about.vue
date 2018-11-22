<template>
    <div id="about">
       <h2 class="page-title">关于</h2>
       <divider></divider>
       <div class="ning-row">
          <div class="col-12 border p-md">
            <p>博客后台管理系统<code>v-1.0.0</code></p>
            <p>基于<code>vue-cli 3.x</code>，<code>vue 2.x</code>，<code>ning-ui 1.x</code>搭建的项目</p>
            <p>作者：<code>zongyuan.ning</code></p>
            <p><code>github</code> 地址：<code>https://github.com/627235655</code></p>
            <p><code>email</code> 地址：<code>627235655@qq.com</code></p>
          </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import showdown from 'showdown';
import notify from '../assets/ning-ui/js/notify'
import modal from '../assets/ning-ui/js/modal'

export default {
    name:'about',
    data () {
        return {
        }
    },
    mounted: function(){
    },
    methods: {
    }
}
</script>

<style lang="scss">
</style>