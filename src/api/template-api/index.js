import priority from './priority-api'
import status from './status-api'
import type from './type-api'
import role from './role-api'
import {http, loading, toast} from '@/utils'

function getDetail(templateId, callback) {
    loading.start();
    http.getRequest('/api/system/template/' + templateId, {},
        result => {
            if (callback) {
                callback(result.data, result.meta)
            }
            loading.finish();
        }, () => {
            toast.error('获取模板详情失败');
            loading.error();
        })
}
function update(tempId, template, callback) {
    loading.start();
    http.patchRequest(`/api/system/template/${tempId}`, template, result => {
        if (callback) {
            callback(result.data);
        }
        loading.finish();
    }, () => {
        toast.error('修改模板失败');
        loading.error();
    })
}

function getList(callback) {
    loading.start();
    http.getRequest(`/api/system/template`, {}, result => {
        if (callback) {
            callback(result.data);
        }
        loading.finish();
    }, () => {
        toast.error('修改模板失败');
        loading.error();
    })
}

function create(temp, callback) {
    loading.start();
    http.postRequest(`/api/system/template`, temp, result => {
        if (callback) {
            callback(result.data);
        }
        loading.finish();
    }, () => {
        toast.error('修改模板失败');
        loading.error();
    })
}

function delTemp(tempId, callback){
    loading.start();
    http.patchRequest(`/api/system/template/${tempId}`, {}, result => {
        if (callback) {
            callback(result.data);
        }
        loading.finish();
    }, () => {
        toast.error('修改模板失败');
        loading.error();
    })
}

export default {
    priority,
    status,
    type,
    role,
    getDetail,
    getList,
    create,
    update,
    delTemp
}
