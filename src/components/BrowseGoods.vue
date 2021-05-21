<template>
  <div name="BrowseGoods">
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
      <el-menu-item index="4"
        ><router-link to="/ShoppingTrolley">Shop Trolley</router-link></el-menu-item
      >
    </el-menu>
    <el-row>
      <el-col
        :span="8"
        v-for="(good, index) in goodList"
        :offset="2"
        :key="index"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img v-bind:src="good.imageUrl" class="image" />
          <div style="padding: 14px">
            <span>{{ good.name }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ good.simpleDes }}</time>
              <el-button
                type="text"
                class="button"
                v-on:click="jumpToDetail(good.id)"
                >商品详情
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listAllGoods } from "@/request/api";
export default {
  name: "BrowseGoods",
  data: function () {
    return {
      goodList: [],
      activeIndex2: '1',
    };
  },
  mounted: function () {
    this.getAllGoods();
  },
  methods: {
    getAllGoods: function () {
      listAllGoods().then((response) => {
        this.goodList = response.data;
        console.log(response);
      });
    },
    jumpToDetail(goodId) {
      this.$router.push({ path: "GoodsDetail", query: { id: goodId } });
    },
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    },
  },
};
</script>