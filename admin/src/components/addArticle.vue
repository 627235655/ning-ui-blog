<template>
    <div id="add_article">
       <h2 class="page-title">新增文章</h2>
       <divider></divider>
       <div class="ning-row">
         <form action="" class="ning-form col-6 border">
            <div class="ning-form-item">
                <label for="article_name">文章标题</label>
                <input class="flex-1" type="text"  id="article_name" v-model="data.article_name">
            </div>
            <div class="ning-form-item">
                <label for="article_name">文章标签</label>
                <div class="checkbox-wrap">
                  <span v-for="item in tagList">
                    <input type="checkbox"/><span class="virtual-checkbox"></span>{{ item.tagName }}
                  </span>
                </div>
            </div>
            <div class="ning-form-item">
                <label for="article-content">文章内容</label>
                <div class="flex-1 ning-row">
                  <textarea id="article_content" v-on:input="renderMarkDown" v-model="data.article_content"></textarea>
                </div>
            </div>
            <div class="ning-form-item flex-allcenter-box">
                <button class="ning-btn" @click="saveData(data)">保存</button>
            </div>
          </form>
          <div class="border flex-1 m-l-md p-md">
            <h3 class="tc m-b-md">{{ data.article_name }}</h3>
            <div id="article_content_result"></div>
          </div>
       </div>
    </div>
</template>

<script>
import axios from 'axios';
import showdown from 'showdown';
import notify from '../assets/ning-ui/js/notify'
import autoTextarea from '../assets/ning-ui/js/autoTextarea'


export default {
    name:'add_article',
    data () {
        return {
          data: {
            article_name: '',
            article_content: '',
          },
          tagList: [],
        }
    },
    mounted: function(){
      this.initAutoTextarea();
      this.getTagList();
    },
    methods: {
      renderMarkDown() {
        //获取要转换的文字
        var text = document.getElementById("article_content").value;
        //创建实例
        var converter = new showdown.Converter();
        //进行转换
        var html = converter.makeHtml(text);
        //展示到对应的地方  result便是id名称
        document.getElementById("article_content_result").innerHTML = html;
      },
      initAutoTextarea() {
        var text = document.getElementById("article_content");
        autoTextarea(text);// 调用
      },
      saveData(data ) {
        if (!data.article_name) {
          notify.warning('请输入文章标题!');
          return;
        }
        if (!data.article_content) {
          notify.warning('请输入文章内容!');
          return;
        }
        console.log(data)
      },
      getTagList() {
        let self = this;
        axios.get('/api/getTagList')
        .then(function (response) {
          let res = response.data;
          if (res.status === 200) {
            self.tagList = res.data.list;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
}
</script>

<style lang="scss">
#add_article{
    #article_content_result{
      word-break: break-all;
    }
    #article_content {
        display: block;
        overflow: hidden;
    }
}
</style>