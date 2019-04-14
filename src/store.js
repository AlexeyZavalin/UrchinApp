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
        .post('/auth/token/login', payload)
        .then(response => {
          if (response.status === 200) {
            context.commit('setUser', response.data)
          }
        })
        .catch(error => console.log(error))
    },
    userLogout(context, payload) {
      axios
        .post('http://127.0.0.1:8000/auth/token/logout', {
          token: payload.auth_token
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
})
