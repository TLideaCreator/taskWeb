import {consts} from "@/utils"
export default {
    updateSearchKey(state, val){
        state.searchKey = val;
    },
    updateScrollerHeight(state, height){
        state.scrollerHeight = consts.scrollerHeight(height, 44);
    },
    updateProjectId(state, projectId){
        state.projectId= projectId
    },
    updateMemberList(state, memberList){
        state.memberList = memberList;
    },
    updateRoleList(state, roleList){
        state.roleList = roleList
    },
    updateMemberRole(_,{member , roleId}){
        member.roleId = roleId;
    }

}
