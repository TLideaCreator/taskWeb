import {consts} from './index'

let menus = [
    {
        title: '任务库',
        path: 'projectBlock',
        icon: 'inbox'
    },
    {
        title: '进行中',
        path: 'projectSprint',
        icon: 'all_inbox'
    },
    {
        title: '项目报告',
        path: 'projectReport',
        icon: 'import_contacts'
    },
    {
        title: '部署计划',
        path: 'projectDeploy',
        icon: 'web_asset'
    },
    {
        title: '项目文档',
        path: 'projectDoc',
        icon: 'local_library'
    },

];

let pMenuMgr = {
    title: '项目设置',
    path: 'projectSettings',
    icon: 'tune',
    type: 'more'
};

let projectSettingMenu = [
    {
        icon: 'arrow_back',
        title: '返回',
        path: 'projectBlock'
    },
    {
        icon: 'book',
        title: '项目详情',
        path: 'projectSettingsDetail'
    },
    {
        icon: 'people',
        title: '项目成员',
        path: 'projectSettingsMembers'
    },
    {
        icon: 'link',
        title: '集成',
        path: 'projectSettingsWebHook'
    },
    {
        icon: 'style',
        title: '任务类型',
        path: 'projectSettingsTypes'
    },
    {
        icon: 'portrait',
        title: '任务角色',
        path: 'projectSettingsRoles'
    },
    {
        icon: 'poll',
        title: '任务优先级',
        path: 'projectSettingsPriorities'
    },
    {
        icon: 'beenhere',
        title: '任务状态',
        path: 'projectSettingsStatus'
    },
];

export default {
    get menus() {
        return consts.objectCopy(menus);
    },
    get projectSettingMenu(){
        return consts.objectCopy(projectSettingMenu)
    },
    pMenuMgr,
    getProjectMenu(projectMgr, userInfo) {
        let projectMenu = consts.objectCopy(menus);
        if (projectMgr.id === userInfo.id) {
            projectMenu.push(pMenuMgr);
        }
        return projectMenu;
    }
}
