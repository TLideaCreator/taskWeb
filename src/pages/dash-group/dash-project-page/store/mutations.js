export default {
    updateCreateOrEditModel(state, val) {
        state.createOrEditModel = val;
    },
    updateCurrentSelectProject(state, val) {
        state.currentSelectProject = val;
    },
    updateProjectList(state, val) {
        state.projectList = val;
    },
    updateSearchKey(state, val) {
        state.searchKey = val
    },
    updateTotalCount(state, val) {
        state.totalCount = val;
    },
    updateCurrentPage(state, val) {
        state.currentPage = val;
    },
    updateShowModal(state, val){
        state.showModal = val;
    },
    updatePageMeta(state, val){
        state.totalCount = val.total;
    },
    updateLatestProjectList(state, val){
        state.lastUpdateProjects = val;
    },
    updatePageCount(state,val){
        state.pageCount = Math.floor(val/44);
    }
}
