import api from '@/api';
export default {
    initPage({commit,dispatch}, params){
        commit('updatePageCount',params.contentHeight);
        dispatch('loadUserList',params);
    },
    loadUserList({state, commit},{searchKey,page}){
        let data = {
            searchKey:searchKey,
            page:page,
            per_page:state.pageCount
        };
        api.user.queryUserList(data, result=>{
            commit('updateTotalCount', result.total);
            commit('updateUserList', result.data);
        })
    }
}
