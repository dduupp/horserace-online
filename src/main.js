import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './styles/index.scss';

Vue.config.productionTip = false;

import Components from './components';

Vue.use(Components);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
