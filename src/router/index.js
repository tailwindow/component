import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BlankLayout from '@/BlankLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/component/*',
    name: 'Component',
    component: () => import(/* webpackChunkName: "component" */ '@/views/Component.vue')
  },
  {
    path: '*',
    name: 'blank',
    component: BlankLayout,
    children: [
      {
        path: '*',
        name: 'E404',
        component: () => import(/* webpackChunkName: "e404" */ '@/views/404.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
