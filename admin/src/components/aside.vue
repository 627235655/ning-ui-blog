<template>
    <aside id="aside">
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
        }
    }
}
</script>

<style lang="scss">
#aside{
    width: 240px;
    padding-left: $md;
    margin: $lg 0;
    border-right: 1px solid $b_c;
    .aside-nav-item{
        display: inline-block;
        position: relative;
        width: 100%;
        padding: 0 40px;
        line-height: 50px;
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
        &.router-link-exact-active {
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