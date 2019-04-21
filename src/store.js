import Vue from 'vue'
import Vuex from 'vuex'
import instance from '@/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    signUserIn(context, payload) {
      instance
        .post('/auth/token/login/', payload)
        .then(response => {
          if (response.status === 200) {
            context.commit('setUser', response.data)
          }
        })
        .catch(error => console.log(error))
    },
    signUserUp(context, payload) {
      instance
        .post('/api/register/', payload)
        .then(response => {
          console.log(response);
        })
        .catch(error => console.log(error))
    },
    userLogout(context, payload) {
      instance
        .post('/auth/token/logout/')
        .then(response => {
          if (response.status === 204) {
            context.commit('setUser', null)
          }
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
})
