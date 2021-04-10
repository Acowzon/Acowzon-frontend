<template>
  <div name="BrowseGoods">
    <el-row>
      <el-col
        :span="8"
        v-for="(good, index) in goodList"
        :offset="2"
        :key="index"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img v-bind:src="good.goodsImage" class="image" />
          <div style="padding: 14px">
            <span>{{ good.goodsName }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ good.goodsSimpleDes }}</time>
              <el-button
                type="text"
                class="button"
                v-on:click="jumpToDetail(good.goodsId)"
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
  },
};
</script>
