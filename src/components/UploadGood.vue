
<template>

  <div class="uploadGood">
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
          <h1>Upload good</h1>
        
          <el-form
            :model="uploadGoodForm"
            ref="uploadGoodForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- 用户名 -->
            <el-form-item
              label="name"
              prop="name"
              :rules="[{ required: true, message: 'content must not be empty' }]"
            >
              <el-input
                placeholder=""
                type="text"
                v-model="uploadGoodForm.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="price"
              prop="price"
              :rules="[{ required: true, message: 'content must not be empty' }]"
            >
              <el-input
                placeholder=""
                type="text"
                v-model="uploadGoodForm.price"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="simpleDes"
              prop="simpleDes"
              :rules="[{ required: true, message: 'content must not be empty' }]"
            >
              <el-input
                placeholder=""
                type="text"
                v-model="uploadGoodForm.simpleDes"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="description"
              prop="description"
              :rules="[{ required: true, message: 'content must not be empty' }]"
            >
              <el-input
                placeholder=""
                type="text"
                v-model="uploadGoodForm.description"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="inventory"
              prop="inventory"
              :rules="[{ required: true, message: 'content must not be empty' }]"
            >
              <el-input
                placeholder=""
                type="text"
                v-model="uploadGoodForm.inventory"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            
            <el-form-item>
              <el-button
                type="primary"
                @click= "submitForm('uploadGoodForm')"
                style="background-color: #47484c"
                >submit</el-button
              >
              <el-button @click="resetForm('uploadGoodForm')">reset</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>


import { uploadGood } from "@/request/api";

export default {
  name: "UploadGood",
  data() {
    return {
      uploadGoodForm: {
        name:"",
        price:"",
        simpleDes:"",
        description:"",
        inventory:"",
        shopName:""
      }
    };
  },
  methods: {
    submitForm(formName) {
          var mesg = JSON.stringify(this.uploadGoodForm);
          //alert(this.nameValidateForm.userName+" "+this.nameValidateForm.userPwd+"   "+this.nameValidateForm.phone);
          console.log(mesg)
          //跨域解决代码
        uploadGood(
            {
            //id:"sdfe-fgd-trgtr",
            name:this.uploadGoodForm.name,
            price:this.uploadGoodForm.price,
            simpleDes: this.uploadGoodForm.simpleDes,
            description: this.uploadGoodForm.description,
            inventory: this.uploadGoodForm.inventory,
            //shopName: this.uploadGoodForm.shopName,     
            type:{
                id:'8abe2fe1-f0ef-495a-a048-4c9cd7242258',
                name: 'none'
            } ,   
            imageUrl:"-"  , 
            soldCount:"0"  ,  
            goodsStarsCount:"0"  ,  
            views:"0" ,
            shopId:"73743b61-05ca-491e-84f1-aca92a0bd66d"
            }
        ).then((response) => {
              console.log('response:'+response.status);
              if( response.status=="success"){
                  alert("upload success!");
                  this.$router.push({ path: "BrowseGoods"});
              }else{
                  alert("upload failed!");
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
