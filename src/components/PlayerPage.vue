<template>
  <div class="video-page">
    <player-controls @click="$emit('toggle')"></player-controls>
    <div class="container">
      <player></player>
      <chat></chat>
    </div>
  </div>
</template>

<script>
import PlayerControls from './player/PlayerControls';
import Player from './player/Player';
import Chat from './player/Chat';

export default {
  name: 'player-page',
  components: {
    PlayerControls,
    Player,
    Chat
  },
  mounted() {
    // this.$store.commit('SET_PLAYER', this.$refs.videoPlayer);
  }
}
</script>

<style lang="scss">
@import "../scss/_variable.scss";

.video-page {
  height: 100vh;
  width: 100%;
  display: block;

  .container {
    display: grid;
    height: calc(100vh -  75px);
    grid-template-rows: minmax(5%, 200px) auto;
    .player {
      // height: 200px;
      // max-height: 40%;
    }
    .chat { 
      height: 100%;
      overflow: hidden;
      // height: calc(100vh -  200px - #{$player-height});
      // min-height: calc(100vh -  200px - 40%);
    }
  }

  
}
</style>