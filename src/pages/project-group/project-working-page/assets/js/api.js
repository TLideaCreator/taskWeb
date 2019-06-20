import {http} from '@/utils';

export function queryProject (data,success, fault) {
    http.getRequest('/api/projects', data, success, fault);
}
export function queryTask (data, success, fault) {
    http.getRequest('/api/projects/'+ data.projectId +'/tasks', data, success, fault);
}
export function addTasks (data, success, fault) {
    http.postRequest('/api/projects/'+ data.projectId +'/tasks', data, success, fault);
}
export function updateTasks (data, success, fault) {
    http.patchRequest('/api/projects/'+ data.projectId +'/tasks/'+data.taskId, data, success, fault);
}
export function deleteTask (data, success, fault) {
    http.deleteRequest('/api/projects/tasks/'+data.taskId, data, success, fault);
}
export function getProjectMembers (projectId, success, fault) {
    http.getRequest('/api/projects/'+projectId+'/members', {}, success, fault);
}
