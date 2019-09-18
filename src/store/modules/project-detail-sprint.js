import api from '@/api';
import {consts} from "@/utils";
export default {
    namespaced:true,
    state:{
        sprint: {},
        taskList:[],
        typeList: [],
        prioritiesList: [],
        statusList: [],
        members: {},
        selectedMembers: [],
        searchKey: ''
    },
    actions:{
        getProjectActiveSprint({state,commit,rootState},projectId){
            api.sprint.getSprintList(projectId, 'active', (sprints, meta) => {
                if (sprints && sprints.length > 0) {
                    commit('updateSprint',sprints[0]);
                }
                commit('updateTaskMembers',consts.reloadTaskListMembers(state.taskList,rootState.userInfo.id));
                commit('updateStatusList', meta.status);
                commit('updatePrioritiesList', meta.priorities);
                commit('updateTypesList', meta.types);
            })
        },
        sprintFinish({state,commit}, callback){
            let sprint = consts.objectCopy(state.sprint);
            api.sprint.sprintFinish(sprint, () => {
                commit('updateSprint',{});
                if(callback){
                    callback();
                }
            })
        },
        updateTaskStatus({commit},{task, statusId}){
            let taskItem = consts.objectCopy(task);
            if(taskItem.status === statusId){
                return;
            }
            taskItem.status = statusId;
            api.task.updateTaskInfo(taskItem, item=>{
                commit('updateTaskListChange', item);
            });
        }
    },
    mutations:{
        updateTaskListChange(state, task){
            let index = -1;
            for (let i = 0; i < state.taskList.length; i++) {
                if (state.taskList[i].id === task.id) {
                    index = i;
                }
            }
            if (index !== -1) {
                state.taskList.splice(index, 1);
                state.taskList.splice(index, 0, task);
            } else {
                state.taskList.push(task);
            }
        },
        updateSprint(state, sprint){
            state.sprint = sprint;
            if(sprint.tasks && sprint.tasks.data){
                state.taskList = sprint.tasks.data;
            }else{
                state.taskList = [];
            }
        },
        updateTaskMembers(state, members){
            state.members = members;
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
        updateSelectedMembersList(state, memberId){
            state.members[memberId].checked = !state.members[memberId].checked;
            if (!state.members[memberId].checked) {
                let index = state.selectedMembers.indexOf(memberId);
                state.selectedMembers.splice(index, 1);
            } else {
                state.selectedMembers.push(memberId);
            }
        },
        updateSearchKey(state, key){
            state.searchKey = key ;
        }
    },
    getters:{
        getStatusTaskList:(state)=>(statusId)=>{
            return state.taskList.filter(item => {
                let exeId = item.executor && item.executor.data && item.executor.data.id ? item.executor.data.id :'';
                let search = consts.stringIsEmptyWithTrim(state.searchKey)? true :
                    (item.title.indexOf(state.searchKey) >=0 || item.desc.indexOf(state.searchKey) >= 0);
                let memberIn = state.selectedMembers.length > 0 ? state.selectedMembers.indexOf(exeId)>=0 : true;
                return search && memberIn && item.status === statusId
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
        getMembersList(state){
            return Object.values(state.members);
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
