<template>
  <div>
    <el-menu @select="handleSelect">
      <el-menu-item
        v-for="(route, key) in routes"
        v-if="!route.hidden"
        :key="key"
        :index="route.path.split('/')[1]">
        <i :class="`el-icon-${route.icon}`"></i>
        <span slot="title">{{ route.title }}</span>
      </el-menu-item>
      <el-menu-item index="feedback">
        <i class="el-icon-question"></i>
        <span slot="title">反馈</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { routes } from '../router/index'

export default {
  name: 'Popup',
  data() {
    return {
      routes
    }
  },
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

