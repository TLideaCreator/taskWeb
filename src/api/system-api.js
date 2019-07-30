import {http, toast, loading} from '@/utils';

export default {
    getDefaultProjectTemplate(callback) {
        http.getRequest('/api/system/template', {},
            result => {
                if(callback){
                    callback(result.data);
                }
            })
    },

    getSystemStatics(callback){
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
}