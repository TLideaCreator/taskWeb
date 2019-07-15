export default{
    isUserLogin(state) {
        return state.userInfo;
    },
    avatarUrl(state) {
        let url = '';
        if (state.userInfo && state.userInfo.avatar) {
            url = require('../assets/images/avatar/' + state.userInfo.avatar + '.png')
        }
        return url;
    }
}
