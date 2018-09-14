import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import { store } from './store'
import firebase from 'firebase'
import { firebaseConfig } from './config'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faPlusCircle, faCheckCircle, faQuestionCircle, faExclamationCircle, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import InstantSearch from 'vue-instantsearch'

Vue.use(Vuetify, {
  theme: {
    primary: '#080f82',
    secondary: '#fd82b9',
    accent: '#8c9eff',
    warning: '#eedd00',
    info: '#05a3f2',
    error: '#ff2b2b',
    success: '#2baf49'
  }
})
Vue.use(InstantSearch)

Vue.config.productionTip = false

library.add(faEdit, faPlusCircle, faCheckCircle, faQuestionCircle, faExclamationCircle, faCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      store.dispatch('autoSignIn', firebaseUser)
    }
  })
  unsubscribe()
})
