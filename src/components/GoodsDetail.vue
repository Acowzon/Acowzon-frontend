<template>
  <div class="GoodsDetail">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1"
        ><router-link to="/">Home</router-link></el-menu-item
      >
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3"
        ><router-link to="/BrowseGoods">Browse Goods</router-link></el-menu-item
      >
      <el-menu-item index="4">
        <router-link to="/ShoppingTrolley"
          >Shop Trolley</router-link
        ></el-menu-item
      >
    </el-menu>
    <el-container>
      <el-main>
        <el-row>
          <el-col
            :span="8"
            v-for="(o, index) in 2"
            :key="o"
            :offset="index > 0 ? 2 : 0"
          ></el-col>
          <el-card :body-style="{ padding: '0px' }">
            <h1 class="grid-content bg-purple-dark">{{ good.name }}</h1>
            <img :src="good.imageUrl" class="image" />
            <el-row>
              <el-col :span="4">
                <div>价格：{{ good.price }}</div>
              </el-col>
              <el-col :span="15">
                <el-col :span="10">
                  <div>当月售出：{{ good.soldCount }}件</div>
                </el-col>
                <el-col :span="10">
                  <div>商品库存：{{ good.inventory }}件</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <div>商品详情</div>
            </el-row>
            <el-row>
              <div>{{ good.description }}</div>
            </el-row>
            <el-row>
              <el-button
                type="primary"
                plain
                v-on:click="addToShoppingTrolley(good)"
                >加入购物车</el-button
              >
            </el-row>
          </el-card>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getGoodsDetail } from "@/request/api";

export default {
  name: "GoodsDetail",
  data: function () {
    return {
      good: {},
      activeIndex2: "1",
    };
  },
  mounted: function () {
    this.getGoodsDetails();
  },
  methods: {
    getGoodsDetails: function () {
      getGoodsDetail({
        id: this.$route.query.id,
      }).then((response) => {
        this.good = response.data;
      });
    },
    addToShoppingTrolley: function (goodData) {
      this.$message({
            type: 'info',
            message: '成功加入购物车！'
          });       
      var goodIdInLocal = "goodId_" + goodData.id;
      this.$set(this.good,'buyCount',1);
      localStorage.setItem(goodIdInLocal, JSON.stringify(this.good));
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>