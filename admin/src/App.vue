<template>
  <div id="app">
    <Header></Header>
    <div class="flex-box flex-1">
      <Aside></Aside>
      <div class="flex-1 p-lg">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
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
  }
}
</script>

<style>
#app{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
