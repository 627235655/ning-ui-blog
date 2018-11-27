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
                    <img class="ning-form-file-upload-img ning-thumbnail" :src="data.thumbnailUrl">
                </div>
                <div class="ning-form-item">
                    <label for="article-content">文章内容</label>
                    <div class="flex-1 ning-row">
                        <textarea id="articleContent" @input="renderMarkDown" v-model="data.articleContent"></textarea>
                    </div>
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
import autoTextarea from '../assets/ning-ui/js/autoTextarea'

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
        autoTextarea(this.el_articleContent);
        this.getTagList();
        this.data._id = this.$route.query._id;
        // 有id 则为编辑
        this.data._id && this.getArticleDetail(this.data._id);
    },
    methods: {
        renderMarkDown() {
            //获取要转换的文字
            var text = this.el_articleContent.value;
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
                        self.el_articleContent.value = self.data.articleContent;
                        self.el_articleContent.focus();
                        self.renderMarkDown();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        uploadFile($event){
            let self = this;
            var file = $event.target.files[0]; //获取文件流
            var data =  new FormData();
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
            #form_collapsed_btn{
              margin-left: 0;
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
            blockquote{
              padding: 8px;
              background: linear-gradient(to right, rgba(236, 242, 252, .5),rgba(236, 242, 252, 0.2));
              margin: 8px 0;
              border-left: 2px solid $blue_3;
              border-radius: 2px;
              code{
                  background: $b_c;
              }
            }
            p {
                line-height: 22px;
                &+p {
                    margin-top: 8px;
                }
            }
            ul{
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
        position: absolute;
        z-index: 1;
        left: -18px;
        top: 50%;
        width: 18px;
        height: 80px;
        padding: 0;
        border: 1px dashed $b_c;
        border-left: none;
        border-right: none;
        background-color: #fff;
        color: $gray;
        transition: .25s;
        &:hover {
            font-weight: bold;
            color: $blue-3;
        }
    }
}
</style>