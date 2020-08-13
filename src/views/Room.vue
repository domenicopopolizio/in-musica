<template>
  <div class="room"> 
    <!-- <vs-button dark to='/' class="logout"> <i class='bx bxs-door-open'></i> Logout</vs-button> -->
    <div class="search-page">  <router-link to="/">
      <img src='../assets/logo.png' class='logo' :class="{small}"></router-link>
      <search-video ref="search"></search-video>  
    </div>
    <div class="video-zone" :class="{open:videoPage}">
      <video-page @toggle="videoPage=!videoPage"></video-page>
    </div>
  </div>
</template>

<script> 
import searchVideo from '../components/searchVideo';
import videoPage from '../components/VideoPage';

export default {
  name: 'Room', 
  components: {
    searchVideo,
    videoPage
  },
  data:()=>({
    small: true,
    videoPage: false,
  }),
  computed: { 
  },
  methods: { 
  }
}
</script>

<style lang="scss"> 
.room {
  position: relative;
  overflow: hidden;
  height: 100vh;

  .logout {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .vs-button {
      display: inline-block;
  }
 
  i {
    margin-right: 5px;
  }

  .search-page {
    --mini-video-player-height: 150px;

    position: relative;
    width: 100%;
    height: calc( 100vh - var(--mini-video-player-height) );
    overflow: auto;
    overflow-x: hidden;
    
    text-align: center;
    padding-top: 60px; 

    .logo { 
      width: 150px;
      &.small { 
        width: 60px;
        position: absolute;
        top: 10px;
        right: 10px;
        transition-duration: .2s;
      } 
      height: auto;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.432);
      border-radius: 100%;
      transition-duration: .2s;
    }

    .search-video {
      margin-top: 5px;
      width: calc(100vw - 60px);
    }
  }

  .video-zone {
    position: absolute;
    z-index: 1;
    bottom: 0;
    height: 100px;
    width: 100%;
    overflow: hidden;
    overflow-x: hidden;
    
    text-align: center; 

    background-color: white;
    
    box-shadow: 0px -10px 20px -20px rgba(var(--vs-dark), 1);

    transition-duration: .2s;

    &.open {
      height: 100vh;
      overflow: auto;
    }
  }
}

</style>
