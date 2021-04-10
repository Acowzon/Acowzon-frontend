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
                v-model="nameValidateForm.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <!-- 手机号 -->
            <!--el-form-item label="手机号" prop="phonenumber" :rules="[{ required: true, message: '手机号不能为空' }]"-->
            <el-form-item label="手机号" prop="phonenumber">
              <el-input
                placeholder="请输入手机号"
                type="text"
                v-model="nameValidateForm.phonenumber"
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      value1: true,
      nameValidateForm: {
        name: "",
        password: "",
        phonenumber: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
      //console.log(this.value1);
      this.$refs[formName].validate((valid) => {
        /*if (valid) {
          alert(
            "Name:" +
              this.nameValidateForm.name +
              ";Phonenumber:" +
              this.nameValidateForm.phonenumber +
              ";Password:" +
              this.nameValidateForm.password
          );*/
          //跨域解决代码
          if (this.value1 == true) {
            //个人用户注册
            axios
              .post(
                "/users/register",
                {
                  userName: this.nameValidateForm.name,
                  userType: 0,
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
                this.loginresult = response.data.data;
                console.log(this.loginresult);
              });

          } else {
            //商家用户注册
            axios
              .post("/users/register", [
                {
                   userName: this.nameValidateForm.name,
                   userType: 1,
                   password: this.nameValidateForm.password,
                },
              ])
              .then((re) => {
                if (re.data.flag == 1) {
                  //在json文件中定义一个flag，注册成功即返回一；否则返回零
                  alert("注册成功！");
                } else {
                  alert("注册失败！");
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
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
