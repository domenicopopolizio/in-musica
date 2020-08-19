<template>
  <div class="home"> 
    <img src='../assets/logo.png' class='logo'>
    
    <h2><br>Music at distance:</h2>
    <br><br>
    <vs-button dark size="xl" @click="startListening"> <i class='bx bx-align-middle'></i> Start Listening </vs-button>
  </div>
</template>

<script> 
import {v4 as uuid} from 'uuid';

export default {
  name: 'Home', 
  methods: {
    startListening(event) {
      let room = this.createRoom();
      this.$store.dispatch('createRoom', room);
      this.$router.push(`room/${room}`);
    },
    createRoom() {
      return uuid();
    }
  }
}
</script>

<style lang="scss">
.home {
  text-align: center;
  padding-top: 100px;
  padding-left: 50px;
  padding-right: 50px;
  height: calc(100vh - 100px);
  
  .vs-button {
      display: inline-block;
  }

  i.bx.bx-align-middle {
    transform: rotate(90deg);
    transform-origin: center;
    margin-right: 10px
  }

  .logo {
    width: 150px;
    height: auto;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.432);
    border-radius: 100%;
  }
}

</style>
