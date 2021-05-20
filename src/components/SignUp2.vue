<template>
  <div class="signup" :style="back">
    <el-row :gutter="80">
      <!-- gutter 栅格间距 -->
      <el-col :span="2" :offset="0" >
        <pre><h2 style="font-family:Consolas;color:#4748a0;font-size:30px">   Acowzon</h2></pre>
        <!-- span 栅格占的列数，offset是偏移列数 -->
        <div class="grid-content"></div>
      </el-col>
    </el-row>

    <el-row :gutter="100">
      <!-- gutter 栅格间距 -->
      <el-col :span="8" :offset="8">
        <!-- span 栅格占的列数，offset是偏移列数 -->
        <el-card class ="card" shadow="always">
          <h1 style="font-family:Consolas;color:#4748a0">Welcome to => Acowzon</h1>
          <!--<el-button type="primary" icon="el-icon-right"
                >切换至商家版</el-button
              >-->
          <el-switch
            v-model="value1"
            active-text="sign up as a buyer"
            inactive-text="sign up as a seller"
          >
          </el-switch>

          <el-divider></el-divider>

          <el-form
            :model="nameValidateForm"
            ref="nameValidateForm"
            label-width="65px"
            class="demo-ruleForm"
          >
            <!-- 用户名 -->
            <el-form-item
              label="User Name"
              prop="name"
              :rules="[{ required: true, message: '用户名不能为空' }]"
            >
              <el-input
                placeholder="Your user name"
                type="text"
                v-model="nameValidateForm.userName"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <!-- 手机号 -->
            <!--el-form-item label="手机号" prop="phonenumber" :rules="[{ required: true, message: '手机号不能为空' }]"-->
            <el-form-item label="Tel" prop="phonenumber">
              <el-input
                placeholder="Your tel number"
                type="text"
                v-model="nameValidateForm.userPhone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item
              label="Password"
              prop="password"
            >
              <el-input
                type="text"
                placeholder="Set your password"
                v-model="nameValidateForm.userPwd"
                show-password
              ></el-input>
            </el-form-item>
            <el-divider></el-divider>
          </el-form>
          <el-form>
          <el-form-item>
              <el-button
                type="primary"
                @click= "submitForm('nameValidateForm')"
                style="background-color: #47484c;font-family:Consolas;font-size:16px;color:#fdfdfd"
                >submit</el-button>
              <el-button @click="resetForm('nameValidateForm')"
                         style="background-color:#E6E6FA;font-family:Consolas;font-size:16px;color:#47484c"
                         >reset</el-button>
              </el-form-item>
              <el-form-item>
              <el-button @click="goSignIn()" size="medium" style="font-family:Consolas;font-size:14px;color:#47484c">already have an account?</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  <br/>
  <br/>
  <p style="font-family:Consolas">Copyright © 2021 Acowzon All Right Reserved(Nein</p>
  </div>
</template>

<script>

import { register } from "@/request/api";
import { getGoodsDetail } from "@/request/api";

export default {
  name: "SignUp",
  data() {
    return {
      value1: true,
      nameValidateForm: {
        userName: "",
        userPhone: "",
        userPwd: "",
      },
      back:{
        backgroundImage:"url("+require("../../static/IMG_1634.jpg")+")",
        backgroundRepeat:"no-repeat",
        height: "100vh",
        width: "100%",
        backgroundSize:"cover",
      }
    };
  },
  methods: {
    submitForm(formName) {
          var mesg = JSON.stringify(this.nameValidateForm);
          //alert(this.nameValidateForm.userName+" "+this.nameValidateForm.userPwd+"   "+this.nameValidateForm.phone);
          console.log(mesg)
          //跨域解决代码
          if (this.value1 == true) {
            register(
              {userName:this.nameValidateForm.userName,
              password:this.nameValidateForm.userPwd,
              tel: this.nameValidateForm.userPhone,
              realName:"-"  ,
              nickName:"-"  ,
              imageUrl:"-"  ,
              email:"-"  ,
              sex:"SECRET" ,
              birthDay:"1900-01-01",
              userType:"1"
              }
            ).then((response) => {
              console.log('response:'+response.status);
              if( response.status=="success"){
                  alert("sign up success! go to log in...");
                  this.$router.push({ path: "SignIn"});
              }else{
                  alert("sign up failed!");
              }

            });
          } else {
            //商家用户注册
             register(
              {userName:this.nameValidateForm.userName,
              password:this.nameValidateForm.userPwd,
              tel: this.nameValidateForm.userPhone,
              realName:"-"  ,
              nickName:"-"  ,
              imageUrl:"-"  ,
              email:"-"  ,
              sex:"SECRET" ,
              birthDay:"1900-01-01",
              userType:"2"
              }
            ).then((response) => {
              console.log('response:'+response.status);
              if( response.status=="success"){
                  alert("sign up success! go to log in...");

                  this.$router.push({ path: "SignIn"});
              }else{
                  alert("sign up failed!");
              }

            });
          }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    change() {
      this.value1 = !this.value1;
      console.log(this.value1);
    },
    goSignIn(){
      this.$router.push({ path: "SignIn"});
    }
  },
};
</script>

<style scoped>
.signup{
  width:100%;
  height:100%;
  top:0px;
  left:0px;
}
.grid-content{
  min-height: 30px;
}
.content{
  margin: 0 auto;
}
.el-card{
  border-radius: 20px;
  box-shadow: 0 2px 4px 1px #556c99;
  background-color: #9daddd6b;
}
.el-row{
  margin-bottom: 0px;
  padding:0px;
}
.el-button{
  border-radius: 12px;
}
</style>
