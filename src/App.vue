<template>
  <div id="app">
    <!-- <el-button>默认按钮</el-button> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>

<style lang="less">
.container {
  max-width: 1250px;
  margin: 0 auto;
}

.page-title {
  margin: 20px auto;
}
</style>
