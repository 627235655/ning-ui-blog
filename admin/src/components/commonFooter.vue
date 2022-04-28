<template>
  <footer class="ning-row">
    <div class="last-content">
      <span>Designed & Powerd by zongyuan.ning</span>
      <span>Copyright© 2019 - 2019 n顾盼神飞</span>
      <span>蜀 ICP 备 19016370 号</span>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
footer {
  box-shadow: 0 -2px 16px 0 rgba(223, 225, 230, 0.5);
  .last-content {
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 0 25%;
    line-height: 80px;
    font-size: 12px;
    color: $gray;
  }
}
</style>
