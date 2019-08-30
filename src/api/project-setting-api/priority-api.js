import {loading, toast} from '@/utils'
import http from '../http'

export default {
    getList(projectId, callback) {
        loading.start();
        http.getRequest(`/api/projects/${projectId}/settings/priorities`, {},
            result => {
                if (callback) {
                    callback(result.data);
                }
                loading.finish();
            },
            () => {

                toast.error();
                loading.error();
            });
    },
    create(projectId,priority, callback) {
        loading.start();
        http.postRequest(`/api/projects/${projectId}/settings/priorities`, priority,
            result => {
                if (callback) {
                    callback(result.data);
                }
                loading.finish();
            },
            () => {
                toast.error('创建优先级失败');
                loading.error();
            });
    },
    update(priority, callback) {
        loading.start();
        http.patchRequest(`/api/projects/${priority.project_id}/settings/priorities/${priority.id}`,
            priority,result => {
                if (callback) {
                    callback(result.data);
                }
                loading.finish();
            },
            code => {
                let msg = code !==423? '更新优先级失败，请稍后重试' : '必须有一个默认优先级';
                toast.error(msg);
                loading.error();
            });
    },
    delete(priority, callback) {
        loading.start();
        http.deleteRequest(`/api/projects/${priority.project_id}/settings/priorities/${priority.id}`, {},
            result => {
                if (callback) {
                    callback(result.data);
                }
                loading.finish();
            },
            code => {
                toast.error(code !== 423? '删除优先级失败，请稍后重试': '必须有一个优先级');
                loading.error();
            });
    },
    updateIndex(projectId, param, callback){
        http.patchRequest(
            `/api/projects/${projectId}/settings/priorities/sequence`,
            param,
            result=>{
                if(callback){
                    callback(result.data);
                }
            },
            ()=>{
                if(callback){
                    callback();
                }
                toast.error('顺序修改失败，请稍后重试')
            }
        )
    }
}
