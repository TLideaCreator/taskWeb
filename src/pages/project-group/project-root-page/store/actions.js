import {consts, events, router} from '@/utils'
import api from '@/api'

export default {
    initEvents({commit}) {
        events.$off('menuClickTrigger');
        events.$on('menuClickTrigger', () => {
            commit('updateMenuState');
        });
        events.$off('updateScreenSize');
        events.$on('updateScreenSize', () => {
            commit('updateContentWidth');
        });
        commit('updateUserInfo', consts.userInfo);
    },

    loadProjectInfo({state, commit}) {
        api.project.getProjectDetailApi(state.projectId,
            result => {
                commit('updateProjectInfo', result);
                if (router.currentRoute.name === 'project-group') {
                    router.replace(
                        {
                            name: 'project-working'
                        }
                    );
                }
            });
    },

    loadProjectList({commit}) {
        api.project.getLastUpdateProject((projectList)=>{
            commit('updateRecentProjects', projectList);
        });
    },

    clickToGo(_, path) {
        router.replace({name: path})
    }
}
