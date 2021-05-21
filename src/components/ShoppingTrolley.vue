<template>
  <div class="ShoppingTrolley">
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
        <template slot="title">######</template>
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
        <router-link to="/ShoppingTrolley">Shop Trolley</router-link>
      </el-menu-item>
    </el-menu>

    <el-table :data="goodData" style="width: 100%">
      <el-table-column prop="name" label="商品名称" width="210">
      </el-table-column>
      <el-table-column prop="simpleDes" label="商品信息" width="210">
      </el-table-column>
      <el-table-column prop="price" label="商品单价" width="210">
      </el-table-column>
      <el-table-column prop="buyCount" label="购买数量" width="300">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.buyCount"
            @change="updateTotalPrice"
            :min="1"
            :max="scope.row.inventory"
            label="商品数量选择"
          >
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="总价" width="180">
        <template slot-scope="scope">
          {{ (scope.row.price * scope.row.buyCount) | numFilter }}
        </template>
      </el-table-column>
      <el-table-column label="移除商品" width="200">
        <template slot-scope="scope">
          <el-button
            type="info"
            plain
            icon="el-icon-delete"
            circle
            v-on:click="deleteGoodsInTrolley(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-cascader
      placeholder="请选择收货地址省市区"
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="selectDestAddr"
      style="float: left"
    >
    </el-cascader>
    <div style="width: 600px">
      <el-input
        v-model="destAddr"
        maxlength="50"
        show-word-limit
        placeholder="请输入详细收货地址"
      ></el-input>
    </div>
    <span style="margin-right: 220px; font-size: 25px"
      >总计：{{ this.totalPrice }}</span
    >
    <el-button plain style="float: left" v-on:click="createOrder()"
      >提交订单</el-button
    >
  </div>
</template>

<script>
//npm install element-china-area-data -S 需要导入地址信息
import { regionData, CodeToText } from "element-china-area-data";
import { uuid } from "vue-uuid";
import { addOrder } from "@/request/api";

export default {
  name: "ShoppingTrolley",
  data: function () {
    return {
      activeIndex2: "1",
      goodData: [], //购物车中的物品信息
      totalPrice: 0, //购物车中物品总价
      destAddr: "", //收货地址
      options: regionData, //地区选择
      selectedOptions: [], //地区选择
      uuid: "",
      orders: {},
      msg: [],
      selectAddr: {},
    };
  },
  mounted: function () {
    this.getGoodsInTrolley();
    this.getTotalPrcie();
  },
  methods: {
    getGoodsInTrolley: function () {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i); //获取本地存储的Key
        if (key.indexOf("goodId") != -1) {
          var jsonData = JSON.parse(localStorage.getItem(key));
          // console.log(jsonData);
          this.goodData.push(jsonData);
        }
      }
      console.log(this.goodData);
    },
    getTotalPrcie() {
      var temp = 0;
      for (var i = 0; i < this.goodData.length; i++) {
        temp += this.goodData[i].price * this.goodData[i].buyCount;
      }
      this.totalPrice = temp;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    updateTotalPrice() {
      this.getTotalPrcie();
    },
    deleteGoodsInTrolley(index, rowData) {
      //删除购物车中的物品，即删除localstorage中的对应信息
      var goodIdInLocal = "goodId_" + rowData.id;
      localStorage.removeItem(goodIdInLocal, JSON.stringify(rowData));
      this.goodData.splice(index, 1);
      this.totalPrice -= rowData.buyCount * rowData.price;
    },
    selectDestAddr() {
      var loc = "";
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += CodeToText[this.selectedOptions[i]];
      }
      var destsimple = {
        country: "China", // 国家

        province: CodeToText[this.selectedOptions[0]], // 省

        city: CodeToText[this.selectedOptions[1]], // 市

        detail: "", // 具体地址
      };
      this.selectAddr = destsimple;
    },
    getCurGMTDate() {
      let date = new Date();
      let mon = date.getMonth();
      if (mon < 9) {
        mon = "0" + (mon + 1);
      } else {
        mon = mom + 1;
      }
      let Str =
        date.getFullYear() +
        "-" +
        mon +
        "-" +
        date.getDate() +
        "T" +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds() +
        ".000+0000";
      return Str;
    },
    createOrder: function () {
      this.$confirm("是否提交订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (
            this.destAddr.length != 0 &&
            this.destAddr.split(" ").join("").length != 0
          ) {
            //生成订单
            // 订单内容
            for (var j = 0; j < this.goodData.length; j++) {
              var OrderItemDTO = {
                id: "",
                goodsId: "",
                goodsName: "",
                imageUrl: "",
                price: "",
                amount: "",
              };
              var orderDetail = {
                //订单信息
                id: "",
                items: {},
                customerId: "",
                shopId: "",
                shopName: "",
                orderPrice: "",
                originAddr: "",
                destAddr: "",
                orderStatus: "",
                paymentStatus: "",
                createTime: "",
                updateTime: "",
              };
              // 商品订单id
              orderDetail.id = this.$uuid.v1();
              var id = {
                id: orderDetail.id,
                goodsId: this.goodData[j].id,
                goodsName: this.goodData[j].name,
                imageUrl: this.goodData[j].imageUrl,
                price: this.goodData[j].price,
                amount: this.goodData[j].buyCount,
              };

              orderDetail.items = [id];
              // 客户id
              orderDetail.customerId = "2b917481-32d7-482d-9a7d-d9472ddaa7dd";
              // 商家id
              orderDetail.shopId = this.goodData[j].shopId;
              // 商家名称
              orderDetail.shopName = this.goodData[j].shopName;
              // 订单价格
              orderDetail.orderPrice =
                this.goodData[j].buyCount * this.goodData[j].price;
              //发货地址
              orderDetail.originAddr = {
                country: "China", // 国家

                province: "Shanxi", // 省

                city: "Xian", // 市

                detail: "Xidian U", // 具体地址
              };
              //收货地址
              this.selectAddr.detail = this.destAddr;
              orderDetail.destAddr = this.selectAddr;
              // 订单状态 0未支付 1已支付 2取消订单
              orderDetail.orderStatus = "NEW";
              // 支付状态
              orderDetail.paymentStatus = "WAITING";
              // 订单创建的时间 后端自动生成无需传递
              // var curdate = this.getCurGMTDate();
              // orderDetail.createTime = curdate;
              // orderDetail.updateTime = curdate;
              this.orders = orderDetail;
              //post给后端
              addOrder(JSON.stringify(this.orders)).then((response) => {
                this.msg.push(response);
              });
            }

            console.log(this.msg);
          
            // 清空localstorage中的购物车商品信息
            var len = localStorage.length;
            var key = [];
            for (var i = 0; i < len; i++) {
              key[i] = localStorage.key(i); //获取本地存储的Key
            }
            for(var i = 0; i < key.length; i++){
                if (key[i].indexOf("goodId") != -1) {
                localStorage.removeItem(key[i]);
              }
            }
            
            Object.assign(this.$data,this.$options.data());
            this.$message({
              type: "success",
              message: "订单提交成功!",
            });
          } else {
            this.$message({
              type: "warning",
              message: "请输入完整的地址!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消订单提交",
          });
        });
    },
  },
  filters: {
    numFilter(value) {
      let val = "";
      if (!isNaN(value) && value != "") {
        if (value % 1 == 0 && value != 0) {
          //整数
          val = value + ".00";
        } else if (value == 0) {
          val = "";
        } else {
          //小数
          val = parseFloat(value).toFixed(2);
        }
      } else {
        val = "";
      }
      return val;
    },
  },
};
</script>