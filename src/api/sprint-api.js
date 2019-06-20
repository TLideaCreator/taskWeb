import {http, toast} from '@/utils';
export default {
    createSprint(projectId, callback) {
        http.postRequest('/api/projects/' + projectId + '/sprints', {},
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
        let url = '/api/projects/sprints/' + sprintId + '/implementation';
        http.postRequest(url, {},
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
        http.getRequest('/api/projects/' + projectId + '/sprints',
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
        let url = '/api/projects/sprints/' +sprint.id;
        sprint.status = 2;
        http.patchRequest(url, sprint, ()=>{
            if(callback){
                callback();
            }
        }, error=>{
            toast.error(error.msg)
        });
    }
}