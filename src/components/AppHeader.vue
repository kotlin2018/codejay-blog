<!-- AppHeader -->
<template>
  <div class="app-header">
    <div class="header">
      <div class="left"><logo class="left"/></div>
      <div class="center"><nav-bar/></div>
      <div class="right"><search class="right"/></div>
    </div>
    
  </div>
</template>

<script>
import Logo from './header/Logo';
import NavBar from './header/NavBar';
import Search from './header/Search';

export default {
  name: 'AppHeader',
  components: {
    Logo,
    NavBar,
    Search,
  }
}

</script>

<style scoped>
  
  .app-header {
    width: 100%;
    height: 4rem;

    background: #fff;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    position: fixed;
    /* justify-content: center; */
    top: 0;

    z-index: 9999;
  }

  .header{
    max-width: 80rem;
    line-height: 60px;

    display: flex;
    
    margin:0 auto;
    text-align: center;
  }

  .left {
    width: 9rem;
  }

  .center {
    width: 52.5rem;
  }

  .right {
    flex: 1;
  }

  @media screen and (max-width:930px) {
    .center {
      max-width: 52.5rem;
    }
  }
</style>