import {consts} from './index'

let menus = [
    {
        title: '任务库',
        path: 'projectDetailBlockPage',
        icon: 'inbox'
    },
    {
        title: '进行中',
        path: 'projectDetailSprintPage',
        icon: 'all_inbox'
    },
    {
        title: '项目报告',
        path: 'projectDetailReportPage',
        icon: 'import_contacts'
    },
    {
        title: '部署计划',
        path: 'projectDetailDeployPage',
        icon: 'web_asset'
    },
    {
        title: '项目文档',
        path: 'projectDetailDocPage',
        icon: 'local_library'
    },

];

let pMenuMgr = {
    title: '项目设置',
    path: 'projectSettingsDetailPage',
    icon: 'tune',
    type: 'more'
};

let projectSettingMenu = [
    {
        icon: 'arrow_back',
        title: '返回',
        path: 'projectDetailBlockPage'
    },
    {
        icon: 'book',
        title: '项目详情',
        path: 'projectSettingsDetailPage'
    },
    {
        icon: 'people',
        title: '项目成员',
        path: 'projectSettingsMembersPage'
    },
    {
        icon: 'link',
        title: '集成',
        path: 'projectSettingsWebHookPage'
    },
    {
        icon: 'style',
        title: '任务类型',
        path: 'projectSettingsTypePage'
    },
    {
        icon: 'portrait',
        title: '任务角色',
        path: 'projectSettingsRolePage'
    },
    {
        icon: 'poll',
        title: '任务优先级',
        path: 'projectSettingsPriorityPage'
    },
    {
        icon: 'beenhere',
        title: '任务状态',
        path: 'projectSettingsStatusPage'
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
                path: 'adminBoardTemplatePage'
            },
            {
                icon: 'layers',
                title: '模板详情',
                path: 'systemTempDetailPage'
            },
            {
                icon: 'person',
                title: '任务角色',
                path: 'systemTempRolePage'
            },
            {
                icon: 'insert_chart_outlined',
                title: '任务状态',
                path: 'systemTempStatusPage'
            },
            {
                icon: 'storage',
                title: '任务类型',
                path: 'systemTempTypePage'
            },
            {
                icon: 'format_line_spacing',
                title: '任务优先级',
                path: 'systemTempPriorityPage'
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
                path: 'adminBoardPage'
            },
            {
                icon: 'view_day',
                title: '项目列表',
                path: 'adminBoardProjectsPage'
            },
            {
                icon: 'contacts',
                title: '人员列表',
                path: 'adminBoardUsersPage'
            },
            {
                icon: 'style',
                title: '项目模板',
                path: 'adminBoardTemplatePage'
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
    },
    getDrawerMenuList(routerName){
        if(!routerName){
            return [];
        }
        if(routerName.startsWith('projectDetail')) {
            return this.menus;
        }else if(routerName.startsWith('projectSettings')){
            return this.projectSettingMenu;
        }else if(routerName.startsWith('adminBoard')){
            return this.dashboardMenu;
        }else if(routerName.startsWith('systemTemp')){
            return this.templateMenu;
        }else {
            return [];
        }
    }
}
