<template>
  <div class="container">
    <el-alert
      class="page-title"
      :closable="false"
      title="DevTools: 短链接生成还原"
      type="info">
    </el-alert>
    <el-input type="input" v-model="src" :rows="5"></el-input>
    <el-form :inline="true" size="mini" class="form">
      <el-radio v-model="radio" label="weibo">t.cn</el-radio>
      <el-radio v-model="radio" label="tinyurl">tinyurl.com</el-radio>
      <el-button-group :style="{ float: 'right', marginBottom: '10px' }">
        <el-button type="primary" size="mini" @click="create" :style="{marginLeft: '10px'}">Create</el-button>
        <!-- <el-button type="primary" size="mini" @click="recovery">Recovery</el-button> -->
        <el-button type="primary" size="mini" v-copy:callback="copy" v-copy="result">Copy Result</el-button>
      </el-button-group>
    </el-form>
    <el-input type="input" v-model="result" :rows="5"></el-input>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ShortUrk',
  data() {
    return {
      src: '',
      result: '',
      radio: 'weibo'
    }
  },
  methods: {
    async getShortUrl(site, url) {
      axios(`https://egg-shorturl-api.herokuapp.com?site=${site}&url=${url}`)
        .then(data => {
          this.result = data.data.url
        })
        .catch(error => {
          this.$message({
            message: error.response.data.message || error.message,
            type: 'error'
          })
        })
    },
    create() {
      this.getShortUrl(this.radio, this.src)
    },
    copy() {
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    }
    // recovery() {}
  }
}
</script>

<style lang="less" scoped>
.form {
  margin: 10px auto;
}
</style>
