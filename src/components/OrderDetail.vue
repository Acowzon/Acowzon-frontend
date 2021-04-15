<template>
  <div class="OrderDetail">

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
            <el-row><span>customerId:{{ order.customerId }}</span></el-row>
            <el-row><span>customerName:{{ order.customerName }}</span></el-row>
            <el-row><span>shopId:{{ order.shopId }}</span></el-row>
            <el-row><span>shopName:{{ order.shopName }}</span></el-row>
            <el-row><span>orderPrice:{{ order.orderPrice }}</span></el-row>
            <el-row><span>orderState:{{ order.orderState }}</span></el-row>
            <el-row><span>paymentState:{{ order.paymentState }}</span></el-row>
            <el-row><span>createTime:{{ order.createTime }}</span></el-row>
          </el-card> 
        </el-row>

        <el-row>
          <el-col
            :span="8"
            v-for="(item, index) in order.items"
            :key="item"
            :offset="index > 0 ? 2 : 0"
          ></el-col>
          <el-card :body-style="{ padding: '0px' }">
              <!--以下字段名存在问题-->
            <h1 class="grid-content bg-purple-dark">{{ item.goodsName }}</h1>
            <!--img :src="item.itemImage" class="image" /-->
            <!--以下字段名存在问题-->
            <span>{{item.goodsName}}</span>
            <el-button
                type="text"
                class="button"
                v-on:click="jumpToDetail(item.goodId)"
                >商品详情
              </el-button>
          </el-card>

        </el-row>

      </el-main>

    </el-container>

  </div>
</template>

<script>
import { getGoodsDetail } from "@/request/api";

export default {
  name: "OrderDetail",
  data: function () {
    return {
      order: {},
    };
  },
  mounted: function () {
    this.getOrderDetail();
  },
  methods: {
    getOrderDetail: function () {
      getOrderDetail({
        id: this.$route.query.id,
      }).then((response) => {
        console.log(response);
        this.order = response.data;
      });
    },

    jumpToDetail(goodId) {
      this.$router.push({ path: "GoodsDetail", query: { id: goodId } });
    }

  },
};
</script>
