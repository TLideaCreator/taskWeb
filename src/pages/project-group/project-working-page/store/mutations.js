import {consts} from '@/utils'

export default {
    updateTaskList(state, taskList){
        state.taskList = taskList;
        let memberRow = {};
        taskList.forEach((item) => {
            if (!memberRow[item.exe_id]) {
                if (consts.userInfo.id === item.exe_id) {
                    memberRow[item.exe_id] =
                        {id: item.exe_id, name: '我的', checked: false};
                } else {
                    if (consts.stringIsEmptyWithTrim(item.exe_id)) {
                        memberRow[''] =
                            {id: '', name: '未指派', checked: false};
                    } else {
                        memberRow[item.exe_id] =
                            {id: item.executor.data.id, name: item.executor.data.name, checked: false}
                    }
                }

            }
        });
        state.memberList = memberRow;
    },

    updateMemberChecked(state,userId){
        state.memberList[userId].checked = !state.memberList[userId].checked;
        if(!state.memberList[userId].checked){
            let index = state.selectedMembers.indexOf(userId);
            state.selectedMembers.splice(index,1);
        }else{
            state.selectedMembers.push(userId);
        }
    },
    updateTaskChanged(state, task){
        let index = 0;
        for(let i=0;i<state.taskList.length; i++){
            if(state.taskList[i].taskId === task.taskId){
                index = i;
            }
        }
        state.taskList.splice(index,1);
        state.taskList.splice(index,0,task);
    },
    updateSprintItem(state, sprint){
        state.sprintItem = sprint;
    },
    updateSearchKey(state,key){
        state.searchKey = key;
    },
    cleanCache(state){
        state.taskList=[];
        state.memberList=[];
        state.selectedMembers=[];
        state.searchKey='';
    },

    updateMeta(state, meta){
        state.statusList = meta.status;
        state.taskTypeList = meta.types;
        state.taskPriorityList = meta.priorities;
    }
}
