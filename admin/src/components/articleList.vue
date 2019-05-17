<template>
    <div id="article_list">
        <h2 class="page-title">文章列表</h2>
        <hr/>
        <div class="border p-md">
            <div class="ning-row ning-from m-b-md">
                <div class="ning-form-item">
                    <label>文章标签</label>
                    <div class="checkbox-wrap">
                        <span v-for="item in tagList">
                            <input type="checkbox" :value="item.tagName" v-model="filter.articleTags" :id="item._id" @change="getArticleList(currentPage)" />
                            <span class="virtual-checkbox"></span>
                            <label :for="item._id">{{ item.tagName }}</label>
                        </span>
                    </div>
                </div>
                <div class="ning-form-item col-6">
                    <label>时间筛选</label>
                    <input type="date" name="startDate" v-model="startDate">
                    <span class="m-r-sm m-l-sm">-</span>
                    <input type="date" name="endDate" v-model="endDate">
                </div>
                <div class="ning-form-item col-6 flex-end">
                    <button class="ning-btn" @click="getArticleList(currentPage)">搜索</button>
                </div>
            </div>
            <div class="col-12">
                <table class="ning-border-table">
                    <thead>
                        <tr>
                            <th>文章标题</th>
                            <th>文章标签</th>
                            <th>文章字数</th>
                            <th>封面图</th>
                            <th>创建时间</th>
                            <th>更新时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in articleList">
                            <td>
                                <router-link :to="{path: '/addArticle', query: {_id: item._id, view_type: 'detail'}}">
                                    《{{item.articleName}}》
                                </router-link>
                            </td>
                            <td>
                                <span class="ning-tag" v-for="tag in item.articleTags">{{ tag }}</span>
                            </td>
                            <td>{{item.articleContentLength}}</td>
                            <td><img class="table-thumbnail ning-thumbnail" :src="item.thumbnailUrl" alt=""></td>
                            <td class="_xs">{{new Date(item.createDate).Format()}}</td>
                            <td class="_xs">{{new Date(item.updateDate).Format()}}</td>
                            <td>
                                <router-link :to="{path: '/addArticle', query: {_id: item._id, view_type: 'edit'}}">
                                    <button class="ning-btn _xs">编辑</button>
                                </router-link>
                                <button class="ning-btn _xs _red m-l-md" @click="openRemoveModal(item)">删除</button>
                            </td>
                        </tr>
                        <tr v-if="articleList.length === 0">
                            <td class="no-data" colSpan="99"></td>
                        </tr>
                    </tbody>
                </table>
                <div class="ning-paginator" id="article_list_paginator">
                </div>
            </div>
        </div>
        <!-- 删除 -->
        <div class="ning-modal-wrap" tabindex="-1" id="remove_modal">
            <div class="ning-modal" style="width: 300px;">
                <div class="ning-modal-header">
                    <span>删除</span>
                    <i class="ning-modal-close-btn ning-icon icon-plus"></i>
                </div>
                <div class="ning-modal-content">请确认是否删除此条数据?</div>
                <div class="ning-modal-footer">
                    <button class="ning-btn m-r-md _white ning-modal-close-btn">关闭</button>
                    <button class="ning-btn confrim-btn" @click="removeArticle">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import showdown from 'showdown';
import notify from '../assets/ning-ui/js/notify'
import modal from '../assets/ning-ui/js/modal'
import paginator from '../assets/ning-ui/js/paginator'
import util from '../assets/ning-ui/js/utils'

export default {
    name: 'article_list',
    data() {
        return {
            articleList: [],
            tagList: [],
            currentPage: 1,
            pageSize: 10,
            totalCount: 0,
            item: {},
            startDate: null,
            endDate: null,
            filter: {
                articleTags: [],
                createDates: [],
            }
        }
    },
    mounted: function() {
        this.getArticleList(this.currentPage);
        this.getTagList();
    },
    methods: {
        getArticleList(currentPage) {
            let self = this;
            self.currentPage = currentPage;
            self.startDate && self.filter.createDates.push(self.startDate)
            self.endDate && self.filter.createDates.push(self.endDate)
            let data = {
                currentPage: self.currentPage,
                pageSize: self.pageSize,
                filter: self.filter,
            }
            axios.get('/api/getArticleList', { params: data })
                .then(function(response) {
                    let res = response.data;
                    if (res.status === 200) {
                        if (self.currentPage > 1 && res.data.list.length === 0) {
                            self.currentPage--;
                            self.getArticleList(self.currentPage);
                        }
                        self.articleList = res.data.list;
                        self.totalCount = res.data.totalCount;
                        let params = {
                            element: document.querySelector('#article_list_paginator'),
                            current_page: self.currentPage,
                            total_count: self.totalCount,
                            page_size: self.pageSize,
                            cb: self.getArticleList,
                        }
                        paginator.init(params)
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        openRemoveModal(item) {
            this.item = item;
            modal.open('remove_modal');
        },
        removeArticle() {
            let self = this;
            let data = {
                _id: self.item._id,
            }
            axios.post('/api/removeArticle', data)
                .then(function(response) {
                    let res = response.data;
                    if (res.status === 200) {
                        modal.close('remove_modal');
                        notify.success(res.message)
                        self.getArticleList(self.currentPage);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
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
    }
}
</script>
<style lang="scss">
.table-thumbnail {
    width: 100px;
    max-height: 80px;
    margin: 8px 0;
    border-radius: 2px;
}
.ning-border-table th,
.ning-border-table td{
    padding: 0 !important;
}

</style>