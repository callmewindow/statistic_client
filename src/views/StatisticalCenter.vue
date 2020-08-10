<template>
  <div v-wechat-title="$route.meta.title">
    <div id="leftSide">
      <div id="dataSum">
        <Icon></Icon>
        <div class="sumItem" id="sumTitle">数据统计</div>
        <div class="sumItem">商家总量：{{storeSum}}</div>
        <div class="sumItem">商品总量：{{productSum}}</div>
        <div class="sumItem">商品类型：{{typeSum}}种</div>
      </div>
      <div id="typeBarChart"></div>
      <div id="typeCircleChart"></div>
    </div>
    <div id="center">
      <div id="mainTitle">
        <Icon></Icon>
        <span>光网交易信息统计分析中心</span>
      </div>
      <el-card class="box-card" id="hotPoduct">
        <div slot="header" class="clearfix">
          <span style="font-weight:bold">高热度商品</span>
          <el-button
            style="float: right; padding: 3px 2px;"
            type="text"
            @click="getAfterProduct"
          >下一批</el-button>
          <el-button
            style="float: right; padding: 3px 2px;"
            type="text"
            @click="getBeforeProduct"
          >上一批</el-button>
        </div>
        <el-table id="productList" :data="productData">
          <el-table-column prop="title" label="标题" width="140"></el-table-column>
          <el-table-column prop="storeInedx" label="商家标识" width="60"></el-table-column>
          <el-table-column prop="saledNum" label="销售量" width="70"></el-table-column>
          <el-table-column label="影响力" width="70">
            <template slot-scope="scope">
              <span>{{ (Math.sqrt(scope.row.saledNum*scope.row.followNum)).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="商品描述"></el-table-column>
        </el-table>
      </el-card>
    </div>
    <div id="rightSide">
      <el-button id="toSearchButton" type="primary" @click="toDataQuery">进入信息检索系统</el-button>
      <el-card class="box-card" id="hotStore">
        <div slot="header" class="clearfix">
          <span style="font-weight:bold">高热度商家</span>
        </div>
        <el-table id="productList" :data="storeData">
          <el-table-column prop="storeInedx" label="商家标识"></el-table-column>
          <el-table-column prop="followNum" label="关注量"></el-table-column>
        </el-table>
      </el-card>
      <div id="storeCircleChart"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Icon from "@/components/Icon.vue";
// import * as statisticAPI from '@/APIs/statistic.js'
import productRanking from "@/assets/productRanking.js";
import typeNum from "@/assets/typeNum.js";
import followNum from "@/assets/followNum.js";
import businessRanking from "@/assets/businessRanking.js";

export default {
  name: "StatisticalCenter",
  components: {
    Icon,
  },
  data() {
    return {
      productSum: 0,
      storeSum: 0,
      typeSum: 0,
      productIndex: 0,
      productData: [],
      storeData: [],
    };
  },
  async created() {
    // this.productSum = productRanking.data.PR.length;
    this.productSum = 995;
    this.storeSum = businessRanking.data.BR.length;
    this.typeSum = typeNum.data.TN.length;
    this.productData = productRanking.data.PR.slice(0, 4);
    this.storeData = businessRanking.data.BR.slice(0, 4);
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
  mounted() {
    this.getTypeBarChart();
    this.getTypeCircleChart();
    this.getStoreCircleChart();
  },
  methods: {
    getBeforeProduct() {
      if (this.productIndex == 0) {
        this.$message({
          message: "已经是最高销量的一批了",
          type: 'warning'
        });
        return;
      }
      this.productIndex -= 4;
      this.productData = productRanking.data.PR.slice(
        this.productIndex,
        this.productIndex + 4
      );
    },
    getAfterProduct() {
      if (this.productIndex + 4 > this.productSum) {
        this.$message({
          message: "已经是最低销量的一批了",
          type: 'warning'
        });
        return;
      }
      this.productIndex += 4;
      this.productData = productRanking.data.PR.slice(
        this.productIndex,
        this.productIndex + 4
      );
    },
    toDataQuery() {
      this.$router.replace({ path: "/DataQuery" });
    },
    getTypeCircleChart() {
      this.typeCircleChart = this.$echarts.init(
        document.getElementById("typeCircleChart")
      );
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "商品类型",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: typeNum.data.TN,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      this.typeCircleChart.clear();
      this.typeCircleChart.setOption(option);
    },
    getTypeBarChart() {
      this.typeBarChart = this.$echarts.init(
        document.getElementById("typeBarChart")
      );
      let tempTN = typeNum.data.TN;
      let typeNameList = [],
        typeValueList = [];
      for (let i = 0; i < tempTN.length; i++) typeNameList.push(tempTN[i].name);
      for (let i = 0; i < tempTN.length; i++)
        typeValueList.push(tempTN[i].value);
      let option = {
        title: {
          text: "各类型交易数量展示",
          subtext: "数据来自网络",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["2020年"],
          left: "right",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: typeNameList,
        },
        series: [
          {
            name: "2020年",
            type: "bar",
            data: typeValueList,
          },
        ],
      };
      this.typeBarChart.clear();
      this.typeBarChart.setOption(option);
    },
    getStoreCircleChart() {
      this.storeCircleChart = this.$echarts.init(
        document.getElementById("storeCircleChart")
      );
      let option = {
        title: {
          text: "不同关注量商家对比",
          subtext: "数据来源网络",
          left: "left",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "商家数量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: followNum.data.FN.reverse(),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      this.storeCircleChart.clear();
      this.storeCircleChart.setOption(option);
    },
  },
};
</script>

<style scoped>
#leftSide {
  position: fixed;
  float: left;
  width: 22vw;
  left: 2vw;
}
#dataSum {
  position: relative;
  width: 94%;
  margin: 15px 3%;
  padding: 5px 0;
}
.sumItem {
  margin: 5px 0;
  font-size: 14px;
}
#sumTitle {
  font-size: 16px;
  font-weight: bold;
}
#typeBarChart {
  position: relative;
  width: 100%;
  height: 350px;
}
#typeCircleChart {
  position: relative;
  width: 100%;
  height: 300px;
  margin-top: -50px;
}

#center {
  float: left;
  margin-left: 26vw;
  width: 46vw;
}
#mainTitle {
  position: relative;
  padding: 10px 0;
  width: 90%;
  margin: 15px 5%;
  font-size: 25px;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
#hotProduct {
  width: 90%;
  margin-left: 5%;
}
#productList {
  margin-top: -10px;
}

#rightSide {
  position: fixed;
  float: right;
  right: 2vw;
  width: 22vw;
}
#toSearchButton {
  width: 50%;
  margin: 20px 25%;
}
#hotStore {
  width: 90%;
  margin-left: 5%;
}
#storeCircleChart {
  position: relative;
  width: 90%;
  height: 300px;
  margin: 20px 5%;
}
</style>