<template>
  <div :class="{show:$store.state.tabcontroleIsShow}" class="MeunTab">
    <div class="tab_back" @click="tabBack"><i class="iconfont el-icon-d-arrow-left"></i></div>
    <div class="profile">
      <img width="100" height="100" src="../assets/img/admintx.jpg" alt />
      <div class="profile">CodeJay</div>
    </div>
    <ul class="dis_nav_list" style="padding-left:1.5rem;">
      <li>
        <i class="iconfont icon-qq">:1466202385</i>
      </li>
      <li>
        <i class="iconfont icon-gongzhonghao">:wj167758</i>
      </li>
      <li>
        <i @click="$router.push('/home')" class="iconfont icon-shouye1">首页</i>
      </li>
      <li>
        <i @click="$router.push('/article')" class="iconfont icon-xiezi">文章列表</i>
      </li>
      <li>
        <i @click="$router.push('/demo')" class="iconfont icon-anli">Demo</i>
      </li>
      <li>
        <i @click="$router.push('/about')" class="iconfont icon-wode">关于博主</i>
      </li>
      <li>
        <i @click="$router.push('/tool')" class="iconfont icon-gongju">软件&工具</i>
      </li>

      <li>
        <i @click="skip" class="iconfont icon-geren2">登陆 / 注册</i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "tabcontorle",
  data() {
    return {
      flag: false
    };
  },
  methods: {
    tabBack() {
      this.$store.state.tabcontroleIsShow = !this.$store.state.tabcontroleIsShow;
    },
    skip() {
      if (localStorage.getItem("username")) {
        this.$router.push("/logined");
        return;
      }
      this.$router.push("/login");
    },
    Gogithub() {
      location.href = "https://github.com/Acmenlei";
    }
  }
};
</script>
<style>
.MeunTab {
  padding-top: 4rem;
  width: 68%;
  height: 100vh;
  background: url("../assets/img/navbg.jpg") no-repeat center;
  background-size: cover;
  position: fixed;
  left: -68%;
  top: 0rem;
  z-index: 998;
  border-right: 1px solid lightblue;
  transition: all 0.5s ease-in-out;
  opacity: .88;
}
.tab_back {
  position: absolute;
  top: 49%;
  right: .2rem;
  color: #e5ff00;
  opacity: 1;
  
}
.tab_back i {
  font-size: 1.5rem;
}
.dis_nav_list {
  list-style: none;
}
.dis_nav_list li {
  height: 2.5rem;
  line-height: 2.5rem;
}
.dis_nav_list > li i {
  font-size: 1rem;
  font-style: normal;
  margin-left: 1rem;
  /* color: rgba(255, 255, 255, .8); */
  /* color: #e5ff00; */
  color: #fff;
}

@media screen and (min-width: 930px) {
  .MeunTab {
    display: none;
  }
}
/* @media screen and (max-width: 930px) { */
  /* .dis_nav_list > li i {
    font-size: 1rem;
    font-style: normal;
    margin-left: 1rem;
  } */
  /* .MeunTab {
    display: block;
  } */
/* } */
.dis_nav_list > li i:hover {
  cursor: pointer;
  color: #9466ff;
}
.profile {
  text-align: center;
}
.profile div {
  text-align: center;
  color: white;
  font-size: 25px;
  position: relative;
  background: linear-gradient(yellow, red);
  background-clip: text;
  -moz-background-clip: text;
  /* -webkit-background-clip: text;*/
  color: transparent;
}
.profile img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: all 2s;
  box-shadow: 0 0 5px #fff;
  margin: 1rem;
}
.profile img:hover {
  transform: rotate(360deg);
}

.show {
  left: 0;
  animation: borderFlex 0.9s;
}
@keyframes borderFlex {
  0% {
    border-top-right-radius: 500px;
    height: 0;
  }
  100% {
    border-top-right-radius: 0;
    height: 100vh;
  }
}
</style>