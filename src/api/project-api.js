import {http, toast} from '@/utils';

export default {
    getProjectList(data, callback) {
        http.getRequest('/api/projects', data,
            (result) => {
                if (callback) {
                    callback(result.data, result.meta)
                }
            }, () => {
                toast.error('创建项目失败');
            })
    },

    getProjectDetailApi(projId, callback) {
        http.getRequest('/api/projects/' + projId, {}, result => {
            if (callback) {
                callback(result.data);
            }
        }, (code) => {
            if (callback) {
                callback();
            }
            let msg = '';
            switch (code) {
                case 404:
                    msg = '项目不存在';
                    break;
                case 403:
                    msg = '无法查看此项目';
                    break;
            }
            toast.error(msg);

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
                let msg = '';
                switch (code) {
                    case 404: msg='项目不存在'; break;
                    case 403: msg='没有修改权限'; break;
                    default: msg='网络错误，请稍后重试'; break;
                }
                toast.error(msg);
            });
    }

}
