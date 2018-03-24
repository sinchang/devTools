<template>
  <div>
    <el-menu @select="handleSelect">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="xml">
        <i class="el-icon-setting"></i>
        <span slot="title">XML 检查美化</span>
      </el-menu-item>
      <el-menu-item index="json">
        <i class="el-icon-setting"></i>
        <span slot="title">JSON 检查美化</span>
      </el-menu-item>
      <el-menu-item index="feedback">
        <i class="el-icon-question"></i>
        <span slot="title">反馈</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  methods: {
    handleSelect(path) {
      if (!path) return

      const url = `index.html#/${path}`
      let isOpen = false

      chrome.tabs.query(
        { windowId: chrome.windows.WINDOW_ID_CURRENT },
        tabs => {
          tabs.forEach(tab => {
            if (tab.url && tab.url.indexOf(url) > -1) {
              isOpen = true
              chrome.tabs.update(tab.id, { highlighted: true })
            }
          })

          if (!isOpen) {
            if (path === 'feedback') {
              chrome.tabs.create({
                url: 'https://github.com/sinchang/devtools/issues'
              })
              return
            }
            chrome.tabs.create({ url })
          }
        }
      )
    }
  }
}
</script>

<style lang="less">
.el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>

