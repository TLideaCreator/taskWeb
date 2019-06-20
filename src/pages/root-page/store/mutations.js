import {consts}from "@/utils/";

export default {
    updateSideMenuState(state, val){
        state.showSideMenu = val;
    },
    updateUserInfo(state, userInfo){
        state.userInfo = userInfo;
    },
    updateScreenSize(state){
        state.screenWidth = document.documentElement.clientWidth;
        consts.contentHeight = document.documentElement.clientHeight;
    }
}
