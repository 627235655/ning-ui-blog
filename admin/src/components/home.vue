<template>
    <div id="article_list">
       <h2 class="page-title">文章列表</h2>
       <divider></divider>
       <div class="ning-row">
          <div class=" col-12 border p-md">
            <div class="example-box flex-col-box">
                    <table class="ning-border-table">
                        <thead>
                            <tr>
                                <th>文章标题</th>
                                <th>文章标签</th>
                                <th>文章字数</th>
                                <th>文章内容</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tagList">
                                <td>《{{item.tagName}}》</td>
                                <td>《{{item.tagName}}》</td>
                                <td>《{{item.tagName}}》</td>
                                <td>《{{item.tagName}}》</td>
                                <td>
                                  <button class="ning-btn _xs" @click="setUpdate(item)">编辑</button>
                                  <button class="ning-btn _xs _red m-l-md" @click="openRemoveModal(item)">删除</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                      <button class="ning-btn m-r-md confrim-btn" @click="removeTag">确定</button>
                      <button class="ning-btn _white cancle-modal-btn">关闭</button>
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



export default {
    name:'article_list',
    data () {
        return {
          data: {
            tagName: '',
          },
          tagList: [],
          is_add: true,
          el_tag_name: null,
        }
    },
    mounted: function(){
      this.el_tag_name = document.getElementById('tag_name');
      this.getTagList();
    },
    methods: {
      getTagList() {
        let self = this;
        axios.get('/api/getTagList')
        .then(function (response) {
          let res = response.data;
          if (res.status === 200) {
            self.tagList = res.data;
          }
        })
        .catch(function (error) {
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
        .then(function (response) {
          let res = response.data;
          if (res.status === 200) {
            notify.success(res.message)
            self.data.tagName = '';
            self.getTagList();
          } else {
            notify.warning(res.message)
          }
        })
        .catch(function (error) {
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
        .then(function (response) {
          let res = response.data;
          if (res.status === 200) {
            notify.success(res.message)
            self.data.tagName = '';
            self.is_add = true;
            self.getTagList();
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      },
      addOrUpdateTag() {
        let self = this;
        self.is_add ? self.addTag(): self.updateTag();
      },
      openRemoveModal(item) {
        this.item = item;
        modal.open('remove_modal');
      },
      removeTag() {
        let self = this;
        axios.post('/api/removeTag', self.item)
        .then(function (response) {
          let res = response.data;
          if (res.status === 200) {
            modal.close('remove_modal');
            notify.success(res.message)
            self.getTagList();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      },
    }
}
</script>

<style lang="scss">
</style>