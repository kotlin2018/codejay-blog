<template>
<div class="article_list">
  <p class="article_p">文章列表 <img src="../../../assets/img/yeshu.gif" alt=""></p>
  <div class="article_item">
    <div class="space" v-for="item in articleLists">
      <!--文章配图-->
      <div class="art_img">
        <img :src="item.article_image" />
      </div>
      <!--文章内容-->
      <div class="content">
        <header>
          <span class="article_category">{{item.article_category_name}}</span>
          <span class="article_title">{{item.article_label_name}}</span>
          <a href="#">{{item.article_title}}</a>
        </header>
        <section>
          <p class="summary" data-v-19a52a1e>{{item.article_synopsis}}</p>
        </section>
        <footer>
          <!--时间、浏览量、评论量、点赞量-->
          <div class="feed_back">
            <i class="iconfont icon-rili">&nbsp;{{item.article_time | timeFilter}}</i>&nbsp;
            <i class="iconfont icon-huo">&nbsp;{{item.num_views}}</i>&nbsp;
            <i class="iconfont icon-pinglun">&nbsp;{{item.article_messagecount}}</i>&nbsp;
            <i class="iconfont icon-good like" :class="{likeStyle:liked(item.article_id)}" @click="likeArticle(item.article_id)">&nbsp;{{item.num_likes}}</i>
          </div>
          <div class="enter_detail" @click="toDetail(item.article_id)">阅读详情</div>
        </footer>
      </div>
    </div>
    <div class="page">
      <el-pagination small :page-size="page.pageSize" :current-page.sync="page.pageNo" @current-change="pageChange" layout="prev, pager, next" :total="articleCounts"></el-pagination>
    </div>
  </div>
</div>
</template>

<script>
import Page from "./Page";
import { Message } from 'element-ui';
import { articleLike } from '../../../network/userOperation';
import uploadImage from "../../../network/uploadImage";
import { getArticlePage, getLabelPage, getCategoryPage, getKeyWordPage } from '../../../network/getContent';

export default {
  name: "ArticleList",
  components: {
    Page
  },
  data() {
    return {
      articleLists: [],
      articleCounts: 0,
      page: {
        pageNo:1,
        pageSize:5,
      },
    };
  },
  computed:{
    currentLabelId: {
      get (){
        return this.$store.state.labelId;
      },
      set(value) {
        this.$store.state.labelId = value;
      }
    },
    currentCategoryId: {
      get (){
        return this.$store.state.categoryId;
      },
      set(value) {
        this.$store.state.categoryId = value;
      }
    },
    currentKeyWord: {
      get (){
        return this.$store.state.keyWord;
      },
      set(value) {
        this.$store.state.keyWord = value;
      }
    },
    liked() {
      return function(id) {
        return localStorage.getItem(`like${id}`)
      }
    },
  },
  filters:{
    timeFilter(V) {
      return V.toString().slice(0,10)
    }
  },
  methods: {
    toDetail(path) {
      this.$store.state.detailId = path;
      this.$router.push("/detail/" + path);
    },
    pageChange() {
      // console.log(this.page)
      getArticlePage(this.page).then(res => {
        // console.log(res)
        if(res.data.err == 0) {
          let data = res.data.data;
          data.forEach(item => {
            item.article_image = uploadImage.UPLOADIMG.BASEURL + item.article_image;
          });
          this.articleLists = data;
        }
      })
    },
    likeArticle(articleId) {
        if(localStorage.getItem('username')) {
          if(localStorage.getItem(`like${articleId}`)) {
          Message({
            showClose: true,
            message: '你已经为这篇文章点过赞了噢~o(*￣▽￣*)o',
            type: 'warning',
            offset:'80'
          });
        } else {
          /* 发送请求 */
          articleLike(articleId).then(res => {
            if(res.data.err == 0){
              Message({
                showClose: true,
                message: res.data.msg,
                type: 'success',
                offset:'80'
              });
              localStorage.setItem(`like${articleId}`,articleId);
              // location.reload();
              this.articleLists.forEach(item => {
                if(item.article_id == articleId){
                  item.num_likes += 1;
                }
              })
            }else {
              Message({
                showClose: true,
                message: res.data.msg,
                type: 'error',
                offset:'80'
              });
              // alert(res.data.msg)
            }
          })
        }
        } else {
          //  this.$Message.error("请先去登陆再来点赞噢小主！(ノへ￣、)")
           Message({
                showClose: true,
                message: "请先去登陆再来点赞噢小主！(ノへ￣、)",
                type: 'error',
                offset:'80'
            });
        }
      },
  },
  watch: {
    currentLabelId(value) {
      getLabelPage(this.page,value).then(res => {
        this.articleCounts = res.data.count;
        if(res.data.err == 0) {
          let data = res.data.data;
          data.forEach(item => {
            item.article_image = uploadImage.UPLOADIMG.BASEURL + item.article_image;
          });
          this.articleLists = data;
        }else {
          console.log(res.data.msg)
        }
      })
    },
    currentCategoryId(value) {
      getCategoryPage(this.page,value).then(res => {
        this.articleCounts = res.data.count;
        if(res.data.err == 0) {
          let data = res.data.data;
          data.forEach(item => {
            item.article_image = uploadImage.UPLOADIMG.BASEURL + item.article_image;
          });
          this.articleLists = data;
        }else {
          console.log(res.data.msg)
        }
      })
    },
    currentKeyWord(value) {
      getKeyWordPage(this.page,value).then(res => {
        this.articleCounts = res.data.count;
        if(res.data.err == 0) {
          let data = res.data.data;
          data.forEach(item => {
            item.article_image = uploadImage.UPLOADIMG.BASEURL + item.article_image;
          });
          this.articleLists = data;
        }else {
          console.log(res.data.msg)
        }
      })
    },
  },
  created() {
    getArticlePage(this.page).then(res => {
       this.articleCounts = res.data.count;
      if(res.data.err == 0) {
        let data = res.data.data;
        data.forEach(item => {
          item.article_image = uploadImage.UPLOADIMG.BASEURL + item.article_image;
        });
        this.articleLists = data;
      }else {
        console.log(res.data.msg)
      }
    })
  }
};
</script>

