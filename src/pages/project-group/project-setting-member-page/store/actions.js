import {router} from '@/utils';
import api from '@/api';
export default {
    loadProjectMembers({commit}) {
        let projectId = router.currentRoute.params.id;
        api.projectSetting.getProjectMemberList(projectId, (members, roles)=>{
            commit('updateMemberList', members);
            commit('updateRoleList', roles);
        });
    },
    initPage({commit, dispatch}, height) {
        commit('updateScrollerHeight', height);
        dispatch('loadProjectMembers');
    },
    memberRoleChanged({commit}, {member, roleId}) {
        let projectId = router.currentRoute.params.id;

        if (roleId === '-1') {
            api.projectSetting.deleteProjectMember(projectId, member.user_id,
                (members, roles)=>{
                    commit('updateMemberList', members);
                    commit('updateRoleList', roles);
                });
        } else {
            api.projectSetting.updateProjectMemberRole(projectId, member.user_id, roleId,
                (members, roles)=>{
                    commit('updateMemberList', members);
                    commit('updateRoleList', roles);
                });
        }
    }
}
