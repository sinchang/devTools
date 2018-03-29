import Vue from 'vue'
import Router from 'vue-router'
import Options from '../pages/Options.vue'
import Popup from '../pages/Popup.vue'
import Xml from '../pages/Xml.vue'
import Json from '../pages/Json.vue'
import Qrcode from '../pages/Qrcode.vue'

Vue.use(Router)

const routes = [
  { path: '/options', component: Options, hidden: true },
  { path: '/popup', component: Popup, hidden: true },
  { path: '/xml', component: Xml, icon: 'setting', title: 'XML 检查美化' },
  { path: '/json', component: Json, icon: 'setting', title: 'JSON 检查美化' },
  { path: '/qrcode', component: Qrcode, icon: 'setting', title: '二维码生成' }
]

const router = new Router({
  routes
})

export { routes }
export default router
