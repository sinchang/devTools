<template>
  <div class="container">
    <el-alert
      class="page-title"
      :closable="false"
      title="DevTools: XML 检查美化"
      type="info">
    </el-alert>
    <div id="editor"></div>
    <div class="btn-group">
      <el-button round size="mini" @click="beautify">美化</el-button>
      <el-button round size="mini" @click="clear">清空</el-button>
      <el-button round size="mini" v-copy:callback="copy" v-copy="`${xml}`">复制</el-button>
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
export default {
  name: 'Xml',
  data() {
    return {
      editor: null,
      xml: ''
    }
  },
  mounted() {
    document.title = 'XML 检查美化'
    this.editor = ace.edit('editor')
    const XmlMode = ace.require('ace/mode/xml').Mode
    this.editor.session.setMode(new XmlMode())
    this.editor.setShowPrintMargin(false)
    this.editor.on('change', () => {
      this.xml = this.editor.getValue()
    })
  },
  methods: {
    beautify() {
      const beautify = ace.require('ace/ext/beautify')
      beautify.beautify(this.editor.session)
    },
    clear() {
      this.editor.setValue('')
    },
    copy() {
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    },
    download() {
      const blob = new Blob([this.xml], {
        type: 'text/xml;charset=utf-8'
      })
      FileSaver.saveAs(blob, 'file.xml')
    },
    change(file) {
      // Returns a new Blob object containing the data in the specified range of bytes of the source Blob.
      const blob = file.raw.slice()
      const reader = new FileReader()
      const self = this

      reader.addEventListener('loadend', e => {
        const text = e.srcElement.result
        self.editor.setValue(text)
      })

      reader.readAsText(blob)
    }
  }
}
</script>

<style lang="less" scoped>
#editor {
  width: 100%;
  height: 500px;
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
