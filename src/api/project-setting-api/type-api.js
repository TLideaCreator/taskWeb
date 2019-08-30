import {loading, toast} from '@/utils'
import http from '../http'

export default {
    getList(tempId, callback) {
        loading.start();
        http.getRequest(`/api/projects/${tempId}/settings/types`, {},
            result => {
                if (callback) {
                    callback(result.data);
                }
                loading.finish();
            },
            () => {
                toast.error('获取类型列表失败');
                loading.error();
            })
    },
    create(tempId, type, callback) {
        loading.start();
        http.postRequest(`/api/projects/${tempId}/settings/types`,
            type,
            result => {
                if (callback) {
                    callback(result.data);
                }
                loading.finish();
            }, () => {
                toast.error('创建任务类型失败');
                loading.error();
            })
    },
    update(type, callback) {
        loading.start();
        http.patchRequest(`/api/projects/${type.project_id}/settings/types/${type.id}`,
            type,
            result => {
                if (callback) {
                    callback(result.data);
                }
                loading.finish();
            }, () => {
                toast.error('更新任务类型失败');
                loading.error();
            })
    },
    delete(type, callback) {
        loading.start();
        http.deleteRequest(`/api/projects/${type.project_id}/settings/types/${type.id}`,
            {},
            result => {
                if (callback) {
                    callback(result.data);
                }
                loading.finish();
            }, code => {
                if(code === 423){
                    toast.error('至少保留一个类型');
                }else {
                    toast.error('删除任务类型失败');
                }
                loading.error();
            })
    }
}
