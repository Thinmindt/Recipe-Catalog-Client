// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'

import VueApollo from 'vue-apollo'

import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueApollo)

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
  uri: 'http://127.0.0.1:5000/graphql?',
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
  el: '#app',
  router,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
