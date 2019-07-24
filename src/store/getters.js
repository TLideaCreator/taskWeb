export default{
    isUserLogin(state) {
        return state.userInfo;
    },
    isAdmin(state){
        return state.userInfo.admin === 'Yes'
    },
    avatarUrl(state) {
        let url = '';
        if (state.userInfo && state.userInfo.avatar) {
            url = require('../assets/images/avatar/' + state.userInfo.avatar + '.png')
        }
        return url;
    },
    notice(state){
        return state.notice;
    },
    toast(state){
        return state.toast;
    },
    loading(state){
        return state.loading;
    }
}
