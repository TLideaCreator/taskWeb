import {toast} from '@/utils';
import http from './http'

export default {
    moveTaskToSprint(taskId, sprintId, callback) {
        let url = `/api/projects/sprints/tasks/${taskId}/movement/sprints/${sprintId}`;
        http.patchRequest(url, {},
            result => {
                if (callback) {
                    callback(result.data);
                }
            })
    },
    createTask(sprintId, data, callback) {
        let url = `/api/projects/sprints/${sprintId}/tasks`;
        http.postRequest(url, data,
            result => {
                if (callback) {
                    callback(result.data);
                }
            },
            code => {
                if (callback) {
                    callback(null);
                }
                let msg = '';
                switch (code) {
                    case 403:
                        msg = '权限不足，无法创建任务';
                        break;
                    case 404:
                        msg = '找不到对应的冲刺';
                        break;
                    default:
                        msg = '网络错误，请稍后重试';
                        break;
                }
                toast.error(msg);
            });
    },

    getTaskDetail(taskId, callback) {
        let url = `/api/projects/sprints/tasks/${taskId}`;
        http.getRequest(url, {}, result => {
            if (callback) {
                callback(result.data, result.meta);
            }
        }, () => {
            toast.error('获取任务失败');
        });
    },

    updateTaskInfo(task, callback) {
        let url = `/api/projects/sprints/tasks/${task.id}`;
        http.patchRequest(url, task,
            result => {
                if (callback) {
                    callback(result.data);
                }
            },
            error => {
                toast.error(error.msg);
            });
    },
    updateTaskFile(projectId, taskId, file, callback) {
        http.updateFile(`/api/projects/${projectId}/tasks/${taskId}`, file,
            result => {
                if(callback){
                    callback(result.data);
                }
            }, error => {
                toast.error(error.msg);
            })
    },
    delTaskFile(url, callback) {
        http.deleteRequest(url, {},
            result => {
                if(callback){
                    callback(result.data);
                }
            }, error => {
                toast.error(error.msg);
            })
    }
}
