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
    get templateMenu(){
        return [
            {
                icon: 'arrow_back',
                title: '模板列表',
                path: 'dashTemps'
            },
            {
                icon: 'layers',
                title: '模板详情',
                path: 'templateDetail'
            },
            {
                icon: 'person',
                title: '任务角色',
                path: 'templateRoles'
            },
            {
                icon: 'insert_chart_outlined',
                title: '任务状态',
                path: 'templateStatus'
            },
            {
                icon: 'storage',
                title: '任务类型',
                path: 'templateTypes'
            },
            {
                icon: 'format_line_spacing',
                title: '任务优先级',
                path: 'templatePriorities'
            }
        ]
    },
    get projectSettingMenu(){
        return consts.objectCopy(projectSettingMenu)
    },

    get dashboardMenu(){
        return [
            {
                icon: 'assignment',
                title: '总述',
                path: 'adminDash'
            },
            {
                icon: 'view_day',
                title: '项目列表',
                path: 'dashProjects'
            },
            {
                icon: 'contacts',
                title: '人员列表',
                path: 'dashUsers'
            },
            {
                icon: 'style',
                title: '项目模板',
                path: 'dashTemps'
            },
        ];
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
