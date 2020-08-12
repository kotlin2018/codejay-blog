<template>
<div class="login">
  <div class="login_box" v-show="!isLogined">
    <admin-login v-show="isShow"/>
    <lor v-show="!isShow" @logined="logined()"/>
      <el-button class="login_switch" @click="loginSwitch" type="info" icon="el-icon-s-custom" circle></el-button>
  </div>
  <div class="profile_box" v-show="isLogined">
    <profile @exitLogined="exitLogined()"/>
  </div>
</div>
</template>

<script>
import adminLogin from '../../components/admin/childComps/adminLogin'
import Lor from './childComps/Lor'
import Profile from './childComps/Profile'
import { getCategory } from '../../network/getContent'
export default {
  name: 'Login',
  data() {
    return {
      isLogined:false,
      isShow:false,
    }
  },
  components: {
    adminLogin,
    Lor,
    Profile
  },
  methods: {
    loginSwitch() {
      this.isShow = !this.isShow;
    },
    logined(param) {
      this.isLogined = !this.isLogined;
    },
    exitLogined(param) {
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
  .login {
    max-width: 1200px;
    padding-top: 80px;
    padding-bottom: 20px;
  }
  .login_box {
    width: 100%;
    height:calc(100vh - 80px);
  }

  .login_switch {
    position: absolute;
    right: 0;
    top: 50%;
  }
  @media screen and (max-width: 1200px) {
  .login_switch {
    display: none;
  }
}
</style>