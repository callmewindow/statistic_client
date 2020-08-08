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
    path: '/test',
    name: 'test',
    meta: {
      title: "测试",
    },
    component: () => import('../views/test.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
