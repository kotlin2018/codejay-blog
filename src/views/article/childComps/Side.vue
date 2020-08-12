<template>
  <div class="side">
    <side-item class="side_item" :side-item="side[0]">
      <p class="notice">{{side[0].content}}</p>
    </side-item>
    <side-item class="side_item" :side-item="category">
      <ul class="tag_cloud">
        <li class="tag_item" @click="categoryClick(item.article_category_id)" v-for="item in category.content">{{item.article_category_name}}</li>
      </ul>
    </side-item>
    <side-item class="side_item" :side-item="label">
      <ul class="tag_cloud">
        <li class="tag_item" @click="labelClick(item.article_label_id)" v-for="item in label.content">{{item.article_label_name}}</li>
      </ul>
    </side-item>
    <side-item class="side_item" :side-item="newMessage">
      <div class="comment" v-for="value in newMessage.content">
        <div class="comment_img">
          <img :src="value.head_image" alt="">
        </div>
        <div class="comment_content">
          <p class="commenter">{{value.username}}</p>
          <p class="comment_information">{{value.message_content}}</p>
          <p class="comment_url">评: {{value.article_title}}</p>
        </div>
      </div>
    </side-item>
    <side-item class="side_item" :side-item="siteStatistics">
      <ul class="site">
        <li class="site_item" v-for="item in siteStatistics.content">
          {{item.lable}}&nbsp;{{item.lableValue}}{{item.unit}}
        </li>
        <!-- <li class="site_item">
          标签&nbsp;{{siteStatistics.content.label}}个
        </li>
        <li class="site_item">
          标签&nbsp;{{siteStatistics.content.label}}个
        </li> -->
      </ul>
    </side-item>
  </div>
</template>

<script>
import SideItem from './SideItem';
import {tagCloud} from '../../../utils/tagcloud';
import uploadImage from "../../../network/uploadImage";
import { getLabel, getCategory, getNewMessage, getSiteStatistics } from '../../../network/getContent';
export default {
  name: 'Side',
  data() {
    return{
      tagName: '',
      side:[
        {iconUrl:'&#xe626;',title:'公告',content:'第一版博客，技术上还有很多的不足，本站持续更新中，后续会推出更多功能，多谢各位小伙伴的支持'},
        
        {iconUrl:'&#xe649;',title:'站点统计',content:[
                                                      {lable:'标签:',lableValue:36,unit:'个'},
                                                      {lable:'文章:',lableValue:53,unit:'篇'},
                                                      {lable:'评论:',lableValue:528,unit:'条'},
                                                      {lable:'分类:',lableValue:17,unit:'个'},
                                                      {lable:'最后更新:',lableValue:'2020-6-16'}
                                                    ]},
      ],
      
      label:{iconUrl:'&#xe794;',title:'标签云',content:[]},
      category:{iconUrl:'&#xe629;',title:'分 类',content:[]},
      newMessage:{iconUrl:'&#xe6a0;',title:'最新评论',content:[]},
      siteStatistics:{iconUrl:'&#xe649;',title:'站点统计',content:[
                                                                   {lable:'标签:',lableValue:36,unit:'个'},
                                                                   {lable:'分类:',lableValue:17,unit:'个'},
                                                                   {lable:'文章:',lableValue:53,unit:'篇'},
                                                                   {lable:'评论:',lableValue:528,unit:'条'},
                                                                   {lable:'最后更新:',lableValue:'2020-6-16'}
                                                                  ]}
    }
  },
  components: {
    SideItem
  },
  methods: {
    labelClick(labelId) {
      this.$store.state.labelId = labelId;
    },
    categoryClick(categoryId) {
      this.$store.state.categoryId = categoryId;
    }
  },

  mounted() {
    
  },
  created() {
    /* 获取标签 */
    getLabel().then(res => {
      if(res.data.err == 0){
        let data = res.data.data;
        this.label.content = data
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
      return tagCloud;
    }).then(() => {
      tagCloud();
    });
    /* 获取分类 */
    getCategory().then(res => {
      if(res.data.err == 0){
        let data = res.data.data;
        this.category.content = data
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
    }).then(() => {
      tagCloud();
    });
    
    /* 获取最新评论 */
    getNewMessage().then(res => {
      if(res.data.err == 0){
        let data = res.data.data;
        data.forEach(item => {
          item.head_image = uploadImage.UPLOADIMG.BASEURL +"/"+ item.head_image;
        });
        this.newMessage.content = data;
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
    })

    /* 获取站点统计信息 */
    getSiteStatistics().then(res => {
      if(res.data.err == 0) {
        let data = res.data.data;
        let index = 0;
        Object.keys(data).forEach(item => {
          // console.log('item',data[item])
          this.siteStatistics.content[index].lableValue = data[item];
          index ++;
          if(index == item.length-1){
          console.log(this.siteStatistics.content)}
        })
      }
    })
  }
}
</script>

<style>
  .side {
    width: 280px;
    margin-left: 20px;
  }
  .side_item {
    margin-bottom: 20px;
  }
  .notice {
    line-height: 21px;
  }
  .comment{
    display: flex;
    padding: 5px 0;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .comment_img img{
    width: 50px;
    border-radius: 45px;
  }
  .comment_content {
    margin-left: 10px;
    overflow: hidden;
  }
  .commenter,.comment_url {
    height: 30px;
    line-height: 30px;
    color:#9466ff;
  }
  .commenter {
    font-size: 16px;
  }
  .comment_url {
    font-size: 13px;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    /* line-height: 1.8; */
  }
  .site {
    width: 100%;
    list-style:none;
    display: flex;
    flex-flow: wrap;
  }
  .site_item {
    width: 50%;
    padding: 8px 0;
  }
  .site_item:last-child{
    width: 100%;
  }
  
  .tag_cloud {
    list-style: none;
    display: flex;
    flex-flow: wrap;
    
    justify-content: flex-start;
  }

  .tag_item {
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .tag_item:hover {
    transform: rotate3d(10, 20, 0, 30deg);
    cursor: pointer;
    transition: .5s;
  }
  
</style>