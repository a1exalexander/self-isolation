import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AppButton from './components/common/AppButton'
import AppLine from './components/common/AppLine'
import AppInput from './components/common/AppInput'

Vue.config.productionTip = false

Vue.component('app-button', AppButton)
Vue.component('app-line', AppLine)
Vue.component('app-input', AppInput)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
