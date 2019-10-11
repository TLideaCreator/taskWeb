import http from '../http'
import {toast} from '@/utils';
export default {
    getTaskComments(taskId,params, callback) {
        http.getRequest(`/api/projects/sprints/tasks/${taskId}/comments`, params,
            result => {
                if(callback){
                    callback(result.data, result.meta);
                }
            }, () => {
                toast.error('获取评论失败');
            })
    },

    createTaskComments(taskId,params, callback) {
        http.postRequest(`/api/projects/sprints/tasks/${taskId}/comments`, params,
            result => {
                if(callback){
                    callback(result.data);
                }
            }, (error) => {
                let msg = '';
                if (error.code === 404) {
                    msg = '创建评论失败';
                } else {
                    msg = '网络错误,请稍后重试';
                }
                toast.error(msg);
            })
    },
    updateTaskComments(taskComment, callback) {
        http.patchRequest(`/api/projects/sprints/tasks/${taskComment.task_id}/comments/${taskComment.id}`, taskComment,
            result => {
                if(callback){
                    callback(result.data);
                }
            }, (error) => {
                let msg = '';
                if (error.code === 404) {
                    msg = '修改评论失败';
                } else {
                    msg = '网络错误,请稍后重试';
                }
                toast.error(msg);
            })
    },
    delTaskComments(taskId,commentId, callback) {
        http.deleteRequest(`/api/projects/sprints/tasks/${taskId}/comments/${commentId}`, {},
            result => {
                if(callback){
                    callback(result.data);
                }
            }, (error) => {
                let msg = '';
                if (error.code === 500) {
                    msg = '删除评论失败';
                } else {
                    msg = '网络错误,请稍后重试';
                }
                toast.error(msg);
            })
    },

}
