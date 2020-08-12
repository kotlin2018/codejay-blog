<template>
  <div class="theme">
    <div id="Tz_perspective">
			<!--Tz_wrap start-->
			<div id='Tz_wrap'>
          <li v-for="item in menu" @click="itemClick(item.path)">
            <i class="iconfont" v-html="item.iconUrl"></i>
            {{item.name}}
          </li>
				<p></p>
			</div>
			<!--Tz_wrap end-->
		</div>
  </div>
</template>

<script>
import {showTime} from './themejs';
export default {
  name:'Theme',
   data() {
    return {
      menu:[
        {name:'文章列表',iconUrl:'&#xe60e;',path:'/article'},
        {name:'实战案例',iconUrl:'&#xe658;',path:'/demo'},
        {name:'关于博主',iconUrl:'&#xe638;',path:'/about'},
        {name:'软件&工具',iconUrl:'&#xe767;',path:'/tool'},
        {name:'生活随笔',iconUrl:'&#xe698;',path:'/essay'},
        {name:'登录/注册',iconUrl:'&#xe611;',path:'/login'},
        {name:'首页',iconUrl:'&#xe652;',path:'/'},
      ]
    }
  },
  mounted() {
    showTime();
  },
  methods:{
    itemClick(path) {
      this.$router.replace(path);
    }
  }
}
</script>

<style>
  .theme {
    /* width: 100%;
    height: 100%; */
    /* overflow:hidden; */
  }
  #Tz_perspective{
    perspective:2000px;
  }
  #Tz_wrap{
    width:100px; 
    height:100px; 
    margin:0 auto; 
    position:relative; 
    transform-style:preserve-3d; 
    transform:rotateX(-10deg) rotateY(0deg); 
    padding-top: 100px;
  }
  #Tz_wrap li{
    list-style: none;
    text-align: center;
    padding-top: 40px;
    width:100%; 
    height:100%; 
    position:absolute;  
    box-shadow:0 0 3px #000000;
    transform:rotateY(0deg) translateZ(0px);  
    -webkit-box-reflect:below 5px -webkit-linear-gradient(top,rgba(0,0,0,0) 40%,rgba(0,0,0,0.5) 100%); 
    -webkit-border-radius:5px; 
    -moz-border-radius:5px; 
    border-radius:5px;
  }
  /* #Tz_wrap p{ 
    width:1200px; 
    background:-webkit-radial-gradient(center center,600px 600px,rgba(122,122,124,0.2),rgba(0,0,0,0));
    border-radius:100%; 
    position:absolute; 
    left:50%; 
    top:102%; 
    margin-left:-600px; 
    margin-top:-600px; 
    transform:rotateX(90deg); 
  } */
</style>