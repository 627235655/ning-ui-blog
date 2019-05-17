<template>
    <aside id="aside" :class="{active: collapsed}">
        <button class="aside-collapsed-btn" @click="collapsed = !collapsed">{{ collapsed ? '展开' : '收起' }}</button>
        <router-link class="aside-nav-item" to="/home"><i class="ning-icon icon-home m-r-sm"></i>主页</router-link>
        <router-link class="aside-nav-item" to="/addArticle"><i class="ning-icon icon-add m-r-sm"></i>新增文章</router-link>
        <router-link class="aside-nav-item" to="/articleList"><i class="ning-icon icon-article m-r-sm"></i>文章列表</router-link>
        <router-link class="aside-nav-item" to="/tagPage"><i class="ning-icon icon-tag m-r-sm"></i>标签页</router-link>
        <router-link class="aside-nav-item" to="/commentList"><i class="ning-icon icon-comment m-r-sm"></i>评论管理</router-link>
        <router-link class="aside-nav-item" to="/about"><i class="ning-icon icon-about m-r-sm"></i>关于</router-link>
    </aside>
</template>

<script>

export default {
    data () {
        return {
            collapsed: false,
        }
    }
}
</script>

<style lang="scss">
#aside{
    position: relative;
    min-width: 200px;
    width: 200px;
    padding-left: $md;
    margin: $lg 0;
    border-right: 1px solid $b_c;
    transition: ease-in .25s;
    &.active{
        min-width: 80px;
        width: 80px;
        .aside-nav-item{
            padding: 0 20px;
            font-size: 0;
        }
        &+.page-container{
            #home canvas{
                height: 330px !important;
            }
        }
    }
    .aside-collapsed-btn{
        position: absolute;
        z-index: 1;
        right: -26px;
        top: 120px;
        width: 26px;
        height: 60px;
        border: 1px dashed $b_c;
        border-left: none;
        border-right: none;
        background-color: #fff;
        color: $gray;
        transition: .25s;
        &:hover{
          font-weight: bold;
          color: $blue-3;
        }
    }
    .aside-nav-item{
        display: inline-flex;
        align-items: center;
        position: relative;
        width: 100%;
        padding: 0 32px;
        height: 60px;
        transition: background color .5s;
        animation: fadeIn 1s;
        cursor: pointer;
        &::after {
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            height: 100%;
            width: 6px;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            background: #4284ed;
            box-shadow: 1px 0 12px 0 #4284ed;
            opacity: 0;
            transition: opacity.5s;
        }
        &:hover {
            background: rgba(236, 242, 252, 0.2);
            color: #4284ed;
        }
        &.router-link-exact-active,
        &.router-link-active {
            background: linear-gradient(to right, rgba(236, 242, 252, .8),rgba(236, 242, 252, 0.2));
            color: #4284ed;
            font-weight: bold;
            &::after {
                opacity: 1;
            }
        }
    }
}
</style>