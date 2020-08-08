import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/StatisticalCenter'
  },
  {
    path: '/StatisticalCenter',
    name: 'StatisticalCenter',
    meta: {
      title: "数据统计中心",
    },
    component: () => import('../views/StatisticalCenter.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
