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
            <h1 class="grid-content bg-purple-dark">{{ good.name }}</h1>
            <img :src="good.imageUrl" class="image" />
            <el-row>
              <el-col :span="4">
                <div>Price: {{ good.price }}</div>
              </el-col>
              <el-col :span="15">
                <el-col :span="10">
                  <div>Sold count：{{ good.soldCount }}</div>
                </el-col>
                <el-col :span="10">
                  <div>Stock number：{{ good.inventory }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <div>Item description</div>
            </el-row>
            <el-row>
              <div>{{ good.description }}</div>
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
