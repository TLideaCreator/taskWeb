import {events,router,storage, notice,toast,loading, modal} from '@/utils';
export default{
    init({commit}) {
        commit('updateUserInfo', storage.get('userInfo'));
        events.$on('userLogin', userInfo => {
            commit('updateUserInfo', userInfo);
            router.replace({
                name: 'userProjectPage'
            })
        });
        loading.addLoadingListener(loading => {
            commit('updateLoading', loading);
            if (loading.show) {
                commit('updateLoadingFlag', loading.show);
            } else {
                setTimeout(() => {
                    commit('updateLoadingFlag', loading.show);
                }, 800)
            }
        });
        notice.addNoticeListener(notice => {
            commit('updateAlertFlag', true);
            commit('updateNotice', notice);
        });
        toast.addNoticeListener(notice => {
            commit('updateToastFlag', true);
            commit('updateToast', notice);
        });
        modal.addModalListener(({flag, modal}) => {
            commit('updateModalFlag',flag);
            if(modal){
                commit('updateModal',modal);
            }
        });
    }

}
