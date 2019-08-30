import {toast, loading} from '@/utils';
import http from './http'

let error={
    404: '项目不存在',
    403: '无法查看此项目',
    500: '网络错误，请稍后重试'
};

export default {
    getProjectList(data, callback) {
        http.getRequest('/api/projects', data,
            (result) => {
                if (callback) {
                    callback(result.data, result.meta)
                }
            }, () => {
                toast.error('获取项目失败');
            })
    },

    getProjectDetailApi(projId, callback) {
        loading.start();
        http.getRequest(`/api/projects/${projId}`, {}, result => {
            if (callback) {
                callback(result.data);
            }
            loading.finish();
        }, (code) => {
            if (callback) {
                callback();
            }
            toast.error(error[code]);
            loading.error();
        });
    },
    createProject(projectItem, callback) {
        http.postRequest('/api/projects', projectItem,
            (result) => {
                if (callback) {
                    callback(result.data)
                }
            }, () => {
                toast.error('创建项目失败');
            })
    },
    getLastUpdateProject(callback) {
        http.getRequest('/api/projects/latest/time', {}, result => {
            if (callback) {
                callback(result.data);
            }
        });
    },
    updateProject(projectInfo, callback) {
        http.patchRequest(`/api/projects/${projectInfo.id}`,
            projectInfo,
            result => {
                if(callback){
                    callback(result.data);
                }
            }, code => {
                toast.error(error[code]);
            });
    }

}
