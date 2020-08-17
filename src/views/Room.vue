<template>
  <div class="room"> 
    <!-- {{$store.state.video}} -->
    <!-- <vs-button dark to='/' class="logout"> <i class='bx bxs-door-open'></i> Logout</vs-button> -->
    <div class="search-page">  
      <router-link to="/">
        <img src='../assets/logo.png' class='logo' :class="{small}">
      </router-link>
      <vs-button class="add-person" success @click="invite"> <i class="material-icons">person_add</i> Invite</vs-button>
      
      <search-page ref="search"></search-page>  
    </div>
    <div class="video-zone" :class="{open:videoPage}">
      <player-page @toggle="videoPage=!videoPage"></player-page>
    </div>

    <vs-dialog class="dialog" width="550px" not-center v-model="prompt">
      <template #header>
        <h4 class="not-margin success">
          Invite link <b>Copied</b>
        </h4>
      </template>
      <div class="con-content">
        <p>
          The invite link has been copied!<br>
          Share it to listen the music with a friend!          
        </p>
      </div>
      <template #footer>
        <div class="con-footer">
          <vs-button @click="prompt=false" transparent success>
            Ok
          </vs-button> 
        </div>
      </template>
    </vs-dialog>
 
  </div>
</template>

<script> 
import SearchPage from '../components/SearchPage';
import PlayerPage from '../components/PlayerPage';

export default {
  name: 'Room', 
  components: {
    SearchPage,
    PlayerPage
  },
  data:()=>({
    small: true,
    videoPage: false,
    prompt: false
  }),
  computed: { 
    video() {
      return this.$store.state.video;
    }
  },
  watch: {
    video: {
      deep: true,
      handler(newVideo, oldVideo) {
        if(!oldVideo.id && newVideo.id) {
          this.videoPage = true;
        }
      }
    }
  },
  methods: {  
    invite() { 
      let share = navigator.share;
      if (share) {
        try {
          navigator.share({
            title:"In Musica",
            text:"Hey, let's listen some good music!",
            url:window.location
          });
        } catch (e) {
          share = false;
        }
      }
      if(!share) {
        let copyText = document.createElement('textarea');
        copyText.style.position = "fixed";
        copyText.textContent = window.location;
        document.body.appendChild(copyText);
        copyText.select();
        document.execCommand("copy");
        document.body.removeChild(copyText);
        this.prompt = true;
      }
    }
  },
  beforeMount() {
    this.$store.dispatch('accessRoom', this.$route.params.roomid);
  }
}
</script>

<style lang="scss"> 
@import "../scss/_variable.scss";

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
 
  // i {
  //   margin-right: 5px;
  // }

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

    .add-person {
      top: 10px;
      left: 10px;
    }

    .lock {
      top: 50px;
      left: 10px;
    }

    .add-person, .lock {
      position: absolute;
      // width: 60px;
      // height: 60px;
      // border-radius: 60px;

      i {
        font-size: 1.1em;
        margin-right:  5px;
      }
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
    height: $player-height;
    width: 100%;
    overflow: hidden;
    overflow-x: hidden;
    
    // text-align: center; 

    background-color: white;
    
    box-shadow: 0px -10px 20px -20px rgba(var(--vs-dark), 1);

    transition-duration: .5s;

    &.open {
      height: 100vh;
      overflow: auto;
    }
  }
}



</style>
