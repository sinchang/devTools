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
    title: '搜索豆瓣电影',
    contexts: ['selection'],
    parentId: 'DevTools',
    id: 'doubanMovie'
  })

  chrome.contextMenus.create({
    title: '搜索电影下载',
    contexts: ['selection'],
    parentId: 'DevTools',
    id: 'dysfz'
  })

  chrome.contextMenus.create({
    title: 'Google Translate',
    contexts: ['selection'],
    parentId: 'DevTools',
    id: 'translate'
  })

  chrome.contextMenus.create({
    title: '二维码识别',
    contexts: ['image'],
    parentId: 'DevTools',
    id: 'verifyQrcode'
  })

  chrome.contextMenus.create({
    title: '分享到 Twitter',
    contexts: ['page'],
    parentId: 'DevTools',
    id: 'shareToTwitter'
  })

  chrome.contextMenus.create({
    title: '短链接生成',
    contexts: ['page', 'link'],
    parentId: 'DevTools',
    id: 'shorturl'
  })

  chrome.contextMenus.create({
    title: 'Markdown 一下',
    contexts: ['page'],
    parentId: 'DevTools',
    id: 'markdown'
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

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const isShorturl = info.menuItemId === 'shorturl'
  if (info.menuItemId.indexOf('Qrcode') > -1 || isShorturl) {
    let isOpen = false
    let url = 'index.html#/qrcode'
    if (isShorturl) {
      url = 'index.html#/shorturl'
    }

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

  if (info.menuItemId === 'shareToTwitter') {
    const url = `https://twitter.com/share?text=${tab.title}&url=${info.pageUrl}`
    window.open(url)
  }

  if (info.menuItemId === 'markdown') {
    copy(`[${tab.title}](${info.pageUrl})`)
  }

  if (info.menuItemId === 'doubanMovie') {
    const url = `https://movie.douban.com/subject_search?search_text=${info.selectionText}&cat=1002`
    window.open(url)
  }

  if (info.menuItemId === 'dysfz') {
    const url = `http://www.dysfz.vip/key/${info.selectionText}/`
    window.open(url)
  }

  if (info.menuItemId === 'translate') {
    const url = `https://translate.google.com/#view=home&op=translate&sl=en&tl=zh-CN&text=${encodeURIComponent(info.selectionText)}`
    window.open(url)
  }
})

// fork from: https://github.com/sindresorhus/copy-text-to-clipboard
function copy(input) {
  const el = document.createElement('textarea')

  el.value = input

  // Prevent keyboard from showing on mobile
  el.setAttribute('readonly', '')

  el.style.contain = 'strict'
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  el.style.fontSize = '12pt' // Prevent zooming on iOS

  const selection = document.getSelection()
  let originalRange = false
  if (selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0)
  }

  document.body.appendChild(el)
  el.select()

  // Explicit selection workaround for iOS
  el.selectionStart = 0
  el.selectionEnd = input.length

  let success = false
  try {
    success = document.execCommand('copy')
  } catch (err) {}

  document.body.removeChild(el)

  if (originalRange) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }

  return success
}
