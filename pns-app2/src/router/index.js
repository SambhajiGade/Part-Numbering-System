import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FryCry from '../views/FryCry.vue'
import PNSapp from '../views/PNSapp.vue'
import LoginPage from '../views/LoginPage.vue'
import CreateForm from '../views/CreateForm.vue'
import PNSview from '../views/PNSview.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: FryCry
  },
  {
    path: '/pnsapp',
    name: 'PNSapp',
    component: PNSapp
  },
  {
    path: '/PNSview',
    name: 'PNSview',
    component: PNSview
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage

  },
  {
    path: '/CreateForm',
    name: 'CreateForm',
    component: CreateForm
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
