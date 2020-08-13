import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuesax from 'vuesax';
import VueYoutube from 'vue-youtube'
window.axios = require('axios');

import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax)
Vue.use(VueYoutube)
Vue.$axios = axios;
 

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


