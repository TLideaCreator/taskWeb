import {http, loading, toast} from '@/utils'

export default {
    getList(projectId, callback) {
        loading.start();
        http.getRequest(`/api/projects/${projectId}/status`, {},
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
        http.postRequest(`/api/projects/${projectId}/status`, status,
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
        http.patchRequest(`/api/projects/${status.project_id}/status/${status.id}`, status,
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
        http.deleteRequest(`/api/projects/${status.project_id}/status/${status.id}`, {},
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
}