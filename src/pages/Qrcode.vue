<template>
  <div class="container">
    <el-alert
      class="page-title"
      :closable="false"
      title="DevTools: 二维码生成"
      type="info">
    </el-alert>
    <el-input type="textarea" v-model="content" :rows="5"></el-input>
    <el-form :inline="true" size="mini" class="form">
      <el-form-item label="大小：">
        <el-input v-model="size" :style="{ width: '55px' }"></el-input>
      </el-form-item>
      <el-form-item label="颜色：">
        <el-color-picker v-model="foreground"></el-color-picker>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          :on-change="change"
          :auto-upload="false"
          :show-file-list="false"
          action="">
          <el-button size="mini" round>上传图片识别</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="qrcode">
      <qrcode :value="content" :options="{ size, foreground }" ></qrcode>
    </div>
  </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import qrcodeParser from 'qrcode-parser'
export default {
  name: 'Qrcode',
  components: {
    qrcode: VueQrcode
  },
  data() {
    return {
      content: '',
      size: 200,
      foreground: '#333333'
    }
  },
  created() {
    const self = this
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === 'createQrcode') {
        self.content = request.content
      } else if (request.type === 'verifyQrcode') {
        const srcUrl = request.content
        self.parser(srcUrl)
      }
    })
  },
  methods: {
    parser(input) {
      qrcodeParser(input)
        .then(res => {
          this.content = res.data
        })
        .catch(e => {
          this.$message({ message: e.message, type: 'error' })
        })
    },
    change(file) {
      this.parser(file.raw)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  max-width: 980px;
}

.form {
  margin-top: 10px;
}

.qrcode {
  text-align: center;
}
</style>
