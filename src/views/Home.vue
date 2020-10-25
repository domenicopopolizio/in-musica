<template>
  <div class="home"> 
    <img src='../assets/logo.png' class='logo'>
    
    <h2><br>Music at distance:</h2>
    <br><br>
    <vs-button dark size="xl" @click="startListening"> <i class='bx bx-align-middle'></i> Start Listening </vs-button>

    <div class="history">
      <list-img-element 
      v-for="room in $store.state.roomsHistory"
      :key="room.uuid"
      :image="`linear-gradient(0deg, ${room.color}, ${room.color})`"
      @click="accessRoom(room)">
       {{room.title}}  <!--  <span class="edit-btn"><i class="bx bx-pencil"></i></span> -->
      </list-img-element>
    </div>
  </div>
</template>

<script> 
import {v4 as uuid} from 'uuid';
import ListImgElement from '../components/ListImgElement';

export default {
  name: 'Home', 
  components: {ListImgElement},
  methods: {
    startListening(event) {
      let room = this.createRoom();
      this.$store.dispatch('createRoom', room);
      this.$router.push(`room/${room}`);
    },
    createRoom() {
      return uuid();
    },
    accessRoom(room) {
      this.$router.push(`room/${room.uuid}`);
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

  .history {
    text-align: center;
    width: 100%;
    height: fit-content;
    margin-top: 50px;

    .thumbnail {
      display: in;
    }
    .thumbnail:before {
      font-family: 'boxicons';
      content: "\eb66";
      color: white;
      font-size: 20px;
    }

    // .edit-btn {
    //   font-size: 1.5em; 
    //   position: absolute;
    //   right: 0;
    //   top: 20%;
    // }
  }
}

</style>
