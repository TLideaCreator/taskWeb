import {consts} from "@/utils"

function reloadMembers(taskList) {
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
    return memberRow;
}

export default {
    updateSprintList(state, sprintList) {
        state.sprintList = sprintList;
        state.taskList = [];
        state.sprintList.forEach(sprint => {
            state.taskList = [...state.taskList, ...sprint.tasks.data];
        });

        state.memberList = reloadMembers(state.taskList);
    },
    updateMemberChecked(state, userId) {
        state.memberList[userId].checked = !state.memberList[userId].checked;
        if (!state.memberList[userId].checked) {
            let index = state.selectedMembers.indexOf(userId);
            state.selectedMembers.splice(index, 1);
        } else {
            state.selectedMembers.push(userId);
        }
    },
    updateSearchKey(state, key) {
        state.searchKey = key;
    },
    updateCreateTitle(state, title) {
        state.createTitle = title;
    },
    updateCreateLoading(state, val) {
        state.createLoading = val
    },
    updateInCreate(state, val) {
        state.inCreate = val
    },
    updateTaskChanged(state, task) {
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

        state.memberList = reloadMembers(state.taskList);
    },
    updateMeta(state, meta) {
        state.statusList = meta.status;
        state.taskTypeList = meta.types;
        state.taskPriorityList = meta.priorities;
    },

    cleanCache(state) {
        state.sprintList = [];
        state.taskList = [];
        state.memberList = [];
        state.selectedMembers = [];
        state.searchKey = '';
    }
}
