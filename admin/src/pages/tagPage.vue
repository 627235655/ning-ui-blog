<template>
    <div id="add_tag">
        <h2 class="page-title">标签页</h2>
        <hr />
        <div class="ning-row">
            <div class=" col-6 border p-md">
                <div class="example-box flex-col-box">
                    <table class="ning-border-table">
                        <thead>
                            <tr>
                                <th>标签名</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tagList">
                                <td>{{item.tagName}}</td>
                                <td>
                                    <button class="ning-btn _xs" @click="setUpdate(item)">编辑</button>
                                    <button class="ning-btn _xs _red m-l-md" @click="openRemoveModal(item)">删除</button>
                                </td>
                            </tr>
                            <tr v-if="tagList.length === 0">
                                <td class="no-data" colSpan="99"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="ning-paginator xs" id="tag_list_paginator">
                    </div>
                </div>
            </div>
            <form action="" class="ning-form flex-1 m-l-md border">
                <div class="ning-form-item">
                    <label for="tag_name">标签名</label>
                    <input class="flex-1" type="text" id="tag_name" v-model="data.tagName" autocomplete="off">
                </div>
                <div class="ning-form-item flex-allcenter-box">
                    <button class="ning-btn" @click="addOrUpdateTag">保存</button>
                </div>
            </form>
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
                    <button class="ning-btn confrim-btn" @click="removeTag">确定</button>
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
    name: 'add_tag',
    data() {
        return {
            data: {
                tagName: '',
            },
            tagList: [],
            is_add: true,
            el_tag_name: null,
            currentPage: 1,
            pageSize: 10,
            totalCount: 0,
        }
    },
    mounted: function() {
        this.el_tag_name = document.getElementById('tag_name');
        this.getTagList(this.currentPage);
    },
    methods: {
        getTagList(currentPage) {
            let self = this;
            self.currentPage = currentPage;
            let data = {
                currentPage: self.currentPage,
                pageSize: self.pageSize,
            }
            axios.get('/api/getTagList', { params: data })
                .then(function(response) {
                    let res = response.data;
                    if (res.status === 200) {
                        if (self.currentPage > 1 && res.data.list.length === 0) {
                            self.currentPage--;
                            self.getTagList(self.currentPage);
                        }
                        self.tagList = res.data.list;
                        self.totalCount = res.data.totalCount;
                        let params = {
                            element: document.querySelector('#tag_list_paginator'),
                            current_page: self.currentPage,
                            total_count: self.totalCount,
                            page_size: self.pageSize,
                            cb: self.getTagList,
                        }
                        paginator.init(params)
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        addTag() {
            let self = this;
            let data = self.data;
            if (!data.tagName) {
                notify.warning('请输入标签名!');
                return;
            }
            axios.post('/api/addTag', data)
                .then(function(response) {
                    let res = response.data;
                    if (res.status === 200) {
                        notify.success(res.message)
                        self.data.tagName = '';
                        self.getTagList(self.currentPage);
                    } else {
                        notify.warning(res.message)
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        setUpdate(item) {
            let self = this;
            self.is_add = false;
            self.data = item;
            self.el_tag_name.focus();
        },
        updateTag() {
            let self = this;
            axios.post('/api/updateTag', self.data)
                .then(function(response) {
                    let res = response.data;
                    if (res.status === 200) {
                        notify.success(res.message)
                        self.data.tagName = '';
                        self.is_add = true;
                        self.getTagList(self.currentPage);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });

        },
        addOrUpdateTag() {
            let self = this;
            self.is_add ? self.addTag() : self.updateTag();
        },
        openRemoveModal(item) {
            this.item = item;
            modal.open('remove_modal');
        },
        removeTag() {
            let self = this;
            let data = {
                _id: self.item._id,
            }
            axios.post('/api/removeTag', data)
                .then(function(response) {
                    let res = response.data;
                    if (res.status === 200) {
                        modal.close('remove_modal');
                        notify.success(res.message)
                        self.getTagList(self.currentPage);
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
</style>