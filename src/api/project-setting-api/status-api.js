import {loading, toast} from '@/utils'
import http from '../http'

export default {
    getList(projectId, callback) {
        loading.start();
        http.getRequest(`/api/projects/${projectId}/settings/status`, {},
            result => {
                if (callback) {
                    callback(result.data);
                }
                loading.finish();
            },
            () => {
                toast.error('获取状态列表失败');
                loading.error();
            })
    },
    create(projectId, status, callback) {
        loading.start();
        http.postRequest(`/api/projects/${projectId}/settings/status`, status,
            result => {
                if (callback) {
                    callback(result.data);
                }
                loading.finish();
            },
            () => {
                toast.error('保存修改失败');
                loading.error();
            })
    },
    update(status, callback) {
        loading.start();
        http.patchRequest(`/api/projects/${status.project_id}/settings/status/${status.id}`, status,
            result => {
                if (callback) {
                    callback(result.data);
                }
                loading.finish();
            },
            () => {
                toast.error('保存修改失败');
                loading.error();
            })
    },
    delete(status, callback) {
        loading.start();
        http.deleteRequest(`/api/projects/${status.project_id}/settings/status/${status.id}`, {},
            result => {
                if (callback) {
                    callback(result.data);
                }
                loading.finish();
            },
            () => {
                toast.error('保存修改失败');
                loading.error();
            })
    },

    updateIndex(projectId, params, callback) {
        http.patchRequest(`/api/projects/${projectId}/settings/status/sequence`, params,
            result => {
                if(callback){
                    callback(result.data);
                }
            }, () => {
                if(callback){
                    callback();
                }
                toast.error('顺序修改失败，请稍后重试')
            })
    }
}
