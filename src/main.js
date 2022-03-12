import Vue from 'vue';
import App from './App.vue';
import { store } from './store/index';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter);
Vue.use(BootstrapVue);

const router = new VueRouter({    
  mode: 'history',
  routes: [
    {
      path: '/',
      component: require('./components/List.vue').default
    },
    { path: '*', redirect: '/' }
  ]
})

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
})
