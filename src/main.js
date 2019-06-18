import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import store from './store/store'
import { routes } from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
