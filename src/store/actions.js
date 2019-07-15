import {events,router} from '@/utils';
import {storage} from "../utils";
export default{
    init({commit}) {
        commit('updateUserInfo', storage.get('userInfo'));
        events.$on('userLogin', userInfo=>{
            commit('updateUserInfo', userInfo);
            router.replace({
                name:'projects'
            })
        });
    }
}
