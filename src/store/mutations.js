import {menus} from '@/utils';

export default {
    updateUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },
    updateAlertFlag(state, type) {
        state.alertFlag = type
    },

    updateNotice(state, notice) {
        state.notice = notice
    },

    updateToastFlag(state, type) {
        state.toastFlag = type
    },

    updateToast(state, toast) {
        state.toast = toast
    },
    updateLoadingFlag(state, loadingFlag) {
        state.loadingFlag = loadingFlag
    },
    updateLoading(state, loading) {
        state.loading = loading
    },
    updateRouterName(state, routerName) {
        state.routerName = routerName;
        state.drawerMenuList = menus.getDrawerMenuList(state.routerName);
        state.showDrawerMenu = state.drawerMenuList.length > 0;
    },
    updatePathItems(state, items) {
        state.pathItems = items;
    },
    updateModalFlag(state, flags) {
        state.modalFlag = flags
    },
    updateModal(state, modal) {
        state.modal = modal
    },
    updateMenuMini(state, flag) {
        state.menuMini = flag
    },
    updateDrawerMenuState(state, flag) {
        state.drawerMenuState = flag;
    },
    updateShowDrawerMenu(state, flag) {
        state.showDrawerMenu = flag;
    }
}
