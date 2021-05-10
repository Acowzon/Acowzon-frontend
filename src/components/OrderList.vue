<template>
  <div name="OrderList">

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
  <el-menu-item index="4" >My Order</el-menu-item>
  <el-menu-item index="5" >Upload Goods</el-menu-item>
  <el-menu-item index="6" >Browse Goods</el-menu-item>
</el-menu>



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
            <el-row><span>shopId:{{ order.shopId }}</span></el-row>
            <el-row><span>shopName:{{ order.shopName }}</span></el-row>
            <el-row><span>orderPrice:{{ order.orderPrice }}</span></el-row>
            <el-row><span>orderState:{{ order.orderStatus }}</span></el-row>
            <el-row><span>paymentState:{{ order.paymentStatus }}</span></el-row>
            <el-row><span>createTime:{{ order.createTime }}</span></el-row>
            <el-row><div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                v-on:click="jumpToDetail(order.id)"
                >see order details->
              </el-button>
              <el-button
                type="text"
                class="button"
                v-on:click="handleDeletion(order.id)"
                >delete order->
              </el-button>
            </div>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listAllOrders } from "@/request/api";
import { deleteOrder } from "@/request/api";
export default {
  name: "OrderList",
  data: function () {
    return {
      orderList: [],
       activeIndex2: '1'
    };
  },
  mounted: function () {
    this.getAllOrders();
  },
  methods: {
    getAllOrders: function () {
      //console.log("orderid: ", this.$route.query.id);
      listAllOrders(
        {id : this.$route.query.id} 
      ).then((response) => {
        this.orderList = response.data;
        //console.log(response.data);
      });
    },
    jumpToDetail(orderID) {
        console.log('query order id',orderID);
      this.$router.push({ path: "OrderDetail", query: { id: orderID } });
    },
     handleSelect(key, keyPath) {
        if(!this.$cookies.isKey('UserName') || !this.$cookies.isKey('UserID')){
          alert('Login expired, Please re-login');
          this.$router.push({ path: "SignIn"});
        }
        var UserName = this.$cookies.get('UserName');
        var UserID = this.$cookies.get('UserID');

        //console.log(key);
        if(key=="2-1"){
           // userId 暂时未定义
           this.$router.push({ path: "UserDetail", query: { id: UserID } });
        }else if(key == "2-2"){
            this.$router.push({ path: "SignIn"});
        }else if(key == '5'){
             this.$router.push( {path: "UploadGood"}  );
        }else if(key == '6'){
              this.$router.push( {path: "BrowseGoods"}  );
        }
    },
    handleDeletion(orderId){
        deleteOrder({id:orderId}).then((response) => {
            if(response.status == 'success'){
              alert(' Deletion success! ');
            }else{
              alert(' Deletion failed! ');
            }
            this.$router.push( {path: "OrderList", query: { id: UserID }  } );
      });
    }
  },
};
</script>
