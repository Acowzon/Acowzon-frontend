<template>
  <div class="UserDetail">

    <el-container>
      <el-main>
            <h1 class="grid-content bg-purple-dark">User Name :{{ user.userName }}</h1>
            <img :src="user.imageUrl" class="image" />
            <h></h>
             <el-row>
              <div>Phone: {{ user.tel }}</div>
            </el-row>
            <h></h>
             <el-row>
              <div>Sex: {{ user.sex }}</div>
            </el-row>
            <h></h>
             <el-row>
              <div>BirthDay: {{ user.birthDay }}</div>
            </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { showUserAccount } from "@/request/api";

export default {
  name: "UserDetail",
  data: function () {
    return {
      user: {},
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
    }
  }
};
</script>
