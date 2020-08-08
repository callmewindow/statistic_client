<template>
  <div class="center" v-wechat-title="$route.meta.title">
      <Icon></Icon>
      统计中心
  </div>
</template>

<script>
// @ is an alias to /src
import Icon from '@/components/Icon.vue'
// import * as statisticAPI from '@/APIs/statistic.js'

export default {
  name: 'StatisticalCenter',
  components: {
    Icon
  },
  async created(){
    // http请求处理示例
    // 加括号才是调用函数，不然只是输出函数的内容
    // then对应成功，err对应失败
    // let alldata;
    // await statisticAPI.getAllData().then(res => {
    //   alldata = res
    // }).catch(err => {
    //   console.log(err)
    // })
    // console.log(alldata)
    // // 其他内容
    // await statisticAPI.getBusinessRanking().then(res => {
    //   console.log(res)
    // })
    // await statisticAPI.getProductRanking().then(res => {
    //   console.log(res)
    // })
    // await statisticAPI.getTypeNum().then(res => {
    //   console.log(res)
    // })
    
  },
  methods: {

  }
}
</script>
