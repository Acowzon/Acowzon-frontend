<template>
  <div class="signin">
    <div class="container">
      <el-row :gutter="10">
        <el-col :span="14" :offset="5">
          <el-card shadow="always" class="login-container">
            <h1 class="title">Welcome to Acowzon</h1>
            <el-form :model="form" label-width="6em">
              <el-form-item
                label="姓名"
                prop="name"
                :rules="[{ required: true, message: '姓名不能为空' }]"
              >
                <el-input
                  type="text"
                  placeholder="请输入ID"
                  v-model="form.name"
                  auto-complete="off"
                ></el-input>
              </el-form-item>

              <!--el-form-item label="昵称" prop="nikiName" :rules="[{ required : true, message: '昵称不能为空'}]">
                            <el-input type="text" placeholder="请输入昵称" v-model="form.nikiName" auto-complete="off"></el-input>
                        </el-form-item-->

              <!--el-form-item label="性别">
                            <el-radio v-model="form.gender" label="man">男</el-radio>
                            <el-radio v-model="form.gender" label="woman">女</el-radio>
                        </el-form-item-->

              <!--el-form-item label="身份类型">
                            <el-radio v-model="form.identity" label="sell">卖方</el-radio>
                            <el-radio v-model="form.identity" label="buy">买方</el-radio>
                        </el-form-item-->

              <!--el-form-item label="收货地址" prop="positation" :rules="[{required: true, message: '收货地址不能为空'}]">
                            <el-input type="text" placeholder="请输入收货地址" v-model="form.positation" auto-complete="off"></el-input>
                        </el-form-item-->

              <!--el-form-item label="生日" prop="birthday" :rules="[{required: true, message: '生日不能为空'}]">
                            <el-input type="text" placeholder="请输入生日" v-model="form.birthday" auto-complete="off"></el-input>
                        </el-form-item-->

              <!--el-form-item label="邮箱" prop="mail" :rules="[{required: true, message:'邮箱不能为空'}]">
                            <el-input type="text" placeholder="请输入邮箱" v-model="form.mail" auto-complete="off"></el-input>
                        </el-form-item-->

              <!--el-form-item label="手机号" prop="phoneNumber" :rules="[{required: true, message:'手机号不能为空'}]">
                            <el-input type="text" placeholder="请输入手机号" v-model="form.phoneNumber" auto-complete="off"></el-input>
                        </el-form-item-->

              <el-form-item
                label="密码"
                prop="password"
                :rules="[{ required: true, message: '密码不能为空' }]"
              >
                <el-input
                  type="text"
                  placeholder="请输入密码"
                  v-model="form.password"
                  auto-complete="off"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submit()">登录</el-button>
                <el-button @click="reset()">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      form: {
        name: "",
        nikiName: "",
        gender: "man",
        identity: "sell",
        positation: "",
        birthday: "",
        mail: "",
        password: "",
        phoneNumber: "",
      },
    };
  },
  methods: {
    reset() {},
    submit() {},
  }
}
</script>