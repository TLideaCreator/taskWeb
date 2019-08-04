import {http, loading, toast} from '@/utils'

export default {
    getTemplateDetail(templateId, callback) {
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
    },
    updateTemplate(tempId, template, callback) {
        loading.start();
        http.patchRequest('/api/system/template/' + tempId, template, result => {
            if (callback) {
                callback(result.data);
            }
            loading.finish();
        }, () => {
            toast.error('修改模板失败');
            loading.error();
        })
    },

    getTemplateRoleList(tempId, callback) {
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
    getTemplateStatus(tempId, callback) {
        loading.start();
        http.getRequest('/api/system/template/'+tempId+'/status', {},
            result => {
                if(callback){
                    callback(result.data);
                }
                loading.finish();
            },
            () => {
                toast.error('获取状态列表失败');
                loading.error();
            })
    }
}
