
<template>

  <div class="signup">
    <el-row :gutter="40">
      <!-- gutter 栅格间距 -->
      <el-col :span="10" :offset="10">
        <!-- span 栅格占的列数，offset是偏移列数 -->
        <div class="grid-content"></div>
      </el-col>
    </el-row>

    <el-row :gutter="100">
      <!-- gutter 栅格间距 -->

      <el-col :span="8" :offset="8">
        <!-- span 栅格占的列数，offset是偏移列数 -->
        <el-card shadow="always" style="background-color: #d5d9e5">
          <h1>欢迎注册Acowzon</h1>
          <!--<el-button type="primary" icon="el-icon-right"
                >切换至商家版</el-button
              >-->
          <el-switch
            v-model="value1"
            active-text="个人版"
            inactive-text="商家版"
          >
          </el-switch>

          <el-divider></el-divider>

          <el-form
            :model="nameValidateForm"
            ref="nameValidateForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- 用户名 -->
            <el-form-item
              label="用户名"
              prop="name"
              :rules="[{ required: true, message: '用户名不能为空' }]"
            >
              <el-input
                placeholder="请输入用户名"
                type="text"
                v-model="nameValidateForm.userName"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <!-- 手机号 -->
            <!--el-form-item label="手机号" prop="phonenumber" :rules="[{ required: true, message: '手机号不能为空' }]"-->
            <el-form-item label="手机号" prop="phonenumber">
              <el-input
                placeholder="请输入手机号"
                type="text"
                v-model="nameValidateForm.userPhone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item
              label="密 码"
              prop="password"
            >
              <el-input
                type="text"
                placeholder="请输入密码"
                v-model="nameValidateForm.userPwd"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click= "submitForm('nameValidateForm')"
                style="background-color: #47484c"
                >提交</el-button
              >
              <el-button @click="resetForm('nameValidateForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
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
        userPwd: ""
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
           /* console.log(this.nameValidateForm);
            getGoodsDetail(this.nameValidateForm).then((response) => {
        console.log(response);
        //this.good = response.data;
      })*/
            //个人用户注册

            /*register(
              {userName:this.nameValidateForm.userName,
              userPwd:this.nameValidateForm.userPwd,
              userPhone: this.nameValidateForm.userPhone
              }
            ).then((response) => {});*/
            register(
              {userName:this.nameValidateForm.userName,
              userPwd:this.nameValidateForm.userPwd,
              userPhone: this.nameValidateForm.userPhone,     
              userRealname:"-"  ,   
              userNickname:"-"  , 
              userImage:"-"  ,  
              userEmail:"-"  ,  
              sex:"-" ,
              userBirth:"1900-01-01",
              userType:"1",
              userAddressId:"-"   
              }
            ).then((response) => {});
          } else {
            //商家用户注册
            register(

              );
          }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    change() {
      this.value1 = !this.value1;
      console.log(this.value1);
    },
  },
};
</script>
