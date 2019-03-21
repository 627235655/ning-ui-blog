<template>
    <div id="comment_list">
        <h2 class="page-title">评论列表</h2>
        <divider></divider>
        <div class="border p-md">
            <div class="ning-row ning-from m-b-md">
                <div class="ning-form-item col-6">
                    <label>文章标题</label>
                    <input type="text">
                    <button class="ning-btn m-l-md" @click="getCommentList(currentPage)">搜索</button>
                </div>
            </div>
            <div class="col-12">
                <table class="ning-border-table">
                    <thead>
                        <tr>
                            <th>文章标题</th>
                            <th>评论人</th>
                            <th>评论内容</th>
                            <th>评论人邮箱</th>
                            <th>评论人网站</th>
                            <th>评论时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in commentList">
                            <td>
                                <router-link :to="{path: '/addArticle', query: {_id: item._id, view_type: 'detail'}}">
                                    《{{item.articleName}}》
                                </router-link>
                            </td>
                            <td>
                                {{item.userName}}
                            </td>
                            <td>
                                <span v-if="item.content.length >= 10" class="ning-prompt-trigger" :data-prompt="'{content: ' + item.content +'}'">
                                    {{item.content.substring(0, 9) + '...'}}
                                </span>
                                <span v-if="item.content.length < 10">
                                    {{item.content}}
                                </span>
                            </td>
                            <td>{{item.email}}</td>
                            <td class="_xs"><a :href="item.website" target="_blank">{{item.website}}</a></td>
                            <td class="_xs">{{new Date(item.createDate).Format()}}</td>
                            <td>
                                <button class="ning-btn _xs _red" @click="openRemoveModal(item)">删除</button>
                            </td>
                        </tr>
                        <tr v-if="commentList.length === 0">
                            <td class="no-data" colSpan="99"></td>
                        </tr>
                    </tbody>
                </table>
                <div class="ning-paginator" id="comment_list_paginator">
                </div>
            </div>
        </div>
        <!-- 删除 -->
        <div class="ning-modal" tabindex="-1" id="remove_modal">
            <div class="ning-modal-dialog" style="width: 300px;">
                <div class="ning-modal-hd">
                    <span class="modal-title">删除</span>
                    <a href="javascript: void(0)" class="ning-modal-close-btn cancle-modal-btn" data-modal-close>&times;</a>
                </div>
                <div class="ning-modal-bd m-t-md">
                    <p class="p-b-md b-b tc">请确认是否删除此条数据?</p>
                    <div class="flex-allcenter-box m-t-md">
                        <button class="ning-btn m-r-md _white cancle-modal-btn">关闭</button>
                        <button class="ning-btn confrim-btn" @click="removeComment">确定</button>
                    </div>
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

export default {
    name: 'comment_list',
    data() {
        return {
            commentList: [],
            currentPage: 1,
            pageSize: 20,
            totalCount: 0,
            item: {},
            filter: {
            }
        }
    },
    mounted: function() {
        this.getCommentList(this.currentPage);
    },
    methods: {
        getCommentList(currentPage) {
            let self = this;
            self.currentPage = currentPage;
            self.startDate && self.filter.createDates.push(self.startDate)
            self.endDate && self.filter.createDates.push(self.endDate)
            let data = {
                currentPage: self.currentPage,
                pageSize: self.pageSize,
                filter: self.filter,
            }
            axios.get('/api/getCommentList', { params: data })
                .then(function(response) {
                    let res = response.data;
                    if (res.status === 200) {
                        if (self.currentPage > 1 && res.data.list.length === 0) {
                            self.currentPage--;
                            self.getCommentList(self.currentPage);
                        }
                        self.commentList = res.data.list;
                        self.totalCount = res.data.totalCount;
                        let params = {
                            element: document.querySelector('#comment_list_paginator'),
                            current_page: self.currentPage,
                            total_count: self.totalCount,
                            page_size: self.pageSize,
                            cb: self.getCommentList,
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
        removeComment() {
            let self = this;
            let data = {
                _id: self.item._id,
            }
            axios.post('/api/removeComment', data)
                .then(function(response) {
                    let res = response.data;
                    if (res.status === 200) {
                        modal.close('remove_modal');
                        notify.success(res.message)
                        self.getCommentList(self.currentPage);
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