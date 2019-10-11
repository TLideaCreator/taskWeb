import {toast, loading} from '@/utils';
import http from '../http'

export default {
    getProjectDocCatalog(projectId, callback) {
        loading.start();
        http.getRequest(`api/projects/${projectId}/docs`, {},
            result => {
                if(callback){
                    callback(result.data);
                }
                loading.finish();
            }, () => {
                if(callback){
                    callback();
                }
                loading.error();
                toast.error('获取项目文档目录失败')
            })
    }
}