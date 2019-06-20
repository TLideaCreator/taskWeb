import api from '@/api';

export default {
    initPage({commit,dispatch}, params){
        commit('updatePageCount',params.contentHeight);
        dispatch('loadProjectList',params);
        dispatch('loadLastProjects')
    },

    changePage({commit,dispatch},page){
        commit('updateCurrentPage', page);
        dispatch('loadProjectList')
    },
    loadProjectList({state, commit},{searchKey, page}){
        let data = {
            searchKey: searchKey,
            page: page,
            per_page: state.pageCount
        };
        api.project.getProjectList(data, (projectList, meta)=>{
            commit('updateProjectList', projectList);
            commit('updatePageMeta', meta);
        });
    },
    loadLastProjects({commit}){
        api.project.getLastUpdateProject((projectList)=>{
            commit('updateLatestProjectList', projectList);
        });
    }
}
