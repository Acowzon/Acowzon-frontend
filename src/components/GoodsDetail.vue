<template>
  <div class="GoodsDetail">

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
            <h1 class="grid-content bg-purple-dark">{{ good.goodsName }}</h1>
            <img :src="good.goodsImage" class="image" />
            <el-row>
              <el-col :span="4">
                <div>价格：{{ good.goodsPrice }}</div>
              </el-col>
              <el-col :span="15">
                <el-col :span="10">
                  <div>当月售出：{{ good.soldCount }}件</div>
                </el-col>
                <el-col :span="10">
                  <div>商品库存：{{ good.goodsInventory }}件</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <div>商品详情</div>
            </el-row>
            <el-row>
              <div>{{ good.goodsDescription }}</div>
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
    };
  },
  mounted: function () {
    this.getGoodsDetail();
  },
  methods: {
    getGoodsDetail: function () {
      getGoodsDetail({
        id: this.$route.query.id,
      }).then((response) => {
        console.log(response);
        this.good = response.data;
      });
    },
  },
};
</script>
