import {http, toast} from '@/utils';

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
        http.getRequest('/api/projects/' + projId, {}, result => {
            if (callback) {
                callback(result.data);
            }
        }, (code) => {
            toast.error(error[code]);
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
        let url = '/api/projects/' + projectInfo.id;
        http.patchRequest(url, projectInfo,
            result => {
                if(callback){
                    callback(result.data);
                }
            }, code => {
                toast.error(error[code]);
            });
    }

}
