<template>
  <div class="player"> 
      <youtube ref="videoPlayer"></youtube>
  </div>
</template>

<script>
import * as utils from "../../utils/index";

export default {
    name: 'player',
    data:()=>({
        currentId: null,
        currentStatus: null,
        currentUpdatedAt: null,
        currentTime: null,
    }),
    mounted() {
        this.$store.commit('SET_PLAYER', this.$refs.videoPlayer);
    },
    computed: {
        video(){
            return this.$store.state.video;
        }, 
    },
    watch: {
        async video() {
            let state = this.$store.state;
            let localVideo = state.localVideo;
            let video = state.video;

            if(localVideo.status != video.status) {
                localVideo.status = video.status;
                if(localVideo.status == 1) {
                    this.$refs.videoPlayer.player.playVideo();
                }
                if(localVideo.status == 2) {
                    this.$refs.videoPlayer.player.pauseVideo();
                }
            } 
            if(localVideo.id != video.id) {
                console.log(localVideo.id, video.id);
                localVideo.id = video.id;
                this.$refs.videoPlayer.player.loadVideoById(localVideo.id);
            } 
        }
    }
}
</script>

<style lang="scss">

</style>