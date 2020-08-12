<template>
<div class="lor">
  <!-- 登录 -->
  <div class="login-box" v-show="!show">
    <h2>欢迎登录</h2>
    <form>
      <div class="user-box">
        <input type="text"  v-model="formLogin.user" placeholder="用户名" name="" required="">
        <label>用户名</label>
      </div>
      <div class="user-box">
        <input type="password" v-model="formLogin.password" placeholder="密码" name="" required="">
        <label>密码</label>
      </div>
      <div class="btn-box">
        <a @click="userLogin">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          登 录
        </a>
        <a @click="switchClick">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          去 注 册
        </a>
      </div>
    </form>
  </div>
  <!-- 注册 -->
  <div class="login-box register-box" v-show="show" >
    <h2>欢迎注册</h2>
    <form>
      <div class="user-box">
        <input type="text" v-model="formRegister.username" placeholder="用户名" name="" required="">
        <label>用户名</label>
      </div>
      <div class="user-box">
        <input type="password" v-model="formRegister.password" placeholder="密码" name="" required="">
        <label>密码</label>
      </div>
      <div class="user-box">
        <input type="email" v-model="formRegister.email" placeholder="邮箱" name="" required="">
        <label>邮箱</label>
      </div>
      <div class="send_email">
      <a @click="sendMail">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          发 送 验 证 码
        </a>
      </div>
      <div class="user-box">
        <input type="text" v-model="formRegister.code"  placeholder="验证码" name="" required="">
        <label>验证码</label>
      </div>
      <div class="btn-box">
        <a @click="register">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          注 册
        </a>
        <a @click="switchClick">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          去 登 录
        </a>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import {userLogin,sendMail,registe} from '../../../network/userOperation'
export default {
  name:'Lor',
  data() {
    return {
      show: false,
      formLogin:{ 
        user:"",
        password:""

      },
      formRegister: {
        username: "",
        password: "",
        email: "",
        code: ""
      },
    }
  },
  directives: {
    focus:{
      inserted: el => {
        el.focus()
      }
    }
  },
  methods: {
    /**
     * 切换登录与注册
     */
    switchClick() {
      this.show = !this.show
    },
    
    /**
     * 发送邮箱验证码
     */
    sendMail() {
      /* 发送邮箱验证码 */
      sendMail(this.formRegister.email).then(res => {
        console.log(res)
        if(res.data.err == 0)
        this.$message({
          showClose: true,
          message: "邮件已发送，请注意接收哦！",
          type: 'success',
          offset:'80'
        });
      }).catch((err) => {
        console.log(err)
      })
    },

    /**
     * 点击注册按钮事件
     * */
    register() {
      if (this.formRegister.username.length <= 0) {
        this.$message({
          showClose: true,
          type: 'error',
          message: "用户名不能为空",
          offset:'80'
        });
      } else if(this.formRegister.password.length <= 0) {
        this.$message({
          showClose: true,
          type: 'error',
          message: "密码不能为空",
          offset:'80'
        });
      } else {
        registe(this.formRegister).then(res => {
          if(res.data.err == 0){
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'success',
              offset:'80'
            });
          }else{
            this.$message({
              showClose: true,
              type: 'error',
              message: res.data.msg,
              offset:'80'
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },

    /**
     * 点击登录按钮
     * */
    userLogin() {
      if (this.formLogin.user.length <= 0) {
          this.$message({
            showClose: true,
            type: 'error',
            message: "用户名不能为空",
            offset:'80'
          });
      } else if(this.formLogin.password.length <= 0) {
          this.$message({
            showClose: true,
            type: 'error',
            message: "密码不能为空",
            offset:'80'
          });
      } else {
        userLogin(this.formLogin.user,this.formLogin.password).then(res => {
          let data = res.data.data;
          if (res.data.err == 0) {
            localStorage.setItem("username", data.token);
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'success',
              offset:'80'
            });
            this.formLogin.password = '';
            this.$emit('logined',true);
            this.$router.back();
            location.reload();
            // this.$router.replace('/home')
          }else {
            this.$message({
              showClose: true,
              type: 'error',
              message: res.data.msg,
              offset:'80'
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
  }

}
</script>

<style>
  .lor {
    height: 100vh;
    display: flex;
    justify-content: center;
  }
  .login-box {
    margin-top: 2rem;
    position: absolute;
    top: 50%;
    width: 30rem;
    padding: 40px;
    transform: translate(0, -50%);
    background: rgba(0,0,0,.5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
  }
  @media screen and (max-width:800px) {
    .login-box {
      width:70%;
    }
  }
  @media screen and (max-width:480px) {
    .login-box {
      width:90%;
    }
  }
  .login-box h2 {
    margin: 0 0 30px;
    color: #fff;
    text-align: center;
  }

  .login-box .user-box {
    position: relative;
  }

  .login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
  }
  .login-box .user-box label {
    position: absolute;
    top:0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
  }

  .login-box .user-box input:focus ~ label,
  .login-box .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
  }

  .login-box form a {
    position: relative;
    display: inline-block;
    padding: 8px 15px;
    text-align: center;
    color: #03e9f4;
    font-size: 12px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 20px;
    cursor: pointer;
  }
  .send_email {
    display: flex;
    justify-content: center;
  }
  .send_email a {
    /* margin-top: 0px !important; */
    margin-bottom: 10px;
  }
  .btn-box {
    display: flex;
    justify-content: space-between;
  }

  .login-box a:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 100px #03e9f4;
  }

  .login-box a span {
    position: absolute;
    display: block;
  }

  .login-box a span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }
    50%,100% {
      left: 100%;
    }
  }

  .login-box a span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: btn-anim2 1s linear infinite;
    animation-delay: .25s
  }

  @keyframes btn-anim2 {
    0% {
      top: -100%;
    }
    50%,100% {
      top: 100%;
    }
  }

  .login-box a span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: btn-anim3 1s linear infinite;
    animation-delay: .5s
  }

  @keyframes btn-anim3 {
    0% {
      right: -100%;
    }
    50%,100% {
      right: 100%;
    }
  }

  .login-box a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: btn-anim4 1s linear infinite;
    animation-delay: .75s
  }

  @keyframes btn-anim4 {
    0% {
      bottom: -100%;
    }
    50%,100% {
      bottom: 100%;
    }
  }

</style>