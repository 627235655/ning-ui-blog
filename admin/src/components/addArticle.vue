<template>
    <div id="add_article">
        <h2 class="page-title">新增文章</h2>
        <divider></divider>
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
                <!-- <div class="ning-form-item">
                    <label for="article_name">文章内容</label>
                    <input class="flex-1" type="text" placeholder="请在下方 markdown 编辑器中输入" disabled>
                </div> -->
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
                <button class="collapsed-btn" @click="collapsed = !collapsed">{{ collapsed ? '继续编辑' : '预览文章' }}</button>
                <div class="article_preview-header" :style="{backgroundImage: 'url(' + (data.thumbnailUrl) + ')'}">
                    <h2 class="article_preview-title">{{ data.articleName }}</h2>
                    <p class="article_preview-tags" v-if="data.articleTags.length > 0">
                        标签：
                        <span v-for="item in data.articleTags">{{ `【${item}】` }}</span>
                    </p>
                </div>
                <div id="articleContentResult" v-highlight></div>
                <p class="count">字数统计:<span> {{data.articleContentLength}} </span></p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import showdown from 'showdown';
import notify from '../assets/ning-ui/js/notify'

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
        this.el_articleContent = document.getElementById("articleContent");
        this.el_articleContentResult = document.getElementById("articleContentResult");
        this.getTagList();
        this.data._id = this.$route.query._id;
        // 有id 则为编辑
        this.data._id && this.getArticleDetail(this.data._id);
    },
    methods: {
        renderMarkDown(value, render) {
            //获取要转换的文字
            var text = value;
            //创建实例
            var converter = new showdown.Converter();
            //进行转换
            var html = converter.makeHtml(text);
            //展示到对应的地方  result便是id名称
            this.el_articleContentResult.innerHTML = html;
            this.data.articleContentResult = html;
            this.data.articleContentLength = this.data.articleContent.replace(/#/g, "").replace(/\s+/g, "").length;
        },
        addArticle() {
            let self = this;
            let data = self.data;
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
            console.log(data)
            if (data._id) {
                data.updateDate = new Date();
                axios.post('/api/updateArticle', data)
                    .then(function(response) {
                        let res = response.data;
                        if (res.status === 200) {
                            notify.success(res.message)
                            self.$router.push({ path: '/articleList' })
                        } else {
                            notify.warning(res.message)
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            } else {
                data.createDate = new Date();
                data.updateDate = new Date();
                axios.post('/api/addArticle', data)
                    .then(function(response) {
                        let res = response.data;
                        if (res.status === 200) {
                            notify.success(res.message)
                            self.$router.push({ path: '/articleList' })
                        } else {
                            notify.warning(res.message)
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        getTagList() {
            let self = this;
            axios.get('/api/getTagList')
                .then(function(response) {
                    let res = response.data;
                    if (res.status === 200) {
                        self.tagList = res.data.list;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getArticleDetail(_id) {
            let self = this;
            let data = {
                _id: _id,
            }
            axios.get('/api/getArticleDetail', { params: data })
                .then(function(response) {
                    let res = response.data;
                    if (res.status === 200) {
                        self.data = res.data;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
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
            console.log(res)
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
            padding-bottom: 8px;
            word-break: break-all;
            h3 {
                line-height: 32px;
            }
            h4 {
                line-height: 28px;
            }
            blockquote {
                padding: 8px;
                background: linear-gradient(to right, rgba(236, 242, 252, .5), rgba(236, 242, 252, 0.2));
                margin: 8px 0;
                border-left: 2px solid $blue_3;
                border-radius: 2px;
                code {
                    background: $b_c;
                }
            }
            p {
                line-height: 22px;
                 margin-top: 8px;
                img{
                    max-width: 100%;
                    max-height: 240px;
                }
            }
            ul {
                list-style: inside;
                text-indent: 2em;
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