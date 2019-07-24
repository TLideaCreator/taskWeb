export default{
    updateUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },
    updateAlertFlag(state, type){
        state.alertFlag = type
    },

    updateNotice(state, notice){
        state.notice = notice
    },

    updateToastFlag(state, type){
        state.toastFlag = type
    },

    updateToast(state, toast){
        state.toast = toast
    },
    updateLoadingFlag(state, loadingFlag){
        state.loadingFlag = loadingFlag
    },
    updateLoading(state, loading){
        state.loading = loading
    }
}
