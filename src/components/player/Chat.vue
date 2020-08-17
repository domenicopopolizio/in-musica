<template>
  <div class="chat">
        <div class="mexages" ref="mexages">
          <div v-for="message in $store.state.chat" :key="message.key" 
                :class="{'mine':message.color==$store.state.color}">
                <div :style="{'backgroundColor':message.color}">
                  <span>{{message.message}}</span>
                </div>
          </div>
        </div>
        <form class="mex" @submit="send" autocomplete="off">
            <vs-input ref="search" type="text" v-model="mex" placeholder="Type something...">
                <template #icon>
                    <i class='bx bx-message-square-detail' ></i>
                </template>
            </vs-input>
            <div class="send-btn"  :disabled="!mex">
                <vs-button dark transparent>
                    <i class='bx bxs-send'></i>
                </vs-button>
            </div>
        </form>
  </div>
</template>

<script>
export default {
    name: 'chat',
    data:()=>({
        mex: '',
        height: -1
    }), 
    watch: {
        chat() {
        }
    },
    methods: {
        send(ev) {
            ev.preventDefault();
            
            if(this.mex) {
                this.$store.commit('SEND_MESSAGE', this.mex);
                this.mex = '';
            }
        },
        scroll() {
            let chatEl = this.$refs.mexages || {};

            if(chatEl.scrollHeight != this.height) { 
                this.height = chatEl.scrollHeight;
                console.log(this.height);
                this.$refs.mexages.scrollTo({
                    top: this.height, 
                    left: 0,
                    behavior: 'smooth'
                })
            }
        }
    },
    mounted() {
        this.scroll();
    },
    updated() {  
        this.scroll();
    }
}
</script>

<style lang="scss">
.chat {
    display: grid;
    grid-template-rows: auto 60px;

    .mexages {
        // display: flex;
        height: 100%;
        // display: table-cell;
        // vertical-align: bottom;
        overflow-y: auto;
        &>div {
            margin: 5px 10px;
            &.mine {
                text-align: right;
            }
            &>div {
                max-width: 80%;
                border-radius: 10px;
                width: fit-content;
                display: inline-flex;
                justify-content: center;
                align-items: center; 
                color: white;
                height: 100%;
                span {
                    padding: 10px;
                    font-size: 0.8em;
                }
            }
        }


    }
    
    .mex {
        padding: 10px;
        position: relative;
        display: grid;
        
        grid-template-rows: 100%;
        grid-template-columns: auto 50px;        

        .vs-input-parent { 
            width: 100%; 
            height: 100%;
            display: flex;
            .vs-input-content {
                height: 100%;
                input {
                    height: 100%;
                    width: 100%;
                    font-size: 1em;
                }
                label {
                    width: calc(100% - 44px);
                }
            }
        }

        .send-btn {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .vs-button {
                height: 40px;
                width: 40px;
                margin-right: 0;
                font-size: 1.5em; 
            }
        }
    }
}
</style>