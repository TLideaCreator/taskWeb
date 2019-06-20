import {http, toast, consts} from "./index";

export default {
    userLogin({acct, pwd}, callback) {
        http.postRequest('/api/guest/user/login',
            {
                account: acct,
                pwd: pwd
            }, result => {
                toast.success('登录成功！');
                http.token = result.data.token;
                consts.userInfo = result.data;
                if (callback) {
                    callback(result.data);
                }
            }, () => {
                toast.error('登录失败，请检查账号或密码');
            })
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

    getProjectList(data, callback) {
        http.getRequest('/api/projects', data,
            (result) => {
                if (callback) {
                    callback(result.data)
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

    queryProjectApi(data, success, fault) {
        http.getRequest('/api/projects', data, success, fault);
    },

    createUserApi(data, callback) {
        http.postRequest('/api/users', data,
            () => {
                if (callback) {
                    callback();
                }
            }
            , code => {
                let msg = '创建失败，请稍后重试';
                switch (code) {
                    case 404:
                        msg = '参数错误';
                        break;
                    case 425:
                        msg = '手机号已存在';
                        break;
                    case 426:
                        msg = '邮箱已存在';
                        break;
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

    createTask(sprintId, data, callback) {
        let url = '/api/projects/sprints/' + sprintId + '/tasks';
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

    getProjectMemberList(projectId, callback) {
        http.getRequest('/api/projects/' + projectId + '/members', {},
            result => {
                if (callback) {
                    callback(result.data, result.meta.roles);
                }
            }, () => {
                toast.error('获取列表失败')
            })
    },

    updateProjectMemberRole(projectId, userId, roleId, callback) {
        let url = '/api/projects/' + projectId + '/members/' + userId + '/roles/' + roleId;
        http.postRequest(url, {},
            result => {
                if (callback) {
                    callback(result.data, result.meta.roles);
                }
            }, () => {
                toast.error('添加失败')
            });
    },
    deleteProjectMember(projectId, userId, callback) {
        let url = '/api/projects/' + projectId + '/members/' + userId;
        http.deleteRequest(url, {},
            result => {
                if (callback) {
                    callback(result.data, result.meta.roles);
                }
            }, () => {
                toast.error('删除失败')
            });
    },
    moveTaskToSprint(taskId, sprintId, callback) {
        let url = "/api/projects/sprints/tasks/" + taskId + "/movement/sprints/" + sprintId;
        http.patchRequest(url, {},
            result => {
                if(callback){
                    callback(result.data);
                }
            })
    }

}