<template>
  <div name="OrderList">
    <el-row>
      <el-col
        :span="8"
        v-for="(order, index) in orderList"
        :offset="2"
        :key="index"
      >
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px">
            <el-row><span>customerId:{{ order.customerId }}</span></el-row>
            <el-row><span>customerName:{{ order.customerName }}</span></el-row>
            <el-row><span>shopId:{{ order.shopId }}</span></el-row>
            <el-row><span>shopName:{{ order.shopName }}</span></el-row>
            <el-row><span>orderPrice:{{ order.orderPrice }}</span></el-row>
            <el-row><span>orderState:{{ order.orderState }}</span></el-row>
            <el-row><span>paymentState:{{ order.paymentState }}</span></el-row>
            <el-row><span>createTime:{{ order.createTime }}</span></el-row>
            <el-row><div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                v-on:click="jumpToDetail(order.id)"
                >see order details->
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listAllOrders } from "@/request/api";
export default {
  name: "OrderList",
  data: function () {
    return {
      orderList: [],
    };
  },
  mounted: function () {
    this.getAllOrders();
  },
  methods: {
    getAllOrders: function () {
      listAllOrders().then((response) => {
        this.orderList = response.data;
        console.log(response);
      });
    },
    jumpToDetail(orderID) {
      this.$router.push({ path: "OrdeDetail", query: { id: orderID } });
    },
  },
};
</script>
