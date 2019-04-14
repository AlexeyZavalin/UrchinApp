import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLocalStorage from 'vue-localstorage'
import VCalendar from 'v-calendar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
Vue.use(VueLocalStorage)
Vue.use(VCalendar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
