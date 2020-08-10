<template>
  <div v-wechat-title="$route.meta.title">
    <div id="tools">
      <Icon></Icon>
      <div id="toolTitle">辅助工具集</div>
      <el-button class="toolItem" type="text" @click="returnCenter">返回信息中心</el-button>
      <el-button class="toolItem" type="text" @click="resetSearch">清空搜索记录</el-button>
      <el-button class="toolItem" type="text" @click="building">导出搜索内容</el-button>
    </div>
    <div id="center">
      <div id="mainTitle">
        <Icon></Icon>
        <span>光网交易信息检索系统</span>
      </div>
      <div id="searchBar">
        <el-input placeholder="请输入内容" v-model="searchCon" class="input-with-select">
          <el-select style="width: 120px" v-model="typeSelect" slot="prepend" placeholder="请选择">
            <el-option label="全部字段" value="0"></el-option>
            <el-option label="标题" value="1"></el-option>
            <el-option label="商家标识" value="2"></el-option>
            <el-option label="商品描述" value="3"></el-option>
          </el-select>
          <el-button icon="el-icon-search" slot="append" @click="searchProduct"></el-button>
        </el-input>
      </div>
      <el-card class="box-card" id="searchResult">
        <div slot="header" class="clearfix">
          <span style="font-weight:bold">搜索结果</span>
        </div>
        <el-pagination
          id="pageBar"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="productNum"
        ></el-pagination>
        <el-table
          id="productList"
          :data="productDataShow"
          :default-sort="{prop: 'saledNum', order: 'descending'}"
        >
          <el-table-column prop="title" label="标题" width="180"></el-table-column>
          <el-table-column prop="theType" label="类型" width="80"></el-table-column>
          <el-table-column prop="storeInedx" label="商家标识" width="80"></el-table-column>
          <el-table-column prop="price" label="价格" sortable width="80"></el-table-column>
          <el-table-column prop="saledNum" label="销售量" sortable width="100"></el-table-column>
          <el-table-column prop="followNum" label="关注量" sortable width="100"></el-table-column>
          <el-table-column prop="content" label="商品描述"></el-table-column>
          <el-table-column label="影响力" width="80">
            <template slot-scope="scope">
              <span>{{ (Math.sqrt(scope.row.saledNum*scope.row.followNum)).toFixed(2) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Icon from "@/components/Icon.vue";
// import * as statisticAPI from '@/APIs/statistic.js'
import productRanking from "@/assets/productRanking.js";

export default {
  name: "DataQuery",
  components: {
    Icon,
  },
  data() {
    return {
      tempPR: productRanking.data.PR,
      searchCon: "",
      typeSelect: "0",
      productDataAll: [],
      productDataShow: [],
      productNum: 0,
      currentPage: 1,
    };
  },
  created() {
    this.updateProductData();
  },
  methods: {
    returnCenter() {
      this.$router.replace({ path: "/StatisticalCenter" });
    },
    resetSearch() {
      this.productDataAll = [];
      this.productDataShow = [];
      this.productNum = 0;
      this.currentPage = 1;
      this.$message({
        message: "记录已清空",
        type: "success",
      });
    },
    building() {
      this.$message({
        message: "功能开发中，敬请期待",
        // type: 'warning'
      });
    },
    updateProductData() {
      for (let i = 0; i < this.tempPR.length; i++) {
        this.tempPR[i].price = parseInt(this.tempPR[i].price);
      }
    },
    searchProduct() {
      if (this.searchCon == "") {
        this.$message({
          message: "请输入检索内容后尝试",
          type: 'warning'
        });
        return;
      }
      this.productDataAll = [];
      this.productDataShow = [];
      if (this.typeSelect == 0) {
        for (let i = 0; i < this.tempPR.length; i++) {
          if (
            this.tempPR[i].title.indexOf(this.searchCon) != -1 ||
            this.tempPR[i].storeInedx.indexOf(this.searchCon) != -1 ||
            this.tempPR[i].content.indexOf(this.searchCon) != -1
          ) {
            this.productDataAll.push(this.tempPR[i]);
          }
        }
      }
      if (this.typeSelect == 1) {
        for (let i = 0; i < this.tempPR.length; i++) {
          if (this.tempPR[i].title.indexOf(this.searchCon) != -1) {
            this.productDataAll.push(this.tempPR[i]);
          }
        }
      }
      if (this.typeSelect == 2) {
        for (let i = 0; i < this.tempPR.length; i++) {
          if (this.tempPR[i].storeInedx.indexOf(this.searchCon) != -1) {
            this.productDataAll.push(this.tempPR[i]);
          }
        }
      }
      if (this.typeSelect == 3) {
        for (let i = 0; i < this.tempPR.length; i++) {
          if (this.tempPR[i].content.indexOf(this.searchCon) != -1) {
            this.productDataAll.push(this.tempPR[i]);
          }
        }
      }
      this.productNum = this.productDataAll.length;
      for (let i = 0; i < this.productNum && i < 5; i++) {
        this.productDataShow.push(this.productDataAll[i]);
      }
      this.$message({
        message: "检索完毕",
        type: "success",
      });
    },
    handleCurrentChange(val) {
      this.productDataShow = [];
      for (let i = 5 * (val - 1); i < this.productNum && i < 5 * val; i++) {
        this.productDataShow.push(this.productDataAll[i]);
      }
    },
  },
};
</script>

<style scoped>
#tools {
  position: fixed;
  z-index: 100;
  top: 20px;
  right: 20px;
  width: 200px;
}
.toolItem {
  width: 50%;
  margin: -5px 25%;
}
#toolTitle {
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
}
#center {
  float: left;
  margin-left: 10vw;
  width: 80vw;
}
#mainTitle {
  position: relative;
  padding: 10px 0;
  width: 50%;
  margin: 15px 25%;
  font-size: 25px;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
#searchBar {
  width: 80%;
  margin: 20px 10%;
}
#searchResult {
  width: 100%;
  margin: 0 0%;
}
#pageBar {
  margin-top: -10px;
}
</style>>