export default {
    updatePageCount(state,height){
        state.pageCount = Math.floor(height / 44);
    },
    updateTotalCount(state, total){
        state.totalCount = total;
    },
    updateUserList(state, userList){
        state.userList = userList;
    }
}
