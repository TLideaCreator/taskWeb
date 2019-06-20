export default {
    updateMenuState(state) {
        state.menuState = !state.menuState;
    },
    updateUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },
    updateContentWidth(state){
        state.contentWidth = document.documentElement.clientWidth - 64;
    },
    updateProjectId(state, pid){
        state.projectId = pid;
    },
    updateProjectInfo(state, info){
        state.projectInfo = info
    },
    updateActiveName(state, name) {
        state.activeName = name;
    },
    updateRecentProjects(state, projectList){
        state.recentProjects = projectList;
    },
    updateProjectKey(state, projectKey){
        state.projectKey = projectKey;
    }
}
