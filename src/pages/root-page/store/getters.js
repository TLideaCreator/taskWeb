import {consts} from "@/utils";

export default {
    getContentLayoutStyle(state) {
        let marginLeft = 64;
        if (state.showSideMenu) {
            marginLeft = 264;
        }
        let contentWidth = state.screenWidth - marginLeft;
        if(contentWidth < 800){
            contentWidth = 800
        }
        return {
            width: contentWidth + 'px',
            marginLeft: marginLeft + 'px',
            height: consts.contentHeight.height
        }
    },
    getUserAvatar(state){
        if(state.userInfo && state.userInfo.avatar){
            return require('../../../assets/images/avatar/'+state.userInfo.avatar+'.png')
        }
    },

    getFUllHeight() {
        return consts.contentHeight;
    },
    checkSideMenuState(state) {
        return state.showSideMenu
    },
    getUserInfo(state) {
        return state.userInfo;
    },
    getMenuList(state) {
        if (state.userInfo) {
            if (state.userInfo.isAdmin + '' === '1') {
                return [
                    {
                        name: '项目列表',
                        icon: 'md-list',
                        path: 'project'
                    },
                    {
                        name: '任务看板',
                        icon: 'md-clipboard',
                        path: 'tasks'
                    },
                    {
                        name: '用户管理',
                        icon: 'md-people',
                        path: 'user'
                    }
                ]
            } else {
                return [
                    {
                        name: '项目列表',
                        icon: 'md-list',
                        path: 'project'
                    },
                    {
                        name: '任务看板',
                        icon: 'md-clipboard',
                        path: 'tasks'
                    }
                ]
            }
        } else {
            return [
                {
                    name: '请先登录',
                    icon: 'md-person',
                    path: 'login'
                }
            ]
        }
    }
}
