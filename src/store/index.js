import Vue from 'vue';
import Vuex from 'vuex';
import ListPageModule from './modules/list';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    task: ListPageModule,
  },
  state: { // = data
  },
  getters: { // = computed properties
  },
  actions:{
  },
  mutations: {
  }
});