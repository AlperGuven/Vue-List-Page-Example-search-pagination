import Vue from 'vue';
import Vuex from 'vuex';
import { ObjectUtils } from '../../utils/object-utils'
Vue.use(Vuex);

const state = {
    name : 'Product Name',
    price : '$4',
    details: {},
    list : [],
    dataResponse : {},
};
const getters = {
    list: state =>{
        return state.list;
    },
    details: state =>{
        return state.details;
    },
    price: state =>{
        return state.price;
    },
    name: state =>{
        return state.name;
    },
    getDataResponse: state =>{
        return state.dataResponse;
    },
};
const mutations = {
    setName(state, newName){
        state.name = newName;
    },
    setDetails(state, data){
        state.details = ObjectUtils.copy(data);
    },
    setDataResponse(state, newData){
        state.dataResponse = newData;
    },
};
const actions = {
};

export default{
    state,
    getters,
    mutations,
    actions
}