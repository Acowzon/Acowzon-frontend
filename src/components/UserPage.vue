<template>
  <div class="UserPage">
    <div class="right">
      <div class="title">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <p class="taskWord">
                <el-link
                  icon="el-icon-house"
                  target="_blank"
                  type="info"
                  :underline="false"
                  >
                  <router-link to="/BrowseGoods">Browse Goods</router-link>
                  </el-link>

              </p>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <p class="taskWord">
                <el-link
                  icon="el-icon-s-order"
                  href="https://element.eleme.io"
                  target="_blank"
                  type="info"
                  :underline="false"
                  >我的订单</el-link
                >
              </p>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <p class="taskWord">
                <el-link
                  icon="el-icon-shopping-cart-2"
                  href="https://element.eleme.io"
                  target="_blank"
                  type="info"
                  :underline="false"
                  >我的购物车</el-link
                >
              </p>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <p class="taskWord">
                <el-link
                  icon="el-icon-chat-line-square"
                  href="https://element.eleme.io"
                  target="_blank"
                  type="info"
                  :underline="false"
                  >商品评价</el-link
                >
              </p>
            </div>
          </el-col>
          <p class="layout">
            <el-link
              href="https://element.eleme.io"
              target="_blank"
              icon="el-icon-user"
              >退出</el-link
            >
          </p>
          <p class="layout">
            <el-link
              href="https://element.eleme.io"
              target="_blank"
              icon="el-icon-message-solid"
              >消息</el-link
            >
          </p>
          <p class="layout">
            <el-link
              target="_blank"
              icon="el-icon-user-solid"
              >
              <router-link to="/SignIn">切换账号</router-link>
              </el-link
            >
          </p>
        </el-row>
      </div>
      <div class="boder">
        <center>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <p class="TitleWord">个人信息</p>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">
                <el-button
                  class="modify"
                  type="primary"
                  round
                  @click="dialogFormVisible = true"
                  >修改</el-button
                >
              </div>
            </el-col>
          </el-row>
        </center>
        <el-dialog title="个人信息修改" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="userImg" :label-width="formLabelWidth">
                  <el-input v-model="userImg" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户昵称" :label-width="formLabelWidth">
                  <el-input v-model="Nickname" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="name" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-select v-model="sex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份类型" :label-width="formLabelWidth">
                  <el-select v-model="status" placeholder="请选择类型">
                    <el-option label="买家" value="买家"></el-option>
                    <el-option label="卖家" value="卖家"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input v-model="password" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <!--el-form-item label="用户收货地址" :label-width="formLabelWidth">
            <el-input v-model="Adress" autocomplete="off"></el-input>
               </el-form-item-->
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户生日" :label-width="formLabelWidth">
                  <el-input v-model="birthday" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户邮箱" :label-width="formLabelWidth">
                  <el-input v-model="Email" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="用户手机号码"
                  :label-width="formLabelWidth"
                >
                  <el-input v-model="Phone" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"
              >确 定</el-button
            >
          </div>
        </el-dialog>

        <!-- Substituted with GoodsDetail template -->
        <el-main>
                  <el-col
                    :span="8"
                    v-for="(o, index) in 2"
                    :key="o"
                    :offset="index > 0 ? 2 : 0"
                  ></el-col>
                  <el-card :body-style="{ padding: '0px' }">
                    <h1 class="grid-content bg-purple-dark">{{ user.userId }}</h1>
                    <el-row>
                        <div>UserName：{{ user.userName }}</div>
                    </el-row>
                    <el-row>
                          <div>Real Name：{{ user.userRealname }}</div>
                    </el-row>
                    <el-row>
                          <div>Phone：{{ user.userPhone }}</div>
                    </el-row>
                    <el-row>
                          <div>Email：{{ user.userEmail }}</div>
                    </el-row>
                    <el-row>
                        <el-button
                          type="text"
                          class="button"
                          v-on:click="jumpToMainPage()"
                         >回到首页
                        </el-button>
                    </el-row>
                  </el-card>
          </el-main>
      </div>
    </div>
  </div>
</template>

<script>
import { showUserAccount } from "@/request/api";

export default {
  name: "UserDetail",
  data: function () {
    return {
      user: {},
    };
  },
  mounted: function () {
    this.showUserAccount();
  },
  methods: {
    showUserAccount: function () {
      showUserAccount({
        userId: this.$route.query.id,
      }).then((response) => {
        this.user = response.data;
      });
    },
    jumpToMainPage(goodId) {
       this.$router.push({ path: "BrowseGoods"});
    },
  },
};
</script>

<style scpoed>
  .right {
    width: 100%;
    margin-left: 0%;
    height: 100%;
  }

  .task {
    float: left;
    margin-left: 50px;
    margin-top: 0px;
  }

  .taskWord {
    padding-top: 5px;
    margin-left: 25%;
    color: #47484C;
  }

  .title {
    background-color: #47484C;
    height: 50px;
    width: 100%;
    position: fixed;
  }

  .boder {
    background-color: #D5D9E5;
    height: 100%;
    padding-top: 50px;
  }

  .layout {
    float: right;
    margin-right: 20px;
  }

  .img {
    width: 20px;
    height: 20px;
    padding-top: 20px;
  }

  .InputBox {
    padding-left: 20px;
    margin-top: 20px;
    height: 30px;
    width: 40%;
    margin-left: 10px;
    color: #47484C;
  }

  .TitleWord {
    padding: 80px 5% 0 5%;
    display: inline-block;
  }

  .modify {
    margin-left: 80%;
    display: inline-block;
  }

  .AccountNumberP {
    display: inline-block;
    margin-top: 25px;
    margin-left: 5%;
  }

  .aa {
    margin-left: 70px;
  }

  .bb {
    margin-left: 30px;
  }

  .ss {
    margin-top: 5px;
    transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    /* IE 9 */

    -moz-transform: rotate(-90deg);
    /* Firefox */

    -webkit-transform: rotate(-90deg);
    /* Safari and Chrome */

    -o-transform: rotate(-90deg);
    /* Opera */
  }

  .titleImg {
    margin-left: 20px;
  }

  .userImg {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
</style>
