/**
 * main.js declares dependencies and initalizes apollo gql requests. 
 */

import Vue from 'vue'
import './assets/styles/custom.scss'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import App from './App.vue'
import router from './router'


import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueApollo)

// Use this during production so the back-end can communicate with front-end securely:

// const getHeaders = () => {
//   const headers = {}
//   const token = window.localStorage.getItem('apollo-token')
//   if (token) {
//     headers.authorization = `Bearer ${token}`
//   }
//   return headers
// }

// Create an http link:
const link = new HttpLink({
  uri: 'http://192.168.50.9:5000/graphql?',
  fetch,
  headers: {} // getHeaders()
})

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    addTypename: true
  })
})

const apolloProvider = new VueApollo({
  defaultClient: client
})

/* eslint-disable no-new */
new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
