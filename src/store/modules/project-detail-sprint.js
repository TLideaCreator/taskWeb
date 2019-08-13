import api from '@/api';
export default {
    state:{
        sprint: {},
        taskList:[],
        typeList: [],
        prioritiesList: [],
        statusList: [],
    },
    actions:{
        getProjectActiveSprint({commit},projectId){
            api.sprint.getSprintList(projectId, 'active', (sprints, meta) => {
                if (sprints && sprints.length > 0) {
                    commit('updateSprint',sprints[0]);
                    commit('updateStatusList', meta.status);
                    commit('updatePrioritiesList', meta.priorities);
                    commit('updateTypesList', meta.types);
                }
            })
        }
    },
    mutations:{
        updateSprint(state, sprint){
            state.sprint = sprint;
            if(sprint.tasks && sprint.tasks.data){
                state.taskList = sprint.tasks.data;
            }
        },
        updateStatusList(state, status){
            state.statusList = status;
        },
        updatePrioritiesList(state, priorities){
            state.prioritiesList = priorities;
        },
        updateTypesList(state, types){
            state.typeList = types;
        },
    },
    getters:{
        getStatusTaskList:(state)=>(statusId)=>{
            return state.taskList.filter(item => {
                return item.status = statusId
            });
        },
        getSprintItem(state){
            return state.sprint;
        },
        getPrioritiesList:(state)=>(priority)=>{
            let priorities = state.prioritiesList.filter(item=>{
                return item.id === priority;
            });
            if(priorities && priorities.length > 0){
                return priorities[0];
            }
            return {};
        },
        getStatusList(state){
            return  state.statusList;
        },
        getTypeList:(state)=>(type)=>{
            let types = state.typeList.filter(item=>{
                return item.id === type;
            });
            if(types && types.length > 0){
                return types[0].icon
            }
            return ''
        }

    }
}
