import {http, loading, toast} from '@/utils'

export default {
    getList(tempId, callback) {
        loading.start();
        http.getRequest('/api/system/template/' + tempId + '/roles', {},
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

}