<template>
  <div class="article_management">
    <h1>文章管理</h1>
    <h3>文章表</h3>
    <el-table :data="tableData" v-loading="loading" style="width: 100%; ">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column label="文章标题" width="230">
        <template slot-scope="scope">
          <span style="-webkit-line-clamp: 2;display: -webkit-box;word-break: break-all;-webkit-box-orient: vertical;line-height: 1.8;">{{ scope.row.article_title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章配图" width="100" >
        <template slot-scope="scope">
          <div class="article_img">
            <img :src="scope.row.article_image" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文章简介">
        <template slot-scope="scope">
          <span style="-webkit-line-clamp: 2;display: -webkit-box;word-break: break-all;-webkit-box-orient: vertical;line-height: 1.8;">{{ scope.row.article_synopsis }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章评论" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 0px">评论数：{{ scope.row.article_messagecount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"width="230">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="900"
            trigger="click">
              <articlePublish :list="list">
                <div class="article_img">
                  <img :src="scope.row.article_image" alt="">
                </div>
              </articlePublish>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" slot="reference">编辑</el-button>
          </el-popover>
          <el-button class="article_del" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getArticle, deleteArticle } from '../../../network/adminOperation';
import uploadImage from "../../../network/uploadImage";
import articlePublish from './articlePublish';

export default {
  name: 'articleManagement',
  components: {
    articlePublish,
  },
  data() {
    return {
      tableData:[],
      list:{},
      loading: true,
      
    }
  },
  methods: {
    handleEdit(index, row) {
      this.list = row;
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const imgsrcs = row.article_image.split('/');
        const imgsrc = imgsrcs[imgsrcs.length - 1];
        deleteArticle(row.article_id,imgsrc).then(res => {
          if(res.data.err == 0){
            this.$message({
              type: 'success',
              message: res.data.msg
            });
          }else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      })
    },
    
  },
  mounted() {
    getArticle().then(res => {
      // 获取文章
      if(res.data.err == 0){
        let data = res.data.data;
        data.forEach((item,index) => {
          item.article_image = uploadImage.UPLOADIMG.BASEURL + item.article_image;
          this.$set(this.tableData, index, item)
          console.log(this.tableData)
        });
        this.loading = false;
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
    })
  }
}
</script>

<style>
  .article_management {
    padding: 1rem 1.5rem 1.5rem 1rem;
  }
  .article_management h3 {
    margin: 1.5rem 0 0.5rem 0;
  }
  .el-table {
    border-radius: 10px;
  }
  .article_img {
    height: 2rem;
  }
  .article_img img {
    height: 100%;
    z-index: 999;
  }
  .el-popover {
    height: 100vh;
    margin-top: -.7rem;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .article_del {
    margin-left: 1rem;
  }
</style>