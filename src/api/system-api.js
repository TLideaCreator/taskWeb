import {http} from '@/utils';

export default {
    getDefaultProjectTemplate(callback) {
        http.getRequest('/api/system/template', {},
            result => {
                if(callback){
                    callback(result.data);
                }
            })
    }
}