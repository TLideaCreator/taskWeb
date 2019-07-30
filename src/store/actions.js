import {events,router,storage, notice,toast,loading} from '@/utils';
export default{
    init({commit}) {
        commit('updateUserInfo', storage.get('userInfo'));
        events.$on('userLogin', userInfo=>{
            commit('updateUserInfo', userInfo);
            router.replace({
                name:'projectsList'
            })
        });
        loading.addLoadingListener(loading=>{
            commit('updateLoading',loading);
            if(loading.show){
                commit('updateLoadingFlag',loading.show);
            }else{
                setTimeout(()=>{
                    commit('updateLoadingFlag',loading.show);
                }, 800)
            }
        });
        notice.addNoticeListener(notice=>{
           commit('updateAlertFlag', true);
           commit('updateNotice', notice);
        });
        toast.addNoticeListener(notice=>{
            commit('updateToastFlag', true);
            commit('updateToast', notice);
        });
    }
}
