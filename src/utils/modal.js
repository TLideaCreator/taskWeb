import {events} from './index'
export default{
    addModalListener(callback){
        events.$off('modalEventListener');
        events.$on('modalEventListener', ({flag, modal})=>{
            if(callback){
                callback({flag, modal})
            }
        })
    },
    confirm(modal){
       events.$emit('modalEventListener', {flag:true ,modal :modal})
    },
    dismiss(){
        events.$emit('modalEventListener', {flag: false, modal: null})
    }
}
