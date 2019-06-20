import {http} from '@/utils';

export function createUserApi (ref,success, fault) {
    http.postRequest('/api/users',ref,success,fault);
}

export function queryUserList (ref, success, fault) {
    http.getRequest('/api/users',ref,success,fault);
}

export function updateUser (ref,success, fault) {
    http.patchRequest('/api/users/'+ref.userId,ref,success,fault);
}
