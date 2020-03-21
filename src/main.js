import Vue from 'vue';
import Meta from 'vue-meta'
import VueAnalytics from 'vue-analytics'
import App from './App.vue';
import router from './router';
import store from './store';
import AppButton from './components/common/AppButton';
import AppLine from './components/common/AppLine';
import AppInput from './components/common/AppInput';

Vue.config.productionTip = false;

Vue.use(Meta);
Vue.use(VueAnalytics, {
  id: 'UA-161480195-1',
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  },
  router
});

Vue.component('app-button', AppButton);
Vue.component('app-line', AppLine);
Vue.component('app-input', AppInput);

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'));
  }
}).$mount('#app');
