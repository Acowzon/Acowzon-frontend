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
          <h1>欢迎登录-Acowzon</h1>
          <!--<el-button type="primary" icon="el-icon-right"
                >切换至商家版</el-button
              >-->

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
                v-model="nameValidateForm.useID"
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
                >提交</el-button
              >
              <el-button @click="resetForm('nameValidateForm')">重置</el-button>
            </el-form-item>
          </el-form>
          <router-link to="/SignUp">没有账号？点此创建</router-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { doLogin } from "@/request/api";
export default {
  name: "SignIn",
  data() {
    return {
      value1: true,
      nameValidateForm: {
        name: "",
        password: ""
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
            axios
              .post(
                "/users/doLogin",
                {
                  userID: this.nameValidateForm.userID,
                  password: this.nameValidateForm.password,
                },
                {
                  baseURL: "http://localhost:8080/",
                  headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "content-type": "application/json",
                  },
                }
              )
              .then((response) => {
                result = response.data.status;
                if(result.equals("error")){
                  alert("登陆失败!用户ID或密码错误!");
                }else{
                  this.$router.push({ path: "GoodsDetail", query: { id: goodId } });
                }
                console.log(this.loginresult);
              });
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
