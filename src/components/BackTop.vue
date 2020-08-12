<!-- BackTop -->
<template>
  <div class="back-top" ref="btbtn" @click="backTopClick" :v-show="isShowBackTop">
    <i class="iconfont icon-icon-test"></i>
  </div>
</template>

<script>
import {debounce} from '../utils/utils';

export default {
  name: 'BackTop',
  data() {
    return {
      itemImgListener: null,
      newRefresh: null,
      isShowBackTop: false
    }
  },
 
  methods: {
    backTopClick() {
      this.$refs.btbtn.scroll.scrollTo(0,0,300);
    },
    listenShowBackTop(position) {
      // 判断backTop是否显示
      this.isShowBackTop = position.y < -350;
    }
  }
}

</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 2rem;
    bottom: 3rem;
  }
  .back-top i {
    font-size: 2rem;
    color: #6644ff;
  }
</style>