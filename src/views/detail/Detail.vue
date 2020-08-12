<template>
  <div class="detail">
    <el-page-header @back="goBack" content></el-page-header>
    <div class="detail_header">
      <p class="art_title">{{articleDetail.article_title}}</p>
      <ul class="art_about">
        <li>
          <i class="iconfont icon-wode">&nbsp;{{author}}</i>&nbsp;&nbsp;
        </li>
        <li>
          <i class="iconfont icon-rili">&nbsp;{{articleDetail.article_time}}</i>&nbsp;&nbsp;
        </li>
        <li>
          <i class="iconfont icon-huo">&nbsp;{{articleDetail.num_views}}</i>&nbsp;&nbsp;
        </li>
        <li>
          <i class="iconfont icon-pinglun">&nbsp;{{messageCount}}</i>&nbsp;&nbsp;
        </li>
        <li>
          <i class="iconfont icon-good">&nbsp;{{articleDetail.num_likes}}</i>
        </li>
      </ul>
    </div>
    <div class="tag_box">
      <el-tag type="success" size="small">{{articleDetail.article_category_name}}</el-tag>
      <el-tag type="danger" size="small">{{articleDetail.article_label_name}}</el-tag>
    </div>
    <div class="image">
      <img src="../../assets/img/hose.png" alt="">
    </div>
    <div class="markdown-body">
      <div class="article_message hljs renderNav" v-html="articleDetail.article_content"></div>
    </div>
    <replay-or-publish :articleId="id" @data="getMessageCount($event)"/>
  </div>
</template>

<script>
import ReplayOrPublish from "../../components/common/replayOrpublish/ReplayOrPublish";
import { getArticleDetail, getMessageAndReply } from '../../network/getContent';
import hljs from "highlight.js";
import marked from "marked";
import "highlight.js/styles/monokai-sublime.css";

export default {
  name: "Detail",
  components: {
    ReplayOrPublish,
  },
  data() {
    return {
      id: null,
      author:'codejay',
      articleDetail: {},
      imgurl:'../../assets/img/hose.png',
      messageCount:0
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getMessageCount(data) {
      this.messageCount = data;
    }
  },
  mounted(){
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
  },
  created() {
    this.id = this.$route.params.id
    getArticleDetail(this.id).then(res => {
      if(res.data.err == 0){
        let data = res.data.data[0];
        data.article_content = marked(data.article_content);
        this.articleDetail = data;
      }
    })
  },
};
</script>

<style>
@import"../../assets/css/detail.css";

.detail {
  padding: 20px 0;
  background: #fff;
}
.el-page-header {
  line-height: 30px;
  padding-left: 1.2%;
}
.detail_header {
  text-align: center;
}
.art_title {
  font-size: 24px;
  padding: 20px 20px;
}
.art_about {
  color: rgba(100, 100, 100, 0.7);
  list-style: none;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}
.art_about .iconfont {
  font-size: 13px;
}
.tag_box {
  display: flex;
  justify-content: center;
}
.tag_box > .el-tag {
  margin: 0 3px;
}

.image {
  height: 10rem;
  display: flex;
  margin-top: 2rem;
  justify-content: center;
}

.image img {
  height: 100%;
}
.article_message {
  border-left: 1.5px dotted #2980b9;
  border-top: 1.5px dotted #633bd3;
  border-right: 1.5px dotted #192f44;
  border-bottom: 1.5px dotted #27ae60;
  width:97%;
  background: #fff;
  line-height: 1.7rem;
  padding: 1rem;
  margin: 3rem auto;
  border-radius: 5px;
}
@media screen and (max-width: 610px) {
  .article_message {
    width: 100%;
  }
}
</style>