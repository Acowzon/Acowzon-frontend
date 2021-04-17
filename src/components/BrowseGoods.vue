<template>
  <div name="BrowseGoods">

<div class="line"></div>
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1"><a href="/">Main Page</a></el-menu-item>
  <el-submenu index="2">
    <template slot="title">About me</template>
    <el-menu-item index="2-1">My profile</el-menu-item>
    <el-menu-item index="2-2">Change account</el-menu-item>
    <!--el-menu-item index="2-3">选项3</el-menu-item-->
  </el-submenu>
  <el-menu-item index="3" disabled>Shopping cart</el-menu-item>
  <el-menu-item index="4" disabled><a href="/OrderList" target="_blank">My Order</a></el-menu-item>
</el-menu>
    <h1>   </h1>
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
                >see detail
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
      //activeIndex: '1',
      activeIndex2: '1'
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
        console.log(key);
        if(key=="2-1"){
           // userId 暂时未定义
           this.$router.push({ path: "UserDetail", query: { id: "c0d7ff21-87fd-4304-83fa-d53e53fb3272" } });
        }else if(key == "2-2"){
            this.$router.push({ path: "SignIn"});
        }
    }
  },
};
</script>
