//Photo by Johannes Plenio from Pexels

import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueClipboard from 'vue-clipboard2'
import firebase from'firebase'
import './components/firebaseInit'
 
Vue.use(VueClipboard)

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})




