<template>
  <div class="container">
    <el-alert
      class="page-title"
      :closable="false"
      title="DevTools:  图片 base64"
      type="info">
    </el-alert>
    <el-upload
      class="upload-demo"
      drag
      :auto-upload="false"
      :show-file-list="false"
      action=""
      :on-change="change"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-input
      type="textarea"
      :rows="8"
      class="textarea"
      v-model="dataUrl">
    </el-input>
    <el-button round size="mini" v-copy:callback="copy" v-copy="`${dataUrl}`" class="copy">Copy</el-button>
  </div>
</template>

<script>
export default {
  name: 'ELImage',
  data() {
    return {
      dataUrl: ''
    }
  },
  methods: {
    change(file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        this.dataUrl = reader.result
      }
      reader.readAsDataURL(file.raw)
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
.upload-demo {
  text-align: center;
}

.textarea {
  margin-top: 20px;
}

.copy {
  display: block;
  margin: 20px auto;
}
</style>
