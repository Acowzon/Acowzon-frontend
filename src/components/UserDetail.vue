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
                <el-popover
                placement="top-start"
                title="标题"
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

                       <el-form-item
                      label="sex"
                      prop="password"
                      >
                           <el-input
                           type="text"
                            placeholder="user sex"
                            v-model="updateForm.sex"
                           
                            ></el-input>
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
        email: "",
        sex :""
      }
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
        console.log(mesg)
        updateUserInfo(
           {  
             id:this.user.id, 
             userName:this.updateForm.userName,
              tel:this.updateForm.tel,
              email:this.updateForm.email,
              sex:this.updateForm.sex,
              realName:"-",
              nickName:"-",
              imageUrl:"-",
              birthDay:"1900-01-02",
              isSeller:"false",
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
                  this.$router.push({ path: "UserDetail", query: { id: "2b917481-32d7-482d-9a7d-d9472ddaa7dd" } });
              }else{
                  alert("modify failed.");
              }
              
        });
    },
  }
};
</script>
