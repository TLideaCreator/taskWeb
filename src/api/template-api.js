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

    getSystemTemplateTypes(tempId, callback) {
        loading.start();
        http.getRequest('/api/system/template/' + tempId + '/types', {},
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


    getTemplateStatus(tempId, callback) {
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
    createTemplateStatus(tempId, status, callback) {
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
    updateTemplateStatus(status, callback) {
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
    deleteTemplateStatus(status, callback) {
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
    getSystemTemplatePriorityList(tempId, callback) {
        loading.start();
        http.getRequest(`/api/system/template/${tempId}/priorities`, {},
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
    createSystemTemplatePriority(tempId,priority, callback) {
        loading.start();
        http.postRequest(`/api/system/template/${tempId}/priorities`, priority,
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
    updateSystemTemplatePriority(priority, callback) {
        loading.start();
        http.patchRequest(`/api/system/template/${priority.temp_id}/priorities/${priority.id}`,
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
    deleteSystemTemplatePriority(priority, callback) {
        loading.start();
        http.deleteRequest(`/api/system/template/${priority.temp_id}/priorities/${priority.id}`, {},
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
}
