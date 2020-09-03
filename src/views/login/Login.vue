<template>
<div class="login">
  <div class="login_box" v-show="!isLogined">
    <lor @logined="logined()"/>
  </div>
  <div class="profile_box" v-show="isLogined">
    <profile @exitLogined="exitLogined()"/>
  </div>
</div>
</template>

<script>
import Lor from './childComps/Lor'
import Profile from './childComps/Profile'
import { getCategory } from 'network/getContent'
export default {
  name: 'Login',
  data() {
    return {
      isLogined:false,
    }
  },
  components: {
    Lor,
    Profile
  },
  methods: {
    logined() {
      this.isLogined = !this.isLogined;
    },
    exitLogined() {
      this.isLogined = !this.isLogined;
    }
  },
  mounted(){
    if(typeof(localStorage.username) != "undefined"){
      this.isLogined = true;
    }
  }
}
</script>

<style>
  @import url('./childComps/profile.css');
  
  .login_box {
    min-height: 100vh;
  }

</style>