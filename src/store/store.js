import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import actions from './actions'
import getters from './getters'
import projectSprint from './modules/project-detail-sprint'

Vue.use(Vuex);

export default new Vuex.Store({
    script: process.env.NODE_ENV !== 'production',
    state,
    mutations,
    actions,
    getters,
    modules:{
        sprint: projectSprint
    }
})
