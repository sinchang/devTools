const setUpContextMenus = () => {
  chrome.contextMenus.create({
    title: 'DevTools',
    id: 'DevTools',
    contexts: ['page', 'selection', 'editable', 'link', 'image'],
    documentUrlPatterns: ['http://*/*', 'https://*/*', 'file://*/*']
  })

  chrome.contextMenus.create({
    title: '二维码生成',
    contexts: ['page', 'selection', 'editable', 'link'],
    parentId: 'DevTools',
    id: 'createQrcode'
  })

  chrome.contextMenus.create({
    title: '二维码识别',
    contexts: ['image'],
    parentId: 'DevTools',
    id: 'verifyQrcode'
  })
}

const openPage = (url, isOpen, cb) => {
  chrome.tabs.query(
    { windowId: chrome.windows.WINDOW_ID_CURRENT },
    tabs => {
      tabs.forEach(tab => {
        if (tab.url && tab.url.indexOf(url) > -1) {
          isOpen = true // eslint-disable-line
          chrome.tabs.update(tab.id, { highlighted: true }, tab => {
            cb && cb(tab)
          })
        }
      })

      if (!isOpen) {
        chrome.tabs.create({ url }, tab => {
          cb && cb(tab)
        })
      }
    }
  )
}

chrome.runtime.onInstalled.addListener(() => {
  setUpContextMenus()
})

chrome.contextMenus.onClicked.addListener(info => {
  if (info.menuItemId.indexOf('Qrcode') > -1) {
    let isOpen = false
    const url = 'index.html#/qrcode'

    openPage(url, isOpen, tab => {
      let content

      if (info.mediaType === 'image') {
        content = info.srcUrl
      } else if (info.linkUrl) {
        content = info.linkUrl
      } else if (info.selectionText) {
        content = info.selectionText
      } else {
        content = info.pageUrl
      }

      if (!content) return

      setTimeout(() => {
        chrome.tabs.sendMessage(tab.id, {
          content,
          type: info.menuItemId
        })
      }, 1000)
    })
  }
})