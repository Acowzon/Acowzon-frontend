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
      <el-menu-item index="3" >Shopping cart</el-menu-item>
      <el-menu-item index="4">My Order</el-menu-item>
      <el-menu-item index="5">Upload Goods</el-menu-item>
      <el-menu-item index="6">Browse Goods</el-menu-item>
    </el-menu>
    <el-dialog
      title="Order Detail"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <strong>Order ID: {{ orderDetail.id }}</strong>
          </div>
        </template>
        <el-row class="Detail_row">
          <el-col :span="10">
            <div class="grid-content"><strong>Customer ID:</strong></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">{{ orderDetail.customerId }}</div>
          </el-col>
        </el-row>
        <el-row class="Detail_row">
          <el-col :span="10">
            <div class="grid-content"><strong>Shop ID:</strong></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">{{ orderDetail.shopId }}</div>
          </el-col>
        </el-row>
        <el-row class="Detail_row">
          <el-col :span="10">
            <div class="grid-content"><strong>Shop Name:</strong></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">{{ orderDetail.shopName }}</div>
          </el-col>
        </el-row>
        <el-row class="Detail_row">
          <el-col :span="10">
            <div class="grid-content"><strong>Order Time:</strong></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">{{ orderDetail.createTime }}</div>
          </el-col>
        </el-row>


        <el-row class="Detail_row">
          <el-col :span="10" v-for="(item, index) in itemList"
       
        :key="index">
            <div class="grid-content"><strong>Item Name: {{item.goodsName}}</strong></div>
            <div class="grid-content"><strong>Item Price: {{item.price}}</strong></div>
          </el-col>
        </el-row>
        <el-row class="Detail_row">
          <el-col :span="10">
            <div class="grid-content"><strong>Total Price:</strong></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">{{ orderDetail.orderPrice }}</div>
          </el-col>
        </el-row>

        <el-row class="Detail_row">
          <el-col :span="10">
            <div class="grid-content"><strong>Source location:</strong></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">{{ srcAddr.country}},{{ srcAddr.province}}{{ srcAddr.city}},{{ srcAddr.detail}}</div>
          </el-col>
        </el-row>
        <el-row class="Detail_row">
          <el-col :span="10">
            <div class="grid-content"><strong>Destination:</strong></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">{{ destAddr.country}},{{ destAddr.province}}{{ destAddr.city}},{{ destAddr.detail}}</div>
          </el-col>
        </el-row>
        
       
        <el-row class="Detail_row">
          <el-col :span="10">
            <div class="grid-content"><strong>Order Status:</strong></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">{{ orderDetail.orderStatus }}</div>
          </el-col>
        </el-row>
        <el-row class="Detail_row">
          <el-col :span="10">
            <div class="grid-content"><strong>Payment Status:</strong></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">{{ orderDetail.paymentStatus }}</div>
          </el-col>
        </el-row>
      </el-card>
    </el-dialog>


    <el-card class="box-card" shadow="always">
      <template #header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">Main Page</el-breadcrumb-item>
          <el-breadcrumb-item>Order List</el-breadcrumb-item>
          <el-breadcrumb-item>My Order</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <el-table
        :data="orderList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        style="height: 480px">
        <el-table-column
          prop="createTime"
          label="Date"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="customerId"
          label="customer"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="shopId"
          label="shopId"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="shopName"
          label="shopName"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orderPrice"
          label="orderPrice"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="orderStatus"
          align="center"
          width="180">
          <template v-slot="slotProps">
            <el-tag type="success" v-if="slotProps.row.orderStatus===1">Paid Successfully</el-tag>
            <el-tag type="info" v-if="slotProps.row.orderStatus===2">Cancelled</el-tag>
            <el-tag type="warning" v-if="slotProps.row.orderStatus===0">UnPaid</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template v-slot="slotProps">
            <el-button type="danger" icon="el-icon-delete" size="medium" round
                       @click="handleDeletion(slotProps.row.id)">Delete
            </el-button>
            <el-button type="info" icon="el-icon-close" size="medium" round
                       :disabled="slotProps.row.orderStatus===2"
                       @click="handleCancel(slotProps.row.id)"
            >Cancel
            </el-button>
            <el-button type="primary" icon="el-icon-warning" size="medium" round
                       @click="showDetail(slotProps.row.id)"
            >Detail
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin: 20px"
        background
        @current-change="handleCurrentChange"
        v-model:currentPage="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper, total"
        :total="orderList.length">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import {listAllOrders} from "@/request/api";
import {deleteOrder} from "@/request/api";
import {updatePaymentStatus} from "@/request/api";
import {getOrderItem} from '@/request/api';
import {getOrderDetail} from '@/request/api';
import  { showUserAccount} from "@/request/api";

export default {
  name: "OrderList",
  data: function () {
    return {
      orderList: [],
      itemList:[],
      activeIndex2: '1',
      pageSize: 7,
      dialogVisible: false,
      currentPage: 1,
      orderDetail: {},
      destAddr:{},
      srcAddr:{}
    };
  },
  mounted: function () {
     this.getAllOrders();
  },
  methods: {
    getAllOrders: function () {
      listAllOrders(
        {id: this.$route.query.id}
      ).then((response) => {
        console.log(response.data)
        this.orderList = response.data;
      });
    },
    //jumpToDetail(orderID) {
    //  this.$router.push({path: "OrderDetail", query: {id: orderID}});
    //},
    handleSelect(key, keyPath) {
      if(!this.$cookies.isKey('UserName') || !this.$cookies.isKey('UserID')){
          alert('Login expired, Please re-login');
          this.$router.push({ path: "SignIn"});
        }
      var UserName = this.$cookies.get('UserName');
      var UserID = this.$cookies.get('UserID');
      if (key === "2-1") {
        // userId 暂时未定义
        this.$router.push({path: "UserDetail", query: {id: UserID}});
      } else if (key === "2-2") {
        this.$router.push({path: "SignIn"});
      } else if(key == "3"){
        this.$router.push({ path: "ShoppingTrolley"});
      }else if (key === '5') {
          showUserAccount(
                  {id:this.$cookies.get('UserID')}
                ).then(
                  (response) =>{
                  //console.log('response',response);
                  //this.$cookies.set('IsSeller',response.data.seller);
                  if (response.data.seller==false){
                    alert('You currently not a seller. Only certified sellers can upload goods.');
                  }else{
                      this.$router.push( {path: "UploadGood"}  );
                  }
                }
               );
      } else if (key === '6') {
        this.$router.push({path: "BrowseGoods"});
      }
    },
    handleDeletion(orderId) {
      deleteOrder({id: orderId}).then((response) => {
        console.log(response)
        if (response.status === 'success') {
          alert(' Deletion success! ');
        } else {
          alert(' Deletion failed! ');
        }
        this.$router.go(0);
      });
    },
    handleCancel(orderId) {
      updatePaymentStatus({id: orderId, paymentStatus: 2}).then((response) => {
        if (response.status === 'success') {
          alert(' Cancelled success! ');
        } else {
          alert(' Cancelled failed! ');
        }
        this.$router.go(0);
      });
    },
    showDetail(orderId) {
      getOrderDetail({id: orderId}).then(response => {
        console.log('order detail: ',response)
        this.orderDetail = response.data;
        this.itemList = this.orderDetail.items;
        this.destAddr = this.orderDetail.destAddr;
        this.srcAddr = this.orderDetail.originAddr;
      })
      this.dialogVisible = true
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
};
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.card-header {
  display: table-cell;
  vertical-align: middle;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}

.Detail_row {
  padding: 5px;
}
</style>
