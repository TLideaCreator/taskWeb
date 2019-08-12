import api from '@/api';
import {consts} from '@/utils';

function reloadMembers(taskList, userId) {
    let memberRow = {};
    taskList.forEach((item) => {
        if (item && item.executor && item.executor.data) {
            let memberId = item.executor.data.id;
            if (!memberRow[memberId]) {
                if (userId === memberId) {
                    memberRow[memberId] =
                        {id: memberId, name: '我的', checked: false};
                } else {
                    if (consts.stringIsEmptyWithTrim(memberId)) {
                        memberRow[''] =
                            {id: '', name: '未指派', checked: false};
                    } else {
                        memberRow[memberId] =
                            {id: item.executor.data.id, name: item.executor.data.name, checked: false}
                    }
                }

            }
        } else {
            memberRow[''] =
                {id: '', name: '未指派', checked: false};
        }

    });
    return memberRow;
}

export default {
    state: {
        taskList: [],
        members: {},
        selectedMembers: [],
        sprintList: [],
        taskTypes: [],
        taskPriorities: [],
        searchKey: '',
        activeSprint: false
    },
    actions: {
        getProjectSprintList({commit, rootState}, projectId) {
            api.sprint.getSprintList(projectId, null, (sprints, meta) => {
                commit('updateSprintList', sprints);
                commit('updateTaskTypeList', meta.types);
                commit('updateTaskPrioritiesList', meta.priorities);
                let taskList = [];
                for (let i = 0; i < sprints.length; i++) {
                    if (sprints[i].status === 1) {
                        commit('updateActiveSprint', true);
                    }
                    taskList.push(...sprints[i].tasks.data);
                }
                commit('updateSprintTaskList', taskList);
                commit('updateMembers', reloadMembers(taskList, rootState.userInfo.id))
            });
        }
    },
    mutations: {
        updateTaskTypeList(state, taskTypes) {
            state.taskTypes = taskTypes;
        },
        updateTaskPrioritiesList(state, taskPriorities) {
            state.taskPriorities = taskPriorities;
        },
        updateSprintList(state, sprints) {
            state.sprintList = sprints;
        },
        updateActiveSprint(state, flag) {
            state.activeSprint = flag;
        },
        updateSprintTaskList(state, tasks) {
            state.taskList = tasks;
        },
        updateMembers(state, members) {
            state.members = members;
        },
        addSprintItem(state, sprintItem) {
            state.sprintList.push(sprintItem);
        },
        updateSearchKey(state, searchKey){
            state.searchKey = searchKey
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

            state.members = reloadMembers(state.taskList);
        },
        updateSelectedMembers(state, memberId){
            state.members[memberId].checked = !state.members[memberId].checked;
            if (!state.members[memberId].checked) {
                let index = state.selectedMembers.indexOf(memberId);
                state.selectedMembers.splice(index, 1);
            } else {
                state.selectedMembers.push(memberId);
            }
        }
    },
    getters: {
        getSprintTaskList: (state) => (sprintId) => {
            return [
                ...state.taskList.filter(item => {
                    let exeid = item.executor && item.executor.data && item.executor.data.id ? item.executor.data.id :'';
                    let memberFilter = state.selectedMembers.length === 0 ? true: state.selectedMembers.indexOf(exeid)>=0;
                    let searchFilter = consts.stringIsEmptyWithTrim(state.searchKey) ? true: item.title.indexOf(state.searchKey)>=0 || item.desc.indexOf(state.searchKey) >=0;
                    return memberFilter && searchFilter && item.sprint_id === sprintId
                })
            ];
        },
        getSprintList(state) {
            return state.sprintList.sort((a, b) => {
                if (a.status !== b.status) {
                    return b.status - a.status;
                } else {
                    return b.name - a.name
                }
            });
        },
        getActiveSprint(state) {
            return state.activeSprint;
        },
        getTaskTypes(state) {
            return state.taskTypes;
        },

        getTaskPriorities(state) {
            return state.taskPriorities;
        },
        getMemberList(state) {
            return Object.values(state.members);
        }
    }
}
