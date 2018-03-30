class ColorPicker {
  constructor() {
    this.id = 'devToolsColorPickerImg'
    this.init()
  }

  createImgElement() {
    this.imgEle = document.createElement('img')
    const width = window.innerWidth
    this.imgEle.src = this.dataUrl
    this.imgEle.id = this.id
    this.imgEle.style = `position: fixed; top: 0px; left: 0px; margin: 0px; padding: 0px; overflow: hidden; z-index: 2147483646; max-width: none !important; max-height: none !important; visibility: visible; height: auto`
    this.imgEle.stylewidth = width
    document.body.style.cursor = 'crosshair'
    document.body.appendChild(this.imgEle)
    this.imgEle.addEventListener('click', this.onImgClick.bind(this), false)
  }

  createCanvasElement() {
    this.canvas = document.createElement('canvas')
    this.canvas.style.display = 'none'
    this.x = ''
    this.y = ''
    document.body.appendChild(this.canvas)
  }

  createResultElement() {
    this.resultEle = document.createElement('div')
    this.resultEle.id = 'devToolsResult'
    this.resultEle.style =
      'position: fixed; top: 10px; right: 10px; width: 180px; height: 100px; z-index: 99999999999999; padding-left: 8px; border-radius: 10px; background: rgba(0,0,0,.5); font-size: 14px;'
    document.body.appendChild(this.resultEle)
  }

  init() {
    this.port = chrome.runtime.connect({ name: 'colorPicker' })
    this.port.onMessage.addListener(this.onMessage.bind(this))
    chrome.runtime.onMessage.addListener(this.onMessage.bind(this))
    document.addEventListener('keyup', this.onKeyup.bind(this), false)
    document.addEventListener('scroll', this.onScroll.bind(this), false)
  }

  exist() {
    return document.getElementById(this.id)
  }

  onImgClick(e) {
    if (e.offsetX) {
      this.x = e.offsetX
      this.y = e.offsetY
    } else if (e.layerX) {
      this.x = e.layerX
      this.y = e.layerY
    }

    this.useCanvas(() => {
      const p = this.canvas.getContext('2d').getImageData(this.x, this.y, 1, 1).data
      const style = 'margin: 10px; padding: 0'
      this.resultEle.innerHTML =
        `<p style="${style}">HEX: ${this.rgbToHex(p[0], p[1], p[2])}</p>
        <p style="${style}">RGB: rgb(${p[0]},${p[1]},${p[2]})</p>
        <p style="${style}">按 ESC 退出</p>`
      this.resultEle.style.color = this.rgbToHex(p[0], p[1], p[2])
    })
  }

  onKeyup(e) {
    if (e.keyCode === 27) {
      this.destroy()
    }
  }

  onScroll() {
    if (!this.exist()) return
    this.imgEle.src = ''
    document.body.style.cursor = 'progress'
    this.port.postMessage({ type: 'PICKING COLOR' })
  }

  onMessage(msg) {
    if (!msg.dataUrl) return
    this.dataUrl = msg.dataUrl
    if (this.exist()) {
      document.body.style.cursor = 'crosshair'
      this.imgEle.src = this.dataUrl
      return
    }
    this.createImgElement()
    this.createCanvasElement()
    this.createResultElement()
  }

  destroy() {
    if (!this.exist()) return
    chrome.runtime.onMessage.removeListener(this.onMessage)
    this.port.disconnect()
    this.imgEle.removeEventListener('click', this.onImgClick)
    document.removeEventListener('scroll', this.onScroll)
    document.body.removeChild(this.imgEle)
    document.body.removeChild(this.canvas)
    document.body.removeChild(this.resultEle)
    document.body.style.cursor = ''
  }

  useCanvas(callback) {
    this.canvas.width = this.imgEle.width
    this.canvas.height = this.imgEle.height
    this.canvas
      .getContext('2d')
      .drawImage(this.imgEle, 0, 0, this.imgEle.width, this.imgEle.height)
    callback && callback()
  }

  rgbToHex(r, g, b) {
    return `#${this.componentToHex(r)}${this.componentToHex(g)}${this.componentToHex(b)}`
  }

  componentToHex(c) {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
}

new ColorPicker()
