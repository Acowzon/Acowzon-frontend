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
          <h1>Welcome to=> Acowzon</h1>

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
                placeholder="请输入用户ID"
                type="text"
                v-model="nameValidateForm.userName"
                autocomplete="off"
             ></el-input>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item
              label="密 码"
              prop="password"
              :rules="[{ required: true, message: '密码不能为空' }]"
            >
              <el-input
                type="text"
                placeholder="请输入密码"
                v-model="nameValidateForm.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('nameValidateForm')"
                style="background-color: #47484c"
                >go!</el-button
              >
              <el-button @click="resetForm('nameValidateForm')">reset</el-button>
            </el-form-item>
          </el-form>
          <router-link to="/SignUp">Not have account?Click here to register-></router-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { doLogin } from "@/request/api";
import  { showUserAccount} from "@/request/api";


export default {
  name: "SignIn",
  data() {
    return {
      value1: true,
      nameValidateForm: {
        userName: "",
        password: ""
      },
    };
  },
  methods: {
    submitForm(formName) {
        var mesg = JSON.stringify(this.nameValidateForm);
        console.log(mesg)
        doLogin(
           {  userName:this.nameValidateForm.userName,
              password:this.nameValidateForm.password
            }
        ).then((response) => {
              //console.log(response.data)
              if( response.status=="success"){
                  alert("sign in success!");
                  this.$cookies.set('UserName', this.nameValidateForm.userName,60*10);  
                  this.$cookies.set('UserID',response.data,60*10);
                  this.$router.push({ path: "BrowseGoods"});
              }else{
                  alert("sign in failed! Please check your account name and password.");
              }
              //console.log('response:'+response.data);
        });

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
