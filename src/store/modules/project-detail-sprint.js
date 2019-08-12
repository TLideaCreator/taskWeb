export default {
    state:{
        taskList:[],

    },
    actions:{},
    mutations:{
        updateStatusTaskList(state,tasks){
            state.taskList = tasks;
        }
    },
    getters:{
        getStatusTaskList:(state)=>(statusId)=>{
            return state.taskList.filter(item => {
                return item.status = statusId
            });
        }

    }
}
