<template>
    <div id="add_article">
        <h2 class="page-title">新增文章</h2>
        <hr/>
        <div class="ning-row">
            <div class="ning-form col-6 border" :class="{active: collapsed}">
                <div class="ning-form-item">
                    <label for="article_name">文章标题</label>
                    <input class="flex-1" type="text" id="article_name" v-model="data.articleName" autocomplete="off">
                </div>
                <div class="ning-form-item">
                    <label for="articleTags">文章标签</label>
                    <div class="checkbox-wrap">
                        <span v-for="item in tagList">
                            <input type="checkbox" :value="item.tagName" v-model="data.articleTags" :id="item._id" />
                            <span class="virtual-checkbox"></span>
                            <label :for="item._id">{{ item.tagName }}</label>
                        </span>
                    </div>
                </div>
                <div class="ning-form-item">
                    <label for="article_name">封面图</label>
                    <label class="ning-btn file-upload" for="file_upload">选择文件</label>
                    <input type="file" name="file" id="file_upload" accept="image/*" @input="uploadFile($event)" />
                    <span class="_tips m-l-md">【默认图片见右侧预览区】</span>
                </div>
                <div class="ning-form-item">
                    <label for="article_summary">文章简介</label>
                    <textarea class="flex-1" id="article_summary" v-model="data.articleSummary"></textarea>
                </div>
                <div class="flex-1 ning-row">
                        <mavon-editor
                            v-model="data.articleContent"
                            @change="renderMarkDown"
                            @imgAdd="$imgAdd"
                            ref=md
                            v-bind:subfield=false
                            codeStyle="ocean"
                            fontSize="12px"
                        />
                    </div>
                <div class="ning-form-item flex-allcenter-box">
                    <button class="ning-btn" @click="addArticle">保存</button>
                    <button class="ning-btn _green m-l-md" id="form_collapsed_btn" @click="collapsed = !collapsed">{{ collapsed ? '编辑' : '预览' }}</button>
                </div>
            </div>
            <div class="border flex-1 m-l-md p-md pos-r" id="article_preview">
                <div class="article_preview-header" :style="{backgroundImage: 'url(' + (data.thumbnailUrl) + ')'}">
                    <h2 class="article_preview-title">{{ data.articleName }}</h2>
                    <p class="article_preview-tags" v-if="data.articleTags.length > 0">
                        标签：
                        <span v-for="item in data.articleTags">{{ `【${item}】` }}</span>
                    </p>
                </div>
                <p class="ning-summary" v-if="data.articleSummary">{{ data.articleSummary }}</p>
                <div id="articleContentResult" v-highlight></div>
                <p class="count">字数统计:<span> {{data.articleContentLength}} </span></p>
            </div>
            <button class="collapsed-btn" @click="collapsed = !collapsed">{{ collapsed ? '继续编辑' : '预览文章' }}</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import showdown from 'showdown';
import notify from '../assets/ning-ui/js/notify'
import util from '../assets/ning-ui/js/utils'
import api from '../server/server'

const ThumbnailUrl = 'https://zongyuan.oss-cn-shenzhen.aliyuncs.com/ning-ui-blog/1543218076685.png'

