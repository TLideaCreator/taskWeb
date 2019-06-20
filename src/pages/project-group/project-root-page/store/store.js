import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

let debug = process.env.NODE_ENV !== 'production';

const projectPlugin = store=>{
    store.subscribe((mutation)=> {
        if(mutation.type === 'updateProjectId'){
            store.dispatch('loadProjectInfo');
            store.dispatch('loadProjectList');
        }
    })
};

export default new Vuex.Store({
    script: debug,
    plugins: [projectPlugin],
    state,
    mutations,
    actions,
    getters
});
