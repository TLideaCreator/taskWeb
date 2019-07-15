import {consts} from '@/utils'

export default {
    fullHeight() {
        return consts.contentHeight;
    },
    getRecentProject(state){
        return state.lastUpdateProjects.slice(0,4);
    },
    getProjectListTitle() {
        return [
            {
                span: 6, name: '名称'
            },
            {
                span: 6, name: '管理员'
            },
            {
                span: 6, name: '当前冲刺'
            },
            {
                span: 6, name: '操作'
            },
        ];
    }
}
