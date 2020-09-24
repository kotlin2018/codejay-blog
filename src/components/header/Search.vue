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
      placeholder="请输入文章题目关键字"
      v-model="keyWord"
      clearable>
        <el-button slot="append" icon="el-icon-search" class="search-btn" @click="searchKeyWord"></el-button>
      </el-input>
      <div class="catAndLab">
      <div class="side_title">
        <i class="iconfont" v-html="category.iconUrl"></i>&nbsp;{{category.title}}
      </div>
      <ul class="tag_cloud">
        <li class="tag_item" @click="categoryClick(item.article_category_id)" v-for="item in category.content">{{item.article_category_name}}</li>
      </ul>
      <div class="side_title">
        <i class="iconfont" v-html="label.iconUrl"></i>&nbsp;{{label.title}}
      </div>
      <ul class="tag_cloud">
        <li class="tag_item" @click="labelClick(item.article_label_id)" v-for="item in label.content">{{item.article_label_name}}</li>
      </ul>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {tagCloud} from 'utils/tagcloud';
import { getLabel, getCategory} from 'network/getContent';
export default {
  name:'Search',
  data() {
    return {
      label:{iconUrl:'&#xe794;',title:'标签云',content:[]},
      category:{iconUrl:'&#xe629;',title:'分 类',content:[]},
      drawer: false,
      keyWord: ''
    }
  },
  methods: {
    navActive() {
      this.$store.state.tabcontroleIsShow = !this.$store.state.tabcontroleIsShow;
    },
    labelClick(labelId) {
      let date = Date.parse(new Date());
      this.$store.state.labelId = labelId + date;
      this.$router.replace("article");
      this.drawer = false;
    },
    categoryClick(categoryId) {
      let date = Date.parse(new Date());
      this.$store.state.categoryId = categoryId + date;
      this.$router.replace("article");
      this.drawer = false;
    },
    searchKeyWord() {
      this.$store.state.keyWord = this.keyWord;
      this.$router.replace("article");
      this.keyWord = '';
      this.drawer = false;
    }
  },
  created() {
    /* 获取标签 */
    getLabel().then(res => {
      if(res.data.err == 0){
        let data = res.data.data;
        this.label.content = data;
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        });
      }
    }).catch(err => {});

    /* 获取分类 */
    getCategory().then(res => {
      if(res.data.err == 0){
        let data = res.data.data;
        this.category.content = data;
        /* 获取最新评论 */
        return getNewMessage();
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
    }).catch(err => {});
    tagCloud();
  }
}
</script>

<style scoped>
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
    padding: 20% 0;
  }
  .tag_cloud {
    list-style: none;
    display: flex;
    flex-flow: wrap;
    
    justify-content: flex-start;
  }

  .tag_item {
    line-height: 1.5rem;
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
    background-color: #ba9efa;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .tag_item:hover {
    transform: rotate3d(10, 20, 0, 30deg);
    cursor: pointer;
    transition: .5s;
  }

  .side_title {
    height: 40px;
    line-height: 40px;
    text-align: left;
    margin: 1rem 0;
    border-bottom: 1px solid rgba(100,100,100,.2);
  }
  @media screen and (max-width:600px) {
    .serch-none-box,.catAndLab {
      padding: 1rem;
    }
  }
</style>