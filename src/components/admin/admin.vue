<template>
  <div class="admin_box">
    <el-header style="text-align: center; font-size: 22px">
          <span>博客后台管理</span>
        </el-header>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="250px">
        <el-menu :default-openeds="['1','2']">
          <el-menu-item class="heavy"><i class="el-icon-s-data"></i>数据统计</el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-order"></i>内容管理</template>
              <el-menu-item @click.native="$router.push('/admin/article/management')" index="1-1">文章管理</el-menu-item>
              <el-menu-item @click.native="$router.push('/admin/article/publish')" index="1-2">文章发表</el-menu-item>
              <el-menu-item @click.native="$router.push('/admin/article/message')" index="1-3">文章评论</el-menu-item>
          </el-submenu>
          <el-menu-item class="heavy"><i class="el-icon-user-solid"></i>用户管理</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-discount"></i>分类/标签</template>
              <el-menu-item @click.native="$router.push('/admin/article/category')" index="2-1">文章分类</el-menu-item>
              <el-menu-item @click.native="$router.push('/admin/article/label')" index="2-2">标签云</el-menu-item>
          </el-submenu>
          
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-menu"></i>其他内容</template>
              <el-menu-item index="4-1">相册上传</el-menu-item>
              <el-menu-item index="4-2">Demo上传</el-menu-item>
              <el-menu-item index="4-3">生活随笔</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-s-tools"></i>系统设置</template>
              <el-menu-item index="5-1">关于系统</el-menu-item>
              <el-menu-item index="5-2" @click="adminExit">退出系统</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
  
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {adminExit} from '../../network/adminOperation'
export default {
  name: 'admin',
  data() {
    return {
    }
  },
  methods:{
    adminExit() {
      adminExit().then(res => {
        if(res.data.err === 0) {
          console.log('期待下次登录！再见')
          this.$router.replace('login')
        }else {
          console.log('退出失败')
        }
      })
    }
  },
  
}
</script>

<style>
  .admin_box {
    height: 100vh;
  }

  .el-header {
    background-color:#4b4b4b;
    color: #fff;
    line-height: 60px;
  }
  
  .el-aside {
    background-color:#fff;
    min-height: calc(100vh - 60px);
  }
  .el-main {
    min-height: calc(100vh - 60px);
    padding: 0;
  }

  .el-aside::-webkit-scrollbar,.el-main::-webkit-scrollbar{
	  width: 0;
  }
</style>