export default {
    name: 'add_article',
    data() {
        return {
            el_articleContent: null,
            el_articleContentResult: null,
            data: {
                _id: null,
                articleName: '',
                articleTags: [],
                articleSummary: '',
                articleContent: '',
                articleContentResult: '',
                articleContentLength: 0,
                thumbnailUrl: ThumbnailUrl,
                createDate: null,
                updateDate: null,
            },
            tagList: [],
            collapsed: false,
        }
    },
    mounted: function() {
        this.getTagList();
        this.data._id = this.$route.query._id;
        this.collapsed = this.$route.query.view_type === 'detail';
        // 有id 则为编辑
        this.data._id && this.getArticleDetail(this.data._id);
    },
    methods: {
        renderMarkDown(value, render) {
            this.el_articleContent = document.getElementById("articleContent");
            this.el_articleContentResult = document.getElementById("articleContentResult");
            //展示到对应的地方
            this.el_articleContentResult.innerHTML = render;
            this.data.articleContentResult = render;
            if (!this.data.articleContentResult) {
                return
            }
            this.data.articleContentLength = util.formatHtmlStr(this.data.articleContentResult).length;
        },
        addArticle() {
            let self = this,
                data = self.data;
            if (!data.articleName) {
                notify.warning('请输入文章标题!');
                return;
            }
            if (data.articleTags.length === 0) {
                notify.warning('请选择文章标签!');
                return;
            }
            if (!data.articleContent) {
                notify.warning('请输入文章内容!');
                return;
            }
            if (data._id) {
                data.updateDate = new Date();
                let url = api.updateArticle,
                    cb = res => {
                        notify.success(res.message)
                        self.$router.push({ path: '/articleList' })
                    };
                util.axiosFn(url, data, 'post', cb);
            } else {
                data.createDate = new Date();
                data.updateDate = new Date();
                let url = api.addArticle,
                    cb = res => {
                        notify.success(res.message)
                        self.$router.push({ path: '/articleList' })
                    };
                util.axiosFn(url, data, 'post', cb);
            }
        },
        getTagList() {
            let self = this,
                url = api.getTagList,
                data = {},
                cb = res => {
                    self.tagList = res.data.list;
                }
            util.axiosFn(url, data, 'get', cb);
        },
        getArticleDetail(_id) {
            let self = this,
                url = api.getArticleDetail,
                data = {
                    _id: _id,
                },
                cb = res => {
                    self.data = res.data;
                }
            util.axiosFn(url, data, 'get', cb);
        },
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
            let self = this;
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('file', $file);
           axios({
               url: '/api/uploadFile',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((res) => {
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */
               self.$refs.md.$img2Url(pos, res.data.imageUrl);
           })
        },
        uploadFile($event) {
            let self = this;
            var file = $event.target.files[0]; //获取文件流
            var data = new FormData();
            data.append('file', file);
            axios({
                    method: 'post',
                    url: '/api/uploadFile',
                    anync: true,
                    contentType: false,
                    processData: false,
                    data: data
                })
                .then(function(response) {
                    let res = response.data;
                    if (res.status === 200) {
                        notify.success(res.message);
                        self.data.thumbnailUrl = res.imageUrl;
                    } else {
                        notify.warning(res.message);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
    }
}
</script>
<style lang="scss">
#add_article {
    .ning-form {
        transition: ease-in .25s;
        &.active {
            width: 130px;
            height: 100vh;
            overflow: hidden;
            .ning-form-item {
                opacity: .25;
                label {
                    text-align: center;
                }
            }
            .ning-form-file-upload-img {
                max-width: 90px;
                margin-left: 0;
            }
            #form_collapsed_btn {
                margin-left: 0;
            }
            .markdown-body{
                min-width: auto;
                width: 113px;
            }
        }
    }
    .ning-form-file-upload-img {
        max-height: 80px;
        margin-left: 12px;
        border-radius: 2px;
    }
    #article_preview {
        .article_preview-header {
            height: 180px;
            margin-bottom: 8px;
            border-radius: 4px;
            background: $dark center/cover;
            color: #fff;
            text-align: center;
        }
        .article_preview-title {
            position: relative;
            top: 100px;
        }
        .article_preview-tags {
            position: relative;
            top: 100px;
            font-size: 12px;
        }
        #articleContentResult {
            padding-bottom: 16px;
        word-break: break-all;
        h2 {
            font-size: 24px;
            line-height: 48px;
        }
        h3 {
            font-size: 20px;
            line-height: 40px;
            & + h4{
                margin-top: 16px;
            }
        }
        h4 {
            font-size: 16px;
            line-height: 32px;
        }
        li{
            margin-top: 16px;
        }
        blockquote {
            padding: 16px;
            background: linear-gradient(to right, rgba(236, 242, 252, .5), rgba(236, 242, 252, 0.2));
            margin: 16px 0;
            border-left: 4px solid $blue_3;
            border-radius: 2px;
            p{
                margin: 0;
            }
            code {
                background: $b_c;
            }
        }
        p {
            margin-top: 16px;
            line-height: 22px;
            word-break: break-word;
            & + p,
            & + li,
            & + ul,
            & + pre,
            & + h3,
            & + h4{
                margin-top: 16px;
            }
        }
        img{
            max-width: 80%;
            max-height: 400px;
            margin: 16px 10%;
        }
        ul {
            list-style: inside;
            text-indent: 2em;
            & + h3,
            & + h4{
                margin-top: 16px;
            }
        }
        pre{
            margin: 16px 0;
            & + h3,
            & + h4{
                margin-top: 16px;
            }
        }
        }
        .count {
            position: absolute;
            bottom: 4px;
            right: 8px;
            font-size: 12px;
            color: $gray;
        }
    }
    #articleContent {
        display: block;
        overflow: hidden;
    }
    .collapsed-btn {
        position: fixed;
        z-index: 999;
        right: 16px;
        bottom: 120px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid $b_c;
        background: #fff;
        box-shadow: 0 4px 10px -2px $gray;
        font-size: 12px;
        color: $gray;
        transition: .5s;
        &:hover {
            color: $blue-3;
            font-weight: bold;
            box-shadow: 0 4px 10px -2px $blue-3;
        }
    }
    .markdown-body{
        margin-top: 16px;
        .shadow{
            border: 1px dashed $b_c;
            box-shadow: none;
            &:nth-child(1){
                border-bottom: none;
                border-radius: 4px 4px 0 0;
            }
            &:nth-child(2){
                 border-radius: 0 0 4px 4px;
            }
        }
    }
}
</style>