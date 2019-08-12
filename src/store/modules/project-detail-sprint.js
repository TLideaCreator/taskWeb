export default {
    state:{
        taskList:[]
    },
    actions:{},
    mutations:{},
    getters:{
        getStatusTaskList:(state)=>(statusId)=>{
            return state.taskList.filter(item => {
                return item.status = statusId
            });
        }

    }
}
