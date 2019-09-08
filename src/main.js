import Vue from 'vue';
import App from './App.vue';
import VueDND from 'awe-dnd';

Vue.use(VueDND);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
