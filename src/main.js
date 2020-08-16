

  
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuesax from 'vuesax';
import VueYoutube from 'vue-youtube' 

import 'vuesax/dist/vuesax.css' //Vuesax styles



Vue.use(Vuesax)
Vue.use(VueYoutube)
Vue.prototype.$axios = require('axios');

 

Vue.config.productionTip = false

let app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') 

