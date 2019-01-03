<template>
    <header>
        <nav class="flex-center-box">
            <ul class="flex-center-box flex-1">
                <li>
                    <a href="#/index/home"  class="flex-center-box">
                        <img class="logo" :src="LOGO_URL" alt="logo"/>
                    </a>
                </li>
                <li>
                    <a href="/index.html/#/index/home" target="_blank">Index</a>
                </li>
                <li class="flex-1 flex-end sign-box"  v-if="user_name">
                    <a href="#/about">Hello，{{ user_name }}</a>
                    <span class="flex-center-box" id="log_out_btn" @click="logOut()"><i class="ning-icon icon-log-out"></i></span>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script>
    import axios from 'axios';
    import notify from '../assets/ning-ui/js/notify'
    export default {
        name: 'header',
        data () {
            return {
                LOGO_URL: 'https://zongyuan.oss-cn-shenzhen.aliyuncs.com/ning-ui-blog/1543199721357.png',
                user_name: null,
            }
        },
        mounted: function() {
            this.isSignIn();
        },
        methods: {
            isSignIn() {
                let self = this;
                axios.get('/api/isSignIn')
                    .then(function(response) {
                        let res = response.data;
                        if (res.status === 200) {
                            notify.success(res.message);
                            self.user_name = res.data;
                            location.href = '#/home'
                        } else {
                            location.href = '/index.html#/index/home'
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            logOut() {
                let self = this;
                axios.post('/api/logOut')
                    .then(function(response) {
                        let res = response.data;
                        if (res.status === 200) {
                            notify.success(res.message);
                            location.href = '/index.html#/index/home'
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style lang="scss">
header{
    text-align: center;
    box-shadow: 0 2px 16px 0 rgba(223, 225, 230, 0.5);
    background: #fff;
    font-weight: bold;
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
        .logo{
            width: 40px;
            height: 40px;
            margin: 0 20px;
        }
        .sign-box{
            padding-right: 0;
            a,
            #log_out_btn{
                padding: 0 $sm;
                font-size: 12px;
                color: $gray;
                cursor: pointer;
                transition: all .25s;
                &:hover{
                    color: $blue;
                }
            }
        }
    }
}
</style>