<template>
<div class="about">
  <div class="profile">
    <div id="background" class="wall"></div>
    <div id="midground" class="wall"></div>
    <div id="foreground" class="wall"></div>
    <div id="top" class="wall"></div>
    <div class="about_content">
      <img src="../../assets/img/avatar.jpg" alt="">
      <div>codejay</div>
      <div class="word">
        <p>{{notice}}</p>
      </div>
    </div>
  </div>
</div>  
</template>

<script>
import { getNotice } from 'network/getContent';
export default {
  name: 'About',
  data(){
    return {
      notice:'',
    }
  },
  created() {
    getNotice().then(res => {
      if(res.data.err == 0) {
        this.notice = res.data.data.content;
      }else {
        this.$message({
          type: 'error',
          offset: '80',
          message:res.data.msg
        })
      }
    })
  }
}
</script>

<style scoped>
@import "../login/childComps/profile.css";
 .about {
    max-width: 1200px;
    padding-top: 80px;
    padding-bottom: 20px;
    
  }

.about_content {
  width: 60%;
  margin-left: 20%;
  z-index: 2;
  opacity: 1;
}

.word {
  margin-top: 2rem;
}
.word p {
  line-height: 3rem;
}
@media screen and (max-width: 900px) {
  .about_content {
    width: 80%;
  }
}
@media screen and (max-width: 600px) {
  .about_content {
    width: 100%;
    margin-left: 0;
  }
  .word {
    font-size: 1.4rem;
  }
}
</style>