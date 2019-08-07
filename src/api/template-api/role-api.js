import {http, loading, toast} from '@/utils'

export default {
    getList(tempId, callback) {
        loading.start();
        http.getRequest(`/api/system/template/${tempId}/roles`, {},
            result => {
                if (callback) {
                    callback(result.data)
                }
                loading.finish();
            }, () => {
                toast.error('获取角色列表失败');
                loading.error();
            })
    },

    create(tempId, role, callback){
        loading.start();
        http.postRequest(`/api/system/template/${tempId}/roles`, role, result=>{
            if(callback){
                callback(result.data)
            }
            loading.finish();
        },()=>{
            toast.error('创建角色失败');
            loading.error();
        })
    },
    update(role,callback){
        loading.start();
        http.patchRequest(`/api/system/template/${role.temp_id}/roles/${role.id}`, role, result=>{
            if(callback){
                callback(result.data)
            }
            loading.finish();
        },()=>{
            toast.error('保存角色失败');
            loading.error();
        })
    },
    delete(role,callback){
        loading.start();
        http.deleteRequest(`/api/system/template/${role.temp_id}/roles/${role.id}`, {}, result=>{
            if(callback){
                callback(result.data)
            }
            loading.finish();
        },()=>{
            toast.error('删除角色失败');
            loading.error();
        })
    },
}
