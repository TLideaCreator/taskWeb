import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import actions from './actions'
import getters from './getters'


Vue.use(Vuex);

let debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    script: debug,
    state,
    mutations,
    actions,
    getters
})
