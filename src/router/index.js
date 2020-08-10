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
  },
  {
    path: '/DataQuery',
    name: 'DataQuery',
    meta: {
      title: "交易信息查询",
    },
    component: () => import('../views/DataQuery.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
