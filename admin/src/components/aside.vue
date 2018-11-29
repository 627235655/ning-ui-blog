<template>
    <aside id="aside" :class="{active: collapsed}">
        <button class="aside-collapsed-btn" @click="collapsed = !collapsed">{{ collapsed ? '展开' : '收起' }}</button>
        <router-link class="aside-nav-item" to="/home">主页</router-link>
        <router-link class="aside-nav-item" to="/addArticle">新增文章</router-link>
        <router-link class="aside-nav-item" to="/articleList">文章列表</router-link>
        <router-link class="aside-nav-item" to="/tagPage">标签页</router-link>
        <router-link class="aside-nav-item" to="/about">关于</router-link>
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
        min-width: 100px;
        width: 100px;
        .aside-nav-item{
            padding: 0 24px;
            font-size: 12px;
            animation: fadeIn .5s;
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
        padding: 0 40px;
        height: 60px;
        transition: background color .5s;
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