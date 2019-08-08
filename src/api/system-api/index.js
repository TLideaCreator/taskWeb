import users from './user-api.js'
import {http, toast, loading} from '@/utils';

function getSystemStatics(callback){
    loading.start();
    http.getRequest('/api/system/statics',{}, result=>{
        if(callback){
            callback(result)
        }
        loading.finish();
    }, ()=>{
        loading.error();
        toast.error('获取系统统计失败');
    })
}

export default {
    users,
    getSystemStatics
}
