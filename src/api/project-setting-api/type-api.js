import {http, loading, toast} from '@/utils'

export default {
    getList(projectId, callback) {
        loading.start();
        http.getRequest(`/api/projects/${projectId}/types`, {},
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
}