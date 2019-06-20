import {storage, consts, events, router} from "../../../utils";

export default {
    initPageLayoutConst({commit}) {
        consts.userInfo = storage.get('userInfo');
        consts.contentHeight = document.documentElement.clientHeight;
        window.addEventListener('resize',  ()=>{
            commit('updateScreenSize');
            events.$emit('updateScreenSize');
        });
        commit('updateUserInfo', consts.userInfo);
        events.$on('userLogin', userInfo=>{
            commit('updateUserInfo', userInfo);
            consts.userInfo = userInfo;
            router.replace({
                name:'project'
            })
        });
        events.$on('user-logout', ()=>{
            commit('updateUserInfo', null);
        })
    },
    menuTrigger({commit}, val){
        commit('updateSideMenuState',val);
        events.$emit('menuClickTrigger', val);
    },
    logoutTaskBoard({commit}){
        consts.cleanLoginUserInfo();
        commit('updateUserInfo', undefined);
        router.replace({
            name:'login'
        })
    },
    menuSelectChanged({commit}){
        commit('updateSideMenuState', true)
    }
}
