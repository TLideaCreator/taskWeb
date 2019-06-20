import {events, consts} from "@/utils";

export default {
    initEvents({commit}){
        events.$off('menuClickTrigger');
        events.$on('menuClickTrigger',()=>{
            commit('updateMenuState');
        });
        events.$off('updateScreenSize');
        events.$on('updateScreenSize', ()=>{
            commit('updateContentWidth');
        });

        commit('updateUserInfo',consts.userInfo)
    }
}
