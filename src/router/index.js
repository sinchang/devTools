import Vue from 'vue'
import Router from 'vue-router'
import Options from '../pages/Options.vue'
import Popup from '../pages/Popup.vue'
import Xml from '../pages/Xml.vue'
import Json from '../pages/Json.vue'
import Qrcode from '../pages/Qrcode.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/options', component: Options },
    { path: '/popup', component: Popup },
    { path: '/xml', component: Xml },
    { path: '/json', component: Json },
    { path: '/qrcode', component: Qrcode }
  ]
})

export default router
