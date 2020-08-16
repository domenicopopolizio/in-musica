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
    video: {
      id: null,
      status: null,
    },
    player: null
  },
  mutations: {  
    SET_VIDEO(state, video) {  
      let newVideo = {
        'id':utils.getId(video.url),
        'title':video.title,
        'author':video.author_name,
        'status':1,
        'time':0,
        'total_time':'',
        'updated_at': (new Date()).toISOString(),
      };
      state.video = newVideo;
      state.videoRef.set(newVideo);
    },
    STOP_VIDEO(state, time) {
      state.video.time = time||0;
      state.video.status = 2,
      state.video.updated_at = (new Date()).toISOString();
      state.videoRef.update({
        'time':time||0,
        'status':2,
        'updated_at': (new Date()).toISOString(),
      });
    },
    PLAY_VIDEO(state, time) { 
      state.video.time = time||0;
      state.video.status = 1,
      state.video.updated_at = (new Date()).toISOString();
      state.videoRef.update({
        'time':time||0,
        'status':1,
        'updated_at': (new Date()).toISOString(),
      })
    },
    RESTART_VIDEO(state) {
      state.video.time = 0;
      state.video.status = 2,
      state.video.updated_at = (new Date()).toISOString();
      state.videoRef.update({
        'status':2,
        'time':0,
        'updated_at': (new Date()).toISOString(),
      })
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
