import {toast, loading} from '@/utils'
import http from '../http'

export default {
    getList(params, callback) {
        loading.start();
        http.getRequest('/api/system/users', params,
            result => {
                if (callback) {
                    callback(result.data, result.meta)
                }
                loading.finish();
            }, () => {
                toast.error('获取用户列表失败');
                loading.error();
            })
    },
    getDetail(userId, callback){
        loading.start();
        http.getRequest(`/api/system/users/${userId}`, {},
            result => {
                if (callback) {
                    callback(result.data)
                }
                loading.finish();
            }, () => {
                toast.error('获取用户失败');
                loading.error();
            })
    },
    create(user, callback){
        loading.start();
        http.postRequest(`/api/system/users`, user,
            result => {
                if (callback) {
                    callback(result.data)
                }
                loading.finish();
            }, () => {
                toast.error('创建用户失败');
                loading.error();
            })
    },

}
