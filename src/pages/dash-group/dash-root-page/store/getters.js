import {consts} from '@/utils'
export default {
    getContentStyle(state){
        let marginLeft = 0;
        if (state.menuState) {
            marginLeft = 200;
        }
        let contentWidth = state.contentWidth - marginLeft;
        if(contentWidth < 800){
            contentWidth = 800
        }
        return {
            width: contentWidth + 'px',
            marginLeft: marginLeft + 'px',
        };
    },
    getFullHeight(){
        return consts.contentHeight;
    },
    getMenuList(state) {
        if (state.userInfo) {
            if (state.userInfo.admin) {
                return [
                    {
                        name: '项目列表',
                        icon: 'md-list',
                        path: 'project'
                    },
                    {
                        name: '用户列表',
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
