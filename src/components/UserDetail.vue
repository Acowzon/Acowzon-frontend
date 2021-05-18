<template>
  <div class="UserDetail">

    <el-container>
      <el-main>
            <h1 class="grid-content bg-purple-dark">User Name :{{ user.userName }}</h1>
            <img :src="user.imageUrl" class="image" />
            <h></h>
             <el-row>
              <div>email : {{ user.email }}</div>
            </el-row>
            <h></h>
             <el-row>
              <div>Sex: {{ user.sex }}</div>
            </el-row>
            <h></h>
            <el-row>
              <div>phone: {{ user.tel }}</div>
            </el-row>
             <el-row>
              <div>is seller: {{ user.seller }}</div>
            </el-row>


            <el-row>
                <el-popover
                placement="top-start"
                title="User Info Modification"
                width="200"
                trigger="click">

                  <el-form
                      :model="updateForm"
                      ref="updateForm"
                      label-width="100px"
                     class="demo-ruleForm"
                    >
                      <el-form-item
                      label="user name"
                      prop="password"
                      >
                           <el-input
                           type="text"
                            placeholder="userName"
                            v-model="updateForm.userName"

                            ></el-input>
                      </el-form-item>

                       <el-form-item
                      label="tel"
                      prop="password"
                      >
                           <el-input
                           type="text"
                            placeholder="user phone"
                            v-model="updateForm.tel"

                            ></el-input>
                      </el-form-item>

                       <el-form-item
                      label="email"
                      prop="password"
                      >
                           <el-input
                           type="text"
                            placeholder="user email"
                            v-model="updateForm.email"

                            ></el-input>
                      </el-form-item>

                      gender: <el-select v-model="sexValue" placeholder="gender">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>

                      <el-form-item label="add seller">
                        <el-switch v-model="updateForm.isseller"></el-switch>
                      </el-form-item>


                     <el-button @click="submitForm(updateForm)">submit</el-button>
                   </el-form>

                    <el-button slot="reference">click to modify</el-button>
                </el-popover>

            </el-row>
      </el-main>


    </el-container>
  </div>
</template>

<script>
import { showUserAccount } from "@/request/api";
import { updateUserInfo } from "@/request/api";

export default {
  name: "UserDetail",
  data: function () {
    return {
      user: {},
      updateForm: {
        userName: "",
        tel: "",
        email: ""
      },
      options: [{
          value: 'MALE',
          label: 'Male'
        }, {
          value: 'FEMALE',
          label: 'Female'
        }, {
          value: 'SECRET',
          label: 'Secret'
        }],
        sexValue: ''
    };
  },
  mounted: function () {
    this.getUserDetail();
  },
  methods: {
    getUserDetail: function () {
      showUserAccount(
        {
        id: this.$route.query.id,
        }
      ).then((response) => {
        console.log(response);
        this.user = response.data;
      });
    },

     submitForm(formName) {
        var mesg = JSON.stringify(this.updateForm);
        console.log('form info ',mesg)

        updateUserInfo(
           {
              id:this.user.id,
              userName:this.updateForm.userName,
              tel:this.updateForm.tel,
              email:this.updateForm.email,
              sex:this.sexValue,
              realName:"-",
              nickName:"-",
              imageUrl:"-",
              birthDay:"1900-01-02",
              isSeller:this.updateForm.isseller,
              addressSet:[
                {
                  country:"-",
                  city:"-",
                  province:"-",
                  detail:"_"
                }
              ]
            }
        ).then((response) => {
              //console.log('response:'+response.status);
              if( response.status=="success"){
                  alert("modify success!");
                  if(!this.$cookies.isKey('UserName') || !this.$cookies.isKey('UserID')){
                    alert('Login expired, Please re-login');
                    this.$router.push({ path: "SignIn"});
                  }else{
                    //this.$router.push({ path: "UserDetail", query: { id: this.$cookies.get('UserID')} });
                    this.$router.go(0);
                  }

              }else{
                  alert("modify failed.");
              }

        });
    },
  }
};
</script>