<style>
.article_list {
    max-width: 900px;
    padding-left: 0;
    background: #fff;
    border-radius: 5px;
    padding: 0 15px;
  }

  .article_p{
    height: 60px;
    line-height: 60px;
    border-bottom: .5px solid rgba(100, 100, 100, .3);
  }

.article_p img {
  height: 50%;
}

.article_item {
  width: 100%;
  background-color: white;
  border-radius: 5px;
  padding: 15px 0;
  margin-top: 10px;
}
/*篇幅   存放一整篇文章的所有元素   每一篇文章是一个篇幅*/
.article_item,
header,
section,
footer,
.content,
.space {
  overflow: auto;
}
.space {
  /* margin-top: 10px; */
  border-bottom: 0.5px solid rgba(100, 100, 100, 0.3);
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.space:hover {
  border-bottom: 0.5px solid #9466ff;
}

.space:hover .art_img>img{
  transform: scale(.95);
  transition: 0.8s;
}
/*文章图片  存放在篇幅左侧*/
.art_img {
  max-width: 251px;
  float: left;
}
.art_img > img {
  width: 100%;
  height: 100%; 
  border-radius: 5px;
}

/*文章主体  存放在篇幅右侧*/
.content {
  padding-left: 10px;
}
/*文章头部   存放类型与文章标题 */
.content > header {
  margin-bottom: 10px;
}
/*文章类型图标  用span元素 内可写入类型名称*/
.article_title,.article_category {
  color: white;
  font-size: 10px;
  background-color: #67C23A;
  position: relative;
  padding: 5px 10px 4px 10px;
  border-radius: 3px;
  top: -3px;
}
.article_category {
  background-color: #409EFF;
  margin-right: .2rem;
}
/*类型图标伪元素  用于制作图标尖口*/
.article_title:after {
  content: "";
  width: 7px;
  height: 7px;
  top: 6px;
  right: -2px;
  background-color: #67C23A;
  transform: rotate(45deg);
  position: absolute;
}
/*文章标题*/
header a {
  margin-left: 20px;
  font-size: 17.5px;
  color: #2b2b2b;
}
/*文章内容*/
.summary {
  font-size: 13.5px;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  /* text-indent: 2em; */
  -webkit-box-orient: vertical;
  line-height: 1.8;
  -moz-box-flex: 1;
  -webkit-box-flex: 1;
  overflow: hidden;
}
/*文章尾部*/
footer {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.feed_back i {
  color: gold;
  font-size: 12px;
}

.like:hover{
  cursor: pointer;
  color: #67C23A;
}
.enter_detail {
  background: #9466ff;
  color: #fff;
  font-size: 12px;
  /* padding: 6px 10px; */
  height: 1.6rem;
  width: 4rem;
  text-align: center;
  line-height: 1.6rem;
	border-radius: 5px;
	cursor: pointer;
}

.page {
  text-align: center;
  padding: 20px 0;
}
.page_item {
  padding: 5px 10px;
  margin-left: 5px;
  border: 1px solid #ccc;
}

@media screen and (max-width: 610px) {
  .art_img {
    float: none;
    max-width: 100%;
    display: flex;
    justify-content: center;
  }
  .content > header {
    margin-top: 10px;
  }
}
@media screen and (min-width: 610px) {
  .art_img {
    padding-right: 10px;
  }
}
</style>