<template>
  <div class="OrderDetail">

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



    <el-container>
      <el-main>
        <el-row>
          <el-card :body-style="{ padding: '0px' }">
            <el-row><span>customerId:{{ order.customerId }}</span></el-row>
            <!--el-row><span>customerName:{{ order.customerName }}</span></el-row-->
            <el-row><span>shopId:{{ order.shopId }}</span></el-row>
            <el-row><span>shopName:{{ order.shopName }}</span></el-row>
            <el-row><span>orderPrice: {{ order.orderPrice }}</span></el-row>
            <el-row><span>orderStatus:{{ order.orderStatus }}</span></el-row>
            <el-row><span>paymentStatus:{{ order.paymentStatus }}</span></el-row>
            <el-row><span>createTime:{{ order.createTime }}</span></el-row>
          </el-card> 
        </el-row>
        <el-row>
          <el-col
            :span="8"
            v-for="(item, index) in items"
            :key="index"
            :offset="2"
          >
          <el-card :body-style="{ padding: '0px' }">
            <h1 class="grid-content bg-purple-dark">{{ item.goodsName }}</h1>
            <span>{{ item.price}}</span>
            <el-button
                type="text"
                class="button"
                v-on:click="jumpToDetail(item.goodsId)"
                >see detail
              </el-button>
          </el-card>
          </el-col>
        </el-row>
        
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getOrderDetail } from "@/request/api";
import  { showUserAccount} from "@/request/api";
export default {
  name: "OrderDetail",
  data: function () {
    return {
      order: {},
      items: [],
      activeIndex2: '1'
    };
  },
  mounted: function () {
    this.getDetail();
  },
  methods: {
    getDetail: function () {
      getOrderDetail(
        {
        id: this.$route.query.id
        }
      ).then((response) => {
        //console.log('Order detail response ',response);
        this.order = response.data;
        this.items = this.order.items;
        //console.log('items: ',this.items);
      });
    },

    jumpToDetail(goodId) {
      this.$router.push({ path: "GoodsDetail", query: { id: goodId } });
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
        }else if(key == '4'){
            this.$router.push( {path: "OrderList", query: { id: UserID }  } );
        }else if(key == '5'){
             showUserAccount(
                  {id:this.$cookies.get('UserID')}
                ).then(
                  (response) =>{
                  //console.log(response);
                  //this.$cookies.set('IsSeller',response.data.seller);
                  if (response.data.seller==false){
                    alert('You currently not a seller. Only certified sellers can upload goods.');
                  }else{
                      this.$router.push( {path: "UploadGood"}  );
                  }
                }
               );
        }else if(key == '6'){
              this.$router.push( {path: "BrowseGoods"}  );
        }
    }

  },
};
</script>
