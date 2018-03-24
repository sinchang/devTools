<template>
  <div class="container">
    <el-alert
      class="page-title"
      :closable="false"
      title="DevTools: JSON 检查美化"
      type="info">
    </el-alert>
    <div id="editor"></div>
    <div class="btn-group">
      <el-button round size="mini" @click="beautify">美化</el-button>
      <el-button round size="mini" @click="clear">清空</el-button>
      <el-button round size="mini" @click="compress">压缩</el-button>
      <el-button round size="mini" v-copy:callback="copy" v-copy="`${json}`">复制</el-button>
      <el-button round size="mini" @click="download">下载</el-button>
      <el-upload
        class="upload-demo"
        :on-change="change"
        :auto-upload="false"
        :show-file-list="false"
        action="">
        <el-button size="mini" round>上传</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
const FileSaver = require('file-saver')
const beautifyJs = require('js-beautify')
export default {
  name: 'Json',
  data() {
    return {
      editor: null,
      json: ''
    }
  },
  mounted() {
    document.title = 'JSON 检查美化'
    this.editor = ace.edit('editor')
    this.editor.session.setMode('ace/mode/json')
    this.editor.setShowPrintMargin(false)
    this.editor.on('change', () => {
      this.json = this.editor.session.getValue()
    })
  },
  methods: {
    beautify() {
      const json = beautifyJs(this.json)
      this.editor.session.setValue(json)
    },
    clear() {
      this.editor.session.setValue('')
    },
    copy() {
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    },
    download() {
      const blob = new Blob([this.json], {
        type: 'text/xml;charset=utf-8'
      })
      FileSaver.saveAs(blob, 'file.json')
    },
    change(file) {
      // Returns a new Blob object containing the data in the specified range of bytes of the source Blob.
      const blob = file.raw.slice()
      const reader = new FileReader()
      const self = this

      reader.addEventListener('loadend', e => {
        const text = e.srcElement.result
        self.editor.session.setValue(text)
      })

      reader.readAsText(blob)
    },
    compress() {
      this.editor.session.setValue(JSON.stringify(JSON.parse(this.json)))
    }
  }
}
</script>

<style lang="less" scoped>
#editor {
  width: 100%;
  height: 600px;
  border: 1px solid #f0f0f0;
}

.btn-group {
  margin: 20px auto;
  text-align: center;
}

.upload-demo {
  display: inline-block;
  margin-left: 10px;
}
</style>
