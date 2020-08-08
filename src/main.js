import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueWechatTitle from 'vue-wechat-title'
import echarts from 'echarts'
import axios from "axios"
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueWechatTitle)
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:5000';

Vue.prototype.$echarts = echarts

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
