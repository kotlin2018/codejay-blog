<template>
  <div class="article">
    <div class="article_box">
    <article-list class="article_list"/>
    <side class="side-comp"/>
    </div>
  </div>
</template>

<script>
import ArticleList from './childComps/ArticleList'
import Side from './childComps/Side';

export default {
  name: 'Article',
  components: {
    ArticleList,
    Side
  },
}
</script>

<style>
  .article {
    max-width: 1200px;
  }
  .article_box {
    padding-top: 80px;
    padding-bottom: 20px;
    display: flex;
  }
  .article_list {
    width: 75%;
  }
  @media screen and (max-width:930px) {
    .side-comp {
      display: none;
    }
    .article_list {
      width: 100%;
    }
  }
</style>