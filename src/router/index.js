import Vue from 'vue'
import Router from 'vue-router'
import Options from '../pages/Options.vue'
import Popup from '../pages/Popup.vue'
import Xml from '../pages/Xml.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/options', component: Options },
    { path: '/popup', component: Popup },
    { path: '/xml', component: Xml }
  ]
})

export default router
