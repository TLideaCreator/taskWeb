import {http, toast, loading} from '@/utils'

export default {
    getTemplateDetail(templateId, callback) {
        loading.start();
        http.getRequest('/api/system/template/' + templateId, {},
            result => {
                if(callback){
                    callback(result.data)
                }
                loading.finish();
            }, () => {
                toast.error('获取模板详情失败');
                loading.error();
            })
    }
}