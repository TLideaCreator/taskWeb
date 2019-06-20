import {consts} from '@/utils'
export default {
    ruleValidate() {
        return {
            description: [
                {required: true, message: '任务内容不能为空', trigger: 'blur'}
            ],
            startTime: [
                {required: true, message: '请选择开始时间', trigger: 'blur'}
            ],
            endTime: [
                {required: true, message: '请选择结束时间', trigger: 'blur'}
            ],
            taskType: [
                {required: true, message: '请选择任务类型', trigger: 'blur'}
            ],
            priority: [
                {required: true, message: '请选择优先级', trigger: 'blur'}
            ],
            principal: [
                {required: true, message: '请输入责任人', trigger: 'blur'}
            ],
            status: [
                {required: true, message: '请选择状态', trigger: 'change'}
            ],
        }
    },
    getTaskListByStatus: (state) => (status) => {
        return [
            ...state.taskList.filter(task => {
                let memberFilter = state.selectedMembers.length === 0 ? true: state.selectedMembers.indexOf(task.exe_id)>=0;
                let searchFilter = consts.stringIsEmptyWithTrim(state.searchKey) ? true: task.title.indexOf(state.searchKey)>=0 || task.desc.indexOf(state.searchKey) >=0
                return task.status === status.id && memberFilter && searchFilter
            })
        ];
    },
    getMemberInTasks(state){
        return state.memberList;
    },
    getCurColMaxHeight(state) {
        let maxTaskCount = 0;
        for (let i=0;i< state.statusList.length;i++){
            let status =  state.statusList[i];
            let count = state.taskList.filter(task=>{
                let memberFilter = state.selectedMembers.length === 0 ? true: state.selectedMembers.indexOf(task.exe_id)>=0;
                let searchFilter = consts.stringIsEmptyWithTrim(state.searchKey) ? true: task.title.indexOf(state.searchKey)>=0 || task.desc.indexOf(state.searchKey) >=0;
                return task.status === status.id && memberFilter && searchFilter
            }).length;
            if(count > maxTaskCount){
                maxTaskCount = count
            }
        }
        return maxTaskCount * 70 + (maxTaskCount-1)*5;
    },
    getStatusList(state){
        return state.statusList;
    },
    getTaskTypeList(state){
        return state.taskTypeList;
    } ,
    getTaskPriorityList(state){
        return state.taskPriorityList;
    }
}
