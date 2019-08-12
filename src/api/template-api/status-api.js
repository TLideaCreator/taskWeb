import {http, loading, toast} from '@/utils'

export default {
    getList(tempId, callback) {
        loading.start();
        http.getRequest('/api/system/template/' + tempId + '/status', {},
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
    create(tempId, status, callback) {
        loading.start();
        http.postRequest('/api/system/template/' + tempId + '/status', status,
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
        http.patchRequest('/api/system/template/' + status.temp_id + '/status/' + status.id, status,
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
        http.deleteRequest('/api/system/template/' + status.temp_id + '/status/' + status.id, {},
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
    updateIndex(tempId, params, callback) {
        http.patchRequest(`/api/system/template/${tempId}/status/sequence`, params,
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
