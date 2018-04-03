import Vue from 'vue'
import Router from 'vue-router'
import Options from '../pages/Options.vue'
import Popup from '../pages/Popup.vue'
import Xml from '../pages/Xml.vue'
import Json from '../pages/Json.vue'
import Qrcode from '../pages/Qrcode.vue'
import Ip from '../pages/Ip.vue'
import ShortUrl from '../pages/ShortUrl.vue'
import Code from '../pages/Code.vue'

Vue.use(Router)

const routes = [
  { path: '/options', component: Options, hidden: true },
  { path: '/popup', component: Popup, hidden: true },
  { path: '/xml', component: Xml, icon: 'setting', title: 'XML 检查美化' },
  { path: '/json', component: Json, icon: 'setting', title: 'JSON 检查美化' },
  { path: '/qrcode', component: Qrcode, icon: 'setting', title: '二维码生成' },
  { path: '/ip', component: Ip, icon: 'setting', title: 'IP 查询' },
  { path: '/shorturl', component: ShortUrl, icon: 'setting', title: '短链接生成' },
  { path: '/code', component: Code, icon: 'setting', title: '字符串编解码' }
]

const router = new Router({
  routes
})

export { routes }
export default router
