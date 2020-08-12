<!-- Logo -->
<template>
  <div id="logo">
    <img src="../../assets/img/header/logo.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'Logo',
}

</script>

<style scoped>
  #logo {
    width: 100%;
    height: 100%;
    
    margin: auto;
    line-height: 60px;
  }

  #logo img {
    height: 50px;
    margin-top: 5px;
  }
  @media screen and (max-width:930px) {
    #logo img {
      padding-left: 1rem;
    }
  }
</style>