<template>
    <div class="player-controls"> 
        <div class="info" @click="$emit('click')">
            <div class="title">
                <span>{{$store.state.video.title}}</span>
            </div>
            <div class="author">
                <span>{{$store.state.video.author}}</span>
            </div>
        </div>
        <div class="controller">
            <vs-button dark class="stop-play-btn" @click="toggleRequest">
                <i class="bx bx-play" v-if="$store.state.video.status==2 || $store.state.video.status==-1"></i>
                <i class="bx bx-pause" v-if="$store.state.video.status==1"></i>
                <i class="bx bx-reset" v-if="$store.state.video.status==0"></i>
            </vs-button>
            
            <vs-button dark class="restart-btn" @click="restartRequest">
                <i class="bx bx-reset"></i>
            </vs-button>
        </div>
    </div>
</template>

<script>
import * as utils from "../../utils/index";

export default {
    name: "player-controls",
    methods: {
        toggleRequest() { 
            let time = utils.getCurrentTime(this.$store.state.video);
            console.log(time);

            if(this.$store.state.video.status == 1) { 
                this.$store.commit('STOP_VIDEO', time);
            }
            else if(this.$store.state.video.status != 1) { 
                this.$store.commit('PLAY_VIDEO', time);
            }
        },
        restartRequest() { 
            this.$store.commit('STOP_VIDEO', 0);
            this.$store.commit('PLAY_VIDEO', 0);
        }
    }
}
</script>

<style lang="scss">
@import "../../scss/_variable.scss";
.player-controls {
    display: flex;
    $controller-width:  $player-height *0.7 +  $player-height *0.5 + 40px;
    height: $player-height;
    width: 100%; 
    text-align: right;
    box-shadow: 0px 10px 20px -20px rgba(var(--vs-dark), 1);
    

    .info { 
        display: inline-grid; 
        height: $player-height; 
        width: calc( 100vw - #{$controller-width} );  
        text-align: left;
        transition-duration: 0.2s;
        cursor: pointer;
    
        &:active {
            // filter: brightness(80%);
        }

        div {
            padding-left: 10px;
        }
        .title {
            display: flex;
            align-items: center;
            width: calc( 100vw - #{$controller-width} - 50px );
            font-weight: bold;
            span {  
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
        .author {
            font-size: 0.8em;
            // color: gray;
            font-weight: 100;
        }
    }

    .controller {
        
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width:  $controller-width;
        height: $player-height; 
        .stop-play-btn {
            height: 0.7*$player-height;
            width: 0.7*$player-height;
            font-size: 2.3em;
            margin-top: 5px;
            margin-left: 0.15*$player-height;
        }

        .restart-btn {
            height: 0.5*$player-height;
            width: 0.5*$player-height;
            font-size: 1.2em;
        }
    }
}
</style>