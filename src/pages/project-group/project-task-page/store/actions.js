import {router} from '@/utils';
import api from '@/api'

export default {

    loadProjectSprints({commit}) {
        let projectId = router.currentRoute.params.id;
        api.sprint.getSprintList(projectId, '', (sprintList, meta)=>{
            commit('updateMeta', meta);
            commit('updateSprintList', sprintList);
        })

    },

    createSprint({dispatch}) {
        let projectId = router.currentRoute.params.id;
        api.sprint.createSprint(projectId, ()=>{
            dispatch('loadProjectSprints')
        });
    },
    startSprint({dispatch}, sprint) {
        let projectId = router.currentRoute.params.id;
        api.sprint.makeSprintActive(projectId, sprint.id, ()=>{
            dispatch('loadProjectSprints')
        });
    },
    updateTaskSprint({commit}, {task, sprintId}) {
        api.task.moveTaskToSprint(task.id,sprintId, result=>{
            commit('updateTaskChanged', result)
        });
    }
}
