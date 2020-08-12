<!-- AppFooter -->
<template>
  <div class="footer">
    <section>
      {{friendShipLinks}}<br/><br/>
      &copy;{{record}}
    </section>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      friendShipLinks:'友情链接: 轩陌博客  吴佳博客',
      record:'Coderjay Blog All Rights Reserved 2020-2022 豫ICP 备1117070138号'
    }
  }
}

</script>

<style scoped> 
  .footer {
    height: 100px;
    width: 100%;
    
    background: #2d3237;
    color: rgba(255, 255, 255, 0.5);
    position: relative;

    
    bottom: 0;
  }

  .footer section {
    max-width: 1200px;
    height: 100%;

    margin: auto;
    padding:15px 10px;

    font-size: 14px;
  }

</style>