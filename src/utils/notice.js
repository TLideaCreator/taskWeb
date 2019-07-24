import {events} from './index'
export default{
    addNoticeListener(callback){
        events.$off('notice');
        events.$on('notice',(notice)=>{
            if (callback){
                callback(notice);
            }
        })
    },
    success(msg){
        let notice = {
            type: 'success',
            msg: msg
        };
        events.$emit('notice', notice)
    },
    info(msg){
        let notice = {
            type: 'info',
            msg: msg
        };
        events.$emit('notice', notice)
    },
    error(msg){
        let notice = {
            type: 'error',
            msg: msg
        };
        events.$emit('notice', notice)
    }
}
