import {loading, toast} from '@/utils'
import http from '../http'

export default {
    getList(projectId, callback) {
        loading.start();
        http.getRequest(`/api/projects/${projectId}/settings/roles`, {},
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

    create(projectId, role, callback){
        loading.start();
        http.postRequest(`/api/projects/${projectId}/settings/roles`, role, result=>{
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
        http.patchRequest(`/api/projects/${role.project_id}/settings/roles/${role.id}`, role, result=>{
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
        http.deleteRequest(`/api/projects/${role.project_id}/settings/roles/${role.id}`, {}, result=>{
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
