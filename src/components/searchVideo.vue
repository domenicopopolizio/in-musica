<template>
  <div class="search-video">
    <youtube ref="youtube" class="yt" :player-vars="playerVars" height="0" width="0" @cued="cued"></youtube> 
        
        
    <h2>Search Song:</h2>

    <div class="search-container">
        
        <vs-input ref="search" type="search" v-model="q" placeholder="Song Title" @change="search">
            <template #icon>
            <i class='bx bx-search-alt-2'></i>
            </template>
        </vs-input>
        <br>
        <vs-button dark @click="search"> Search </vs-button>
        
    </div>
    <div class="results"> 
        <search-result v-for="result in results" :key="result.id" 
            :video="result"
            @click="selectVideo(result)"
        ></search-result>
    </div>
    
    <!-- <vs-button class="music-player-btn" transparent dark @click="toMusicPlayer">Go to the Music Player</vs-button> -->
  </div>
</template>

<script> 
import searchResult from './searchResult.vue';

export default {
    name: 'search-video',
    components: {
        searchResult
    }, 
    data:()=>({
        results: [],
        api: null,
        q: '',
        newq: '',
        playerVars: {
            autoplay: 0,
            controls: 0, 
        },
        loading_results: 0,
        loading: null
    }),
    watch: {
        q() {
            this.$emit('q', this.q);
        },
        newq() {
            this.$refs.youtube.player.cuePlaylist({
                list:this.newq,
                listType:'search',
                autoplay: false
            }); 
        },
        loading_results(newVal, oldVal) {
            if(oldVal <= 0 && newVal > 0)  {
                this.loading = this.$vs.loading({
                    type: 'scale',
                    color: '#000000'
                });
            }        
            if(oldVal > 0 && newVal <= 0) {
                this.loading.close();
            }
        }
    },
    methods: {
        search() { 
            if(this.q) {
                this.loading_results++; 
                this.newq = this.q; 
            }
        }, 
        async cued() {
            try {
                let ids = await this.$refs.youtube.player.getPlaylist(); 
                this.results = await this.getVideos(ids.slice(0, 4));
                this.loading_results--; 
            } catch(e) {
                this.loading_results--;
            }
        },
        getVideos(ids) {
            return new Promise(async (resolve, reject) => {
                let results = [];
                for(let id of ids) {
                    axios.get(`https://noembed.com/embed?url=https://youtube.com/watch?v=${id}&format=json`)
                    .then(data=>{
                        results.push(data.data);
                        if(results.length == ids.length) resolve(results);
                    })
                    .catch(r=>{
                        results.push({})
                        if(results.length == ids.length) resolve(results);
                    })
                }
            })
        },
        selectVideo(video) {
            this.$emit('selected', video.id); 
        }, 
    },
    async mounted() { 
        

    }
}
</script>

<style lang="scss">
.search-video {
    text-align: center;
    max-height: 100vh;
    padding: 30px;
    
    h2 {
        margin: 0;
    }

    .search-container {

        display: inline-block;
        margin: auto;
        margin-top: 20px;
        width: 100%;
        max-width: 300px;
        
        .vs-input {
            font-size: 1.2em;
            width: 100%;
        }
    }

    .results {
        text-align: center;
        width: 100%;
        height: fit-content;
        margin-top: 50px;
    }

    .yt {
        display: none;
    }
    
    .music-player-btn {
        margin-top: 30px;
        margin-bottom: 30px;
    }
}
</style>