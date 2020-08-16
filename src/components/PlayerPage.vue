<template>
  <div class="video-page">
    <player-controls @click="$emit('toggle')"></player-controls>
    <player></player>
  </div>
</template>

<script>
import PlayerControls from './player/PlayerControls';
import Player from './player/Player';

export default {
  name: 'player-page',
  components: {
    PlayerControls,
    Player
  },
  mounted() {
    this.$store.commit('SET_PLAYER', this.$refs.videoPlayer);
  }
}
</script>

<style lang="scss">
@import "../scss/_variable.scss";

.video-page {
  height: 100vh;
  width: 100%;

  .player {
    height: 200px;
  }
}
</style>