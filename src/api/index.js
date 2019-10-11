import user from './user-api';
import task from './task-api/task-api';
import taskComment from './task-api/task-comment-api';
import sprint from './project-api/sprint-api';
import project from './project-api/project-api';
import template from './template-api/index';
import projectSetting from './project-setting-api/index';
import projectDoc from './project-api/docs-api';
import system from './system-api/index';
import http from './http'
import {stringIsEmpty, storage} from '@/utils';

function init() {
    http.apiHost = process.env.VUE_APP_API_HOST;
    let token = storage.get('auth-key');
    if (!stringIsEmpty(token)) {
        http.token = token;
    }
}

function setToken(token) {
    http.token = token;
}

export default {
    init,
    setToken,
    user,
    task,
    taskComment,
    sprint,
    system,
    project,
    template,
    projectSetting,
    projectDoc
}
