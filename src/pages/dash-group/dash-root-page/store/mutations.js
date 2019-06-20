export default {
    updateMenuState(state) {
        state.menuState = !state.menuState;
    },
    updateUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },
    updateContentWidth(state){
        state.contentWidth = document.documentElement.clientWidth - 64;
    }
}
