<template>
  <div class="search-video">  
    <h2>Search Song:</h2>

    <form class="search-container" @submit="search">
        
        <vs-input ref="search" type="search" v-model="q" placeholder="Song Title">
            <template #icon>
            <i class='bx bx-search-alt-2'></i>
            </template>
        </vs-input>
        <br>
        <vs-button dark> Search </vs-button>
        
    </form>
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
import searchResult from './search/SearchResult.vue';

export default {
    name: 'search-page',
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
            origin: location.origin,
            enablejsapi:1
        },
        loading_results: 0,
        loading: null
    }),
    watch: {
        q() {
            console.log("emitting q")
            this.$emit('q', this.q);
        },
        newq() { 
            console.log("newq")
            this.loading_results++; 
            this.search_from_django();
            // this.$refs.youtube.player.loadPlaylist({
            //     list:this.newq,
            //     listType:'search',
            //     autoplay: false, 
            // });  
        },
        loading_results(newVal, oldVal) {
            console.log("loading_results")
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
        search(ev) { 
            console.log("search")
            ev.preventDefault();

            if(this.q) {
                this.newq = this.q; 
            }
        }, 
        async search_from_django() {
            const API_SOURCE = 'https://domenicopopolizio.pythonanywhere.com/search-music';
            let res = await fetch(API_SOURCE+'?q='+encodeURIComponent(this.newq));
            let videos = await res.json();
            this.results = videos.videos; 
            this.loading_results--; 
        }, 
        selectVideo(video) {
            console.log("select video")
            console.log(video);
            this.$store.commit('SET_VIDEO', video); 
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