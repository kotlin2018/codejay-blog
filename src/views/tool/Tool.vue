<template>
  <div class="tool">
    <div class="tool_box">
      <ul class="polaroids">
			<li v-for="item in tool">
        <a :href="item.tool_path" target="_blank" :title="item.tool_name">
          <img :src="item.tool_image" :alt="item.tool_name">
          <p class="tool_conduct">{{item.tool_brief}}</p>
        </a>
      </li>
      </ul>
    </div>
  </div>
  
</template>

<script>
import {getTool} from 'network/getContent';
import uploadImage from 'network/uploadImage';
export default {
  name: 'Tool',
  data() {
    return {
      tool:[]
    }
  },
  created() {
    getTool().then(res => {
      if(res.data.err == 0){
        res.data.data.forEach(item => {
          item.tool_image = uploadImage.UPLOADIMG.BASEURL + item.tool_image;
        });
        this.tool = res.data.data;
      }else {
        this.$message({
          type:'error',
          offset:'80',
          message:res.data.msg
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>
  @import "../../assets/css/picture.css";
  .tool_box {
    margin-top: 80px;
  }
  
</style>