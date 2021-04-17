<template>
  <div class="MainPage">
    <img src="../assets/acowzon.png">
    <h1>{{ msg }}</h1>
    <h2>页面测试链接</h2>
    <ul>
      <li>
        <router-link to="/">Go to Home</router-link>
      </li>
      <li>
        <router-link to="/SignIn">Sign In</router-link>
      </li>
      <li>
        <router-link to="/SignUp">Sign up</router-link>
      </li>
      <li>
        <router-link to="/UserDetail">User</router-link>
      </li>
      <li>
        <router-link to="/BrowseGoods">Browse Goods</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data () {
    return {
      msg: 'Welcome to Acowzon'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
