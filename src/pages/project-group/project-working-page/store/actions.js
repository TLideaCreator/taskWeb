import {router, modal} from "@/utils";
import api from '@/api';
export default {
    loadTaskListInSprint({commit}) {
        let projectId = router.currentRoute.params.id;
        api.sprint.getSprintList(projectId, 'active', (result, meta)=>{
            if(result.length === 1){
                commit('updateSprintItem', result[0]);
                commit('updateTaskList', result[0].tasks.data);
            }else{
                commit('updateSprintItem',{});
                commit('updateTaskList', []);
            }
            commit('updateMeta',meta);
        });
    },
    updateTaskStatus(_, task) {
        let taskItem = task.$event.task;
        let status = task.stats;
        if(taskItem.status === status.id){
            return;
        }
        taskItem.status = status.id;
        api.task.updateTaskInfo(taskItem);
    },
    finishSprint({state,dispatch}){
        modal.confirm(
            {
                title: '提示',
                content: '您正在结束冲刺，未完成的任务将会移动到未分配中并将未完成任务重置为待开发，点击确认结束冲刺',
                okText: '确认',
                cancelText: '取消',
                onOk: ()=>{
                   api.sprint.sprintFinish(state.sprintItem, ()=>{
                       dispatch('loadTaskListInSprint')
                   })
                }
            }
        );

    }
}
