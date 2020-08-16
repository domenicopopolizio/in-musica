<template>
  <div class="player" @click="prompt=true"> 
        <youtube class="youtube-player" ref="videoPlayer" :player-vars="playerVars"></youtube>
        <vs-dialog class="dialog" width="550px" not-center v-model="prompt">
            <template #header>
            <h4 class="not-margin">
                Go To <b>Youtube</b>
            </h4>
            </template>


            <div class="con-content">
            <p>
                You will be redirect to the current youtube's video
            </p>
            </div>

            <template #footer>
            <div class="con-footer">
                <vs-button @click="redirectYoutube" transparent danger>
                Go To Youtube
                </vs-button>
                <vs-button @click="prompt=false" dark transparent>
                Cancel
                </vs-button>
            </div>
            </template>
        </vs-dialog>
  </div>
</template>

<script>
import * as utils from "../../utils/index";

export default {
    name: 'player',
    data:()=>({
        prompt: false,
        playerVars: { 
            controls: 0, 
            color: "white",
            showinfo: 0,
            disablekb: 1,
            fs: 0,
            playsinline: 0, 
            rel: 0,
        },
    }),
    computed: {
        video(){
            return this.$store.state.video;
        },
    },
    watch: {
        video: {
            deep: true, 
            handler(newVideo, currentVideo) {
                // debugger;
                let player = this.$refs.videoPlayer.player; 
                
                if(currentVideo.id != newVideo.id) {  
                    player.cueVideoById(newVideo.id, utils.getCurrentTime(newVideo)).then(function(){
                        if(newVideo.status == 1 ) {
                            player.playVideo();
                            console.log('play');
                        } 
                        if(newVideo.status == 2 ) {
                            player.pauseVideo(); 
                            console.log('stop');
                        } 
                    });  
                    // player.playVideoAt(utils.getCurrentTime(newVideo));
                }  
                else { 
                    if(newVideo.status == 1 ) {
                        player.playVideo();
                        console.log('play');
                    }
                    if(newVideo.status == 2) {
                        player.pauseVideo(); 
                        console.log('stop');
                        player.seekTo(utils.getCurrentTime(newVideo));
                    }
                    
                    if(utils.getCurrentTime(currentVideo) != utils.getCurrentTime(newVideo)) {
                        player.seekTo(utils.getCurrentTime(newVideo));
                    }
                }
            }
        }
    },
    methods: {
        async redirectYoutube() {
            this.prompt = false;
            open(await this.$refs.videoPlayer.player.getVideoUrl(), "blank");
        }
    },
    mounted() { 
        this.$refs.videoPlayer.player.setVolume(100);
    },
}
</script>

<style lang="scss">
.player {
    cursor: pointer;
    
    // padding: 20px;
    // text-align: center;
    
    .youtube-player { 
        pointer-events: none; 
        // height: 100%;
        // width: auto;
        width: 100%;
        height: 100%;
    }
 
    
}



// dialog
    .con-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .not-margin {
        margin: 0px;
        font-weight: normal;
        padding: 10px;
        padding-bottom: 0px;

        b {
            color: rgb(var(--vs-danger));
        }
    }

    .con-content {
        width: 100%;
        
        p {
            font-size: 0.8rem;
            padding: 0px 10px;
        }

        .vs-checkbox-label {
            font-size: 0.8rem;
        }

        .vs-input-parent {
            width: 100%;
        }

        .vs-input-content {
            margin: 10px 0px;
            width: calc(100%);

            
            .vs-input {
                width: 100%;
            }
        }

    } 


</style>