import {events} from './index';

export default{
    addNoticeListener(callback){
        events.$off('toast');
        events.$on('toast',(toast)=>{
            if (callback){
                callback(toast);
            }
        })
    },
    success(msg){
        let toast = {
            color: 'light-green accent-3',
            msg: msg
        };
        events.$emit('toast', toast)
    },
    info(msg){
        let toast = {
            color: 'light-blue darken-1',
            msg: msg
        };
        events.$emit('toast', toast)
    },
    error(msg){
        let toast = {
            color: 'deep-orange darken-1',
            msg: msg
        };
        events.$emit('toast', toast)
    }
}
