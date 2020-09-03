<template>
  <div class="search">
    <div class="search-box">
    <el-input
      placeholder="请输入内容"
      v-model="keyWord"
      clearable
      size="small"
      >
      <el-button slot="append" icon="el-icon-search" class="search-btn" @click="searchKeyWord"></el-button>
    </el-input>
    </div>
    <span class="serch-none-btn" @click="drawer = true"><i class="iconfont icon-tubiao_huaban"></i></span>
    <span class="nav-none-btn" @click="navActive"><i class="iconfont icon-icon-"></i></span>
    <el-drawer
      class="side-nav"
      :visible.sync="drawer"
      size="100%">
        <el-input
        class="serch-none-box"
        placeholder="请输入内容"
        v-model="keyWord"
        clearable>
          <el-button slot="append" icon="el-icon-search" class="search-btn" @click="searchKeyWord"></el-button>
        </el-input>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name:'Search',
  data() {
    return {
      drawer: false,
      keyWord: ''
    }
  },
   methods: {
      navActive() {
        this.$store.state.tabcontroleIsShow = !this.$store.state.tabcontroleIsShow;
      },
      searchKeyWord() {
        this.$store.state.keyWord = this.keyWord;
        this.$router.replace("article");
        this.keyWord = '';
        this.drawer = false;
      }
    }
}
</script>

<style>
  .search{
    text-align: right;
    position: relative;
  }
  .serch-none-btn,.nav-none-btn {
    position:absolute;
    right: 1rem;
    top: 0;
    display: none;
  }
  .serch-none-btn i,.nav-none-btn i {
    font-size:1.5rem;
  }
  @media screen and (max-width:1200px) {
    .search-box {
      display: none;
    }
    .serch-none-btn {
      display: block;
      color: #fff;
    }
  }

  @media screen and (max-width:930px) {
    .serch-none-btn {
      right: 3rem;
    }
    .nav-none-btn {
      display: block;
      color:#fff;
    }
  }
  .search-btn:hover {
    transform: rotate(360deg) scale(1.2);
    color: #9466ff;
    transition: .5s;
  }
  .serch-none-box {
    padding: 20%;
  }
  @media screen and (max-width:600px) {
    .serch-none-box {
      padding: 5%;
    }
  }
</style>