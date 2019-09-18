export default{
    fullHeight(state){
        return {
            height: state.contentFullHeight + 'px'
        }
    },
    isUserLogin(state) {
        return state.userInfo;
    },
    isAdmin(state){
        return state.userInfo.admin === 'Yes'
    },
    avatarUrl : () => (userInfo)=>{
        let url = '';
        if (userInfo && userInfo.avatar) {
            url = require('../assets/images/avatar/' + userInfo.avatar + '.png')
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
    },
    getMenuList(state){
        return state.drawerMenuList;
    },

    pathItems(state){
        return state.pathItems;
    },

    modal(state){
        return state.modal
    },
    drawerMenuState(state){
        return state.drawerMenuState
    },

    showDrawerMenu(state){
        return state.showDrawerMenu;
    }
}
