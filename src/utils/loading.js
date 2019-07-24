import {events} from "./index";

export default{
    addLoadingListener(callback){
        events.$off('loading');
        events.$on('loading', loading=>{
            if (callback){
                callback(loading)
            }
        })
    },

    start(){
        events.$emit('loading',{
            query:true,
            show: true,
            color: 'light-blue',
        })
    },

    finish(){
        events.$emit('loading',{
            show: false,
            query: false,
            color: 'light-blue',
            value: 100
        })
    },

    error(){
        events.$emit('loading',{
            show: false,
            query: false,
            color: 'pink',
            value: 100
        })
    }
}
