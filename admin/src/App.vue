<template>
    <div id="app">
        <Header></Header>
        <div class="container">
            <Aside></Aside>
            <div class="page-container">
                <router-view class="fade-in"></router-view>
            </div>
        </div>
        <Footer></Footer>
        <button :class="{active: show_return_top}" class="return-top" @click="returnTop(10)">返回顶部</button>
    </div>
</template>
<script>
import Footer from './components/footer.vue';
import Header from './components/header.vue';
import Aside from './components/aside.vue';


export default {
    name: 'app',
    components: {
        Footer,
        Header,
        Aside,
    },
    data() {
        return {
            show_return_top: false,
        }
    },
    mounted: function() {
        let self = this;
        Math.easeout = function(A, B, rate, callback) {
            if (A == B || typeof A != 'number') {
                return;
            }
            B = B || 0;
            rate = rate || 2;

            var step = function() {
                A = A + (B - A) / rate;

                if (A < 1) {
                    callback(B, true);
                    return;
                }
                callback(A, false);
                requestAnimationFrame(step);
            };
            step();
        };
        window.onscroll = function(e) {
            var doc = document.body.scrollTop ? document.body : document.documentElement;
            self.show_return_top = (doc.scrollTop - doc.clientHeight) > 0;
        }

    },
    methods: {
        // 滚动到顶部缓动实现
        // rate表示缓动速率，默认是2
        // author: https://www.zhangxinxu.com
        returnTop(rate) {
            var doc = document.body.scrollTop ? document.body : document.documentElement;
            Math.easeout(doc.scrollTop, 0, rate, function(value) {
                doc.scrollTop = value;
            });
        }
    }
}
</script>
<style lang="scss">
#app {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.fade-in {
    animation: 1s ease fadeIn;
}
.container{
    display: flex;
    min-height: calc(100vh - 140px);
}

.page-container{
    flex: 1;
    padding: $lg;
}

.return-top {
    position: fixed;
    right: 16px;
    bottom: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid $b_c;
    background: #fff;
    box-shadow: 0 4px 10px -2px $gray;
    font-size: 12px;
    color: $gray;
    opacity: 0;
    transform: scale(0);
    transition: .5s;
    &:hover{
        color: $blue-3;
        font-weight: bold;
        box-shadow: 0 4px 10px -2px $blue-3;
    }
    &.active {
        opacity: 1;
        transform: scale(1);
    }
}
</style>