<template>
<div class="lor">
  <div class="login_box">
    <!-- 模块菜单 -->
    <ul class="menu-tab">
      <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.text}}</li>
    </ul>
    <!-- 表单 -->
    <el-form :model="formLogin" status-icon :rules="rules" ref="formLogin" class="demo-ruleForm" size="medium">
      <el-form-item prop="username">
        <label>用户名</label>
        <el-input type="text" v-model="formLogin.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <label>密码</label>
        <el-input type="password" v-model="formLogin.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="passwords" v-if="modle==='register'">
        <label>确认密码</label>
        <el-input type="password" v-model="formLogin.passwords" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" v-if="modle==='register'">
        <label>邮箱</label>
        <el-input type="text" v-model="formLogin.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="modle==='register'">
        <label>验证码</label>
        <el-row :gutter="5">
          <el-col :span="16"><el-input type="text" class="code-text" v-model="formLogin.code" autocomplete="off"></el-input></el-col>
          <el-col :span="8"><el-button type="success" @click="sendMail('formLogin')" class="code-btn">获取验证码</el-button></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="submitClick('formLogin')" class="submit">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import {userLogin,sendMail,registe} from 'network/userOperation'
export default {
  name:'Lor',
  data() {
    /* 验证用户名 */
    let validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    /* 验证密码 */
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }else {
        callback();
      }
    };
    /* 验证重复密码 */
    var validatePasswords = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formLogin.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    /* 验证邮箱 */
    let validateEmail = (rule, value, callback) => {
      // 邮箱格式正则表达式
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === '') {
        callback(new Error('请输入邮箱'));
      }else if(!reg.test(value)){
        callback(new Error('邮箱格式有误'));
      }else {
        callback();
      }
    };
    /* 验证验证码 */
    let validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      }else {
        callback();
      }
    };
    return {
      show: false,
      // 模块菜单
      menuTab:[
        {text:"登录",current:true,type:'login'},
        {text:"注册",current:false,type:'register'}
      ],
      // 当前模块
      modle:'login',
      formLogin:{ 
        username:"",
        password:"",
        passwords:"",
        email: "",
        code: ""
      },
      // 验证规则
      rules: {
        username: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwords:[
          { validator: validatePasswords, trigger: 'blur' }
        ],
        email:[
          { validator: validateEmail, trigger: 'blur' }
        ],
        code:[
          { validator: validateCode, trigger: 'blur' }
        ]
      }
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
    toggleMenu(data){
      this.menuTab.forEach((ele,index) => {
        ele.current = false;
        
      });
      // 高光
      data.current = true;
      // 模块切换     
      this.modle = data.type
    },
    /**
     * 发送邮箱验证码
     */
    sendMail(formName) {
      this.$refs[formName].validateField("email", err => {
        if (!err) {
          // 邮箱验证通过 发送邮箱验证码
          sendMail(this.formLogin.email).then(res => {
            if(res.data.err == 0){
              this.$message({
                message: "邮件已发送，请注意接收哦！",
                type: 'success',
                offset:'80'
              });
            }else {
              this.$message({
                message: res.data.msg,
                type: 'error',
                offset:'80'
              });
            }
          }).catch((err) => {
            console.log(err)
          });
        } else {
          return false;
        }
      });
    },
    /**
     * 点击提交按钮
     * */
    submitClick(formName) {
      // 提交验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.modle === "login"){
            // 登录模块
            userLogin(this.formLogin.username,this.formLogin.password).then(res => {
              let data = res.data.data;
              if (res.data.err == 0) {
                localStorage.setItem("username", data.token); // token存储到本地
                this.$message({
                  message: res.data.msg,
                  type: 'success',
                  offset:'80'
                });
                this.formLogin.password = '';
                this.$emit('logined',true);
                location.reload();
              }else {
                this.$message({
                  type: 'error',
                  message: res.data.msg,
                  offset:'80'
                });
              }
            }).catch((err) => {
              console.log(err)
            })
          }else {
            // 注册模块
            registe(this.formLogin).then(res => {
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
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
  .lor {
    background-color: #344a5f;
  }
  .login_box{
    margin: auto;
    padding-top: 10rem;
    padding-bottom: 1rem;
    width: 25rem;
    box-sizing: border-box;
    border-radius: 10px;
  }
  @media screen and (max-width:600px) {
    .login_box {
      width:90%;
    }
  }
  .menu-tab{
    text-align: center;
  }
  .menu-tab li{
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0,0,0,.2);
  }

  .demo-ruleForm {
    margin-top: 1.5rem;
  }
  .demo-ruleForm .el-form-item {
    margin-bottom: 13px;
  }
  .el-form-item label{
    color: #fff;
  }
  .code-btn{
    text-align: center;
    width: 100%;
  }
  .submit {
    display: block;
    margin-top: 1rem;
    width: 100%;
  }
</style>