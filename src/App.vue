<template>
  <div id="app">
    <el-backtop   :visibility-height="300"><i class="iconfont icon-icon-test"></i></el-backtop>
    <app-header :style="{display:showNav}" ref="appHeader"></app-header>
      <keep-alive exclude="Detail,admin">
        <router-view @click="tabIsShow"></router-view>
      </keep-alive>
    <tabcontrole />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Tabcontrole from "./components/Tabcontorle";

import BackTop from './components/BackTop';

export default {
  name: "app",
  components: {
    AppHeader,
    AppFooter,
    Tabcontrole,
    BackTop
  },
  data() {
    return {
      showNav: "",
      reg: "/detail/",
      reg2: "/admin"
    };
  },
  methods: {
    tabIsShow() {
      if (this.$store.state.tabcontroleIsShow) {
      }
      return;
    }
  },
  
  
  watch: {
    $route(to, from) {
      if (
        to.path != "/" &&
        to.path != "/home" &&
        to.path.indexOf(this.reg2) &&
        to.path.indexOf(this.reg)
      ) {
        this.showNav = "block";
        this.$store.state.tabcontroleIsShow = false;
        this.$forceUpdate();
        
      } else {
        this.showNav = "none";
        this.$store.state.tabcontroleIsShow = false;
      }
    }
  }
};
</script>

<style>
@import "assets/css/base.css";

#app {
  height: 100%;
  width: 100%;
  /* overflow-y: scroll; */
  background: url(assets/img/blogbg.png);
  -webkit-overflow-scrolling: touch;
}

.el-backtop i {
  display: -webkit-flex;
  display: flex;
  font-size: 26px;
  color: #6644ff;
}
</style>
