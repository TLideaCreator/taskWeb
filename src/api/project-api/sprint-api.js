import {toast} from '@/utils';
import http from '../http'

export default {
    createSprint(projectId, callback) {
        http.postRequest(`/api/projects/${projectId}/sprints`, {},
            result => {
                if (callback) {
                    callback(result.data);
                }
            }, code => {
                let msg = '';
                if (code === 403) {
                    msg = '没有访问权限';
                } else {
                    msg = '网络异常';
                }
                toast.error(msg);
            });
    },

    makeSprintActive(projectId, sprintId, callback) {
        http.postRequest(`/api/projects/sprints/${sprintId}/implementation`, {},
            () => {
                if (callback) {
                    callback();
                }
            },
            code => {
                let msg = '';
                if (code === 403) {
                    msg = '没有访问权限';
                } else {
                    msg = '网络异常';
                }
                toast.error(msg);
            })
    },

    getSprintList(projectId, type, callback) {
        http.getRequest(`/api/projects/${projectId}/sprints`,
            {
                type: type
            },
            result => {
                if (callback) {
                    callback(result.data, result.meta);
                }
            }, code => {
                let msg = '';
                if (code === 403) {
                    msg = '没有访问权限';
                } else {
                    msg = '网络异常';
                }
                toast.error(msg);
            });
    },

    sprintFinish(sprint, callback){
        sprint.status = 2;
        http.patchRequest(
            `/api/projects/sprints/${sprint.id}/finish`, sprint, ()=>{
            if(callback){
                callback();
            }
        }, error=>{
            toast.error(error.msg)
        });
    }
}
