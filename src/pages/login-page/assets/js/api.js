import {http} from '@/utils';

export function loginIn (data, success, fault) {
    http.postRequest('/api/user/login', data, success, fault);
}
