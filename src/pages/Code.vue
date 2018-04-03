<template>
  <div class="container">
    <el-alert
      class="page-title"
      :closable="false"
      title="DevTools: 字符串编解码"
      type="info">
    </el-alert>
    <el-input type="input" v-model="src" :rows="5"></el-input>
    <el-form :inline="true" size="mini" class="form">
      <el-radio v-model="radio" label="1">URL 编码</el-radio>
      <el-radio v-model="radio" label="2">URL 解码</el-radio>
      <el-radio v-model="radio" label="3">base64 编码</el-radio>
      <el-radio v-model="radio" label="4">base64 解码</el-radio>
      <el-button-group :style="{ float: 'right', marginBottom: '10px' }">
        <el-button type="primary" size="mini" @click="encode">Encode</el-button>
        <el-button type="primary" size="mini" @click="decode">Decode</el-button>
        <el-button type="primary" size="mini" v-copy:callback="copy" v-copy="result">Copy</el-button>
      </el-button-group>
    </el-form>
    <el-input type="input" v-model="result" :rows="5"></el-input>
  </div>
</template>

<script>
import { btoa, atob } from 'Base64'
export default {
  name: 'Code',
  data() {
    return {
      src: '',
      result: '',
      radio: '1'
    }
  },
  methods: {
    encode() {
      if (this.radio === '1') {
        this.result = encodeURIComponent(this.src)
      }

      if (this.radio === '3') {
        this.result = btoa(this.src)
      }
    },
    decode() {
      if (this.radio === '2') {
        this.result = decodeURIComponent(this.src)
      }

      if (this.radio === '4') {
        this.result = atob(this.src)
      }
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
