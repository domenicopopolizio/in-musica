import Vue from 'vue'
import Vuex from 'vuex'

import * as firebase from "firebase/app";  
import "firebase/analytics";
import "firebase/database"; 
import "firebase/auth";
import "firebase/firestore";

import * as utils from "../utils/index";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    firebase,
    videoRef: null,
    video: null,
    localVideo: {
      id: null,
      status: null,
    },
    player: null
  },
  mutations: {  
    SET_VIDEO(state, video) {  
      state.videoRef.set({
        'id':utils.getId(video.url),
        'title':video.title,
        'author':video.author_name,
        'status':1,
        'time':0,
        'total_time':'',
        'updated_at': (new Date()).toISOString(),
      });
    },
    STOP_VIDEO(state, time) { 
      state.videoRef.update({
        'time':time||0,
        'status':2
      });
    },
    PLAY_VIDEO(state, time) {
      state.videoRef.update({
        'time':time||0,
        'status':1
      })
    },
    RESTART_VIDEO(state) {
      state.videoRef.update({
        'status':1,
        'time':0
      })
    },
    SET_PLAYER(state, player) {
      state.player = player;
    }
  },
  actions: {
    initFirebase() {
      const projectId = 'in-musica';

      const firebaseConfig = {
        apiKey: "AIzaSyA1r6weBjOa-BGibsH_P4EzklPsKY35ucU",
        authDomain: `${projectId}.firebaseapp.com`,
        databaseURL: `https://${projectId}.firebaseio.com`,
        projectId: `${projectId}`,
        storageBucket: `${projectId}.appspot.com`,
        messagingSenderId: `34542673818`,
        appId: `1:34542673818:web:4c02c525fbaf47d73fe423`,
        measurementId: `G-7XLJHQD0E9`,
      }; 

      this.state.firebase.initializeApp(firebaseConfig);
      
      this.state.firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message; 

        console.log(error);
      });

      console.log(this.state.firebase.database())
    },
    createRoom({state}, uuid) { 
      let room = state.firebase.database().ref().child('rooms').child(uuid).set({
        'video':{
          'id':'',
          'title':'',
          'author':'',
          'status':2,
          'time':0,
          'total_time':'',
          'updated_at': (new Date()).toISOString(),
        },  
      });
    },
    accessRoom({state}, uuid) {
      state.videoRef = state.firebase.database().ref(`rooms/${uuid}/video`);
      state.videoRef.on('value', (snapshot)=>{
        state.video = snapshot.val();
      });
    }
  },
  modules: {
  }
})
