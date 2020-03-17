import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AppButton from './components/common/AppButton'

Vue.config.productionTip = false

Vue.component('app-button', AppButton)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
