<template>
  <div class="UserDetail">

    <el-container >
      <el-header>
        <el-card class ="box-card-H">
          <div  class ="textH">MY PROFILE</div>
        </el-card>
      </el-header>
      <el-main>
          <el-card class = "box-card" >
            <div class="text">User Name :{{ user.userName }}</div>
          </el-card>

          <el-card class = "box-card" >

            <div>
              <el-avatar src="user.imageUrl" class="image" ></el-avatar>
            </div>
          </el-card>

          <el-card class = "box-card" >
            <el-row :gutter="40" class="text" >
                <div><i class="el-icon-message"></i> E-mail : {{ user.email }}</div>
            </el-row>
          </el-card>

          <el-card class = "box-card" >
            <el-row :gutter="40" class="text">
                <div><i class="el-icon-user"></i> Sex : {{ user.sex }}</div>
            </el-row>
          </el-card>

          <el-card class = "box-card" >
            <el-row :gutter="40" class="text">
                <div><i class="el-icon-phone-outline"></i> Tel : {{ user.tel }}</div>
            </el-row>
          </el-card>

          <el-card class = "box-card" >
            <el-row :gutter="40" class="text">
                <div><i class="el-icon-sold-out"></i> Is Seller : {{ user.seller }}</div>
            </el-row>
          </el-card>


            <el-row>
                <el-popover
                placement="top-start"
                title="User Info Modification"
                width="400"
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

                      <el-form-item label="gender">
                        <el-select v-model="sexValue" placeholder="gender">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                      </el-form-item>


                      <el-form-item label="to be seller">
                        <el-select v-model="isaSeller" placeholder="seller">
                        <el-option
                            v-for="item in sellerOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                      </el-form-item>


                     <el-button round type="primary" @click="submitForm(updateForm)">Submit</el-button>
                   </el-form>

                    <el-button  round type="info" size="medium" slot="reference">click to modify</el-button>

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
      sellerOptions:[
        {value: 'true',
          label: 'True'},
        {value: 'false',
          label: 'False'}
      ]
      ,
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
        sexValue: '',
        isaSeller:'false'
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
              isSeller:this.isaSeller,
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




<style>


  .text {
    font-size: 20px;
  }

  .textH {
    font-size: 50px;
    color :white;
  }

  .box-card-H{
    width: 100;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    background-color:#47484c;
  }


  .box-card {
    width: 100;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    background-color:#d5d9e5;
  }



</style>
