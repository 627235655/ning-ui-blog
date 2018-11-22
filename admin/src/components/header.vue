<template>
    <header>
        <nav class="flex-box">
            <ul class="flex-box flex-1">
                <li><a href="/index.html/#/home" target="_blank">Index</a></li>
                <li class="flex-1 flex-end sign-box">
                    <a href="#/profile">你好，12312</a>
                    <span>
                        <a href="#/login">登录</a>
                        <a href="#/login?signup=1">注册</a>
                    </span>
                </li>
            </ul>
        </nav>
    </header>
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
header{
    text-align: center;
    box-shadow: 0 2px 16px 0 rgba(223, 225, 230, 0.5);
    background: #fff;
    nav{
        width: 1200px;
        margin: auto;
        li{
            &.active a{
                color: $blue;
                font-weight: bold;
            }
            a{
                line-height: 60px;
                padding: 0 $md;
            }
        }
        .sign-box{
            a{
                padding: 0 $sm;
                font-size: 12px;
                color: $gray;
            }
        }
    }
}
</style>