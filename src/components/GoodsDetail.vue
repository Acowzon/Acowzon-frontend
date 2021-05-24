<template>
  <div class="GoodsDetail">

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
  <el-menu-item index="4" >My Order</el-menu-item>
  <el-menu-item index="5" >Upload Goods</el-menu-item>
  <el-menu-item index="6" >Browse Goods</el-menu-item>
</el-menu>



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
            <el-row><div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                v-on:click="addToShoppingTrolley(good)"
                >Add In shopping cart
              </el-button>
            </div>
            </el-row>
          </el-card>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getGoodsDetail } from "@/request/api";
import { purchaseGood } from "@/request/api";

export default {
  name: "GoodsDetail",
  data: function () {
    return {
      good: {},
      activeIndex2: '1'
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

     addToShoppingTrolley: function (goodData) {
          this.$message({
                type: 'info',
                message: '成功加入购物车！'
              });
          var goodIdInLocal = "goodId_" + goodData.id;
          this.$set(this.good,'buyCount',1);
          localStorage.setItem(goodIdInLocal, JSON.stringify(this.good));
     },
    jumpToPurchase(good){

        if(!this.$cookies.isKey('UserName') || !this.$cookies.isKey('UserID')){
          alert('Login expired, Please re-login');
          this.$router.push({ path: "SignIn"});
        }

        var UserName = this.$cookies.get('UserName');
        var UserID = this.$cookies.get('UserID');

        purchaseGood(
          {
            items:
            [
              {goodsId:good.id,
              goodsName:good.name,
              imageUrl:"---",
              price:good.price,
              amount:"1"
              }
            ],
            customerId:UserID,
            shopId:"73743b61-05ca-491e-84f1-aca92a0bd66d",
            orderPrice : good.price,
            originAddr:{
              country:"China",
              province:"Shanxi",
              city:"Xian",
              detail:"Xidian U"
            },
            destAddr:{
              country:"China",
              province:"Shanxi",
              city:"Xian",
              detail:"Xidian U"
            },
            orderStatus:"NEW",
            paymentStatus:"WAITING",
          }
        ).then((response) => {
          if(response.status == 'success'){
            alert('Purchase success!');
          }else{
            alert('Purchase failed!');
          }
         // console.log(response);
      })

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
        }
        else if(key == "3"){
                    this.$router.push({ path: "ShoppingTrolley"});
                }
        else if(key == '4'){
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
  }
};
</script>
