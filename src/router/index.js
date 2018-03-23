import Vue from 'vue'
import Router from 'vue-router'
import Options from '../pages/Options.vue'
import Popup from '../pages/Popup.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/options', component: Options },
    { path: '/popup', component: Popup }
  ]
})

export default router
