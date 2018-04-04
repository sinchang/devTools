<template>
  <div class="container">
    <el-alert
      class="page-title"
      :closable="false"
      title="DevTools: 短链接生成"
      type="info">
    </el-alert>
    <el-input type="input" v-model="src" :rows="5"></el-input>
    <el-form :inline="true" size="mini" class="form">
      <el-radio v-model="radio" label="weibo">t.cn</el-radio>
      <el-radio v-model="radio" label="tinyurl">tinyurl.com</el-radio>
      <el-button-group :style="{ float: 'right', marginBottom: '10px' }">
        <el-button type="primary" size="mini" @click="create" :style="{marginLeft: '10px'}">Create</el-button>
        <el-button type="primary" size="mini" v-copy:callback="copy" v-copy="result">Copy Result</el-button>
      </el-button-group>
    </el-form>
    <el-input type="input" v-model="result" :rows="5"></el-input>
  </div>
</template>

<script>
import Http from '../common/api'
export default {
  name: 'ShortUrk',
  data() {
    return {
      src: '',
      result: '',
      radio: 'weibo'
    }
  },
  created() {
    const self = this
    chrome.runtime.onMessage.addListener(request => {
      if (request.type === 'shorturl') {
        self.src = request.content
        self.getShortUrl('weibo', self.src)
      }
    })
  },
  methods: {
    async getShortUrl(site, url) {
      Http({
        url: `https://egg-shorturl-api.herokuapp.com?site=${site}&url=${url}`
      })
        .then(data => {
          this.result = data.url
        })
        .catch(error => {
          this.$message({
            message: error.data.message || error,
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
  }
}
</script>

<style lang="less" scoped>
.form {
  margin: 10px auto;
}
</style>
