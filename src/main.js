import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AppButton from './components/common/AppButton'
import AppLine from './components/common/AppLine'

Vue.config.productionTip = false

Vue.component('app-button', AppButton)
Vue.component('app-line', AppLine)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
