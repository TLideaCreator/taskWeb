import {http, toast} from '@/utils';

export default {
    getList(projectId, callback) {
        http.getRequest(`/api/projects/${projectId}/members`, {},
            result => {
                if (callback) {
                    callback(result.data, result.meta.roles);
                }
            }, () => {
                toast.error('获取列表失败')
            })
    },

    updateMemberRole(projectId, userId, roleId, callback) {
        let url = `/api/projects/${projectId}/members/${userId}/roles/${roleId}`;
        http.postRequest(url, {},
            result => {
                if (callback) {
                    callback(result.data, result.meta.roles);
                }
            }, () => {
                toast.error('添加失败')
            });
    },
    delete(projectId, userId, callback) {
        let url = `/api/projects/${projectId}/members/${userId}`;
        http.deleteRequest(url, {},
            result => {
                if (callback) {
                    callback(result.data, result.meta.roles);
                }
            }, () => {
                toast.error('删除失败')
            });
    },
}