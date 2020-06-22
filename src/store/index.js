import Vue from 'vue'
import Vuex from 'vuex'
import helper from './modules/helper.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    helper
  },
  strict: process.env.NODE_ENV !== 'production'
})
