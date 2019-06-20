import {consts} from '@/utils'

let defaultMenuList = [
    {
        title: '',
        menuList: [
            {
                title: '任务库',
                path: 'project-tasks',
                icon: 'md-filing',
                signType: ''
            },
            {
                title: '进行中',
                path: 'project-working',
                icon: 'md-albums',
                signType: ''
            },
            {
                title: '项目报告',
                path: 'project-stats',
                icon: 'md-stats',
                signType: 'next'
            },
        ],
    },
    {
        title: '',
        menuList: [
            {
                title: '部署计划',
                path: 'project-deploy',
                icon: 'md-ribbon',
                signType: ''
            },
            {
                title: '项目文档',
                path: 'project-doc',
                icon: 'md-document',
                signType: ''
            },
            {
                title: '项目设置',
                path: 'project-setting',
                icon: 'md-options',
                signType: 'next'
            },
        ]
    }

];

let projectMenuList = [
    {
        title: '',
        menuList: [
            {
                title: '返回',
                path: 'project-tasks',
                icon: 'md-arrow-round-back',
                signType: ''
            }
        ]
    },
    {
        title: '项目设置',
        menuList: [
            {
                title: '项目设置',
                path: 'project-setting',
                icon: 'md-clipboard',
                signType: ''
            },
            {
                title: '人员管理',
                path: 'project-setting-member',
                icon: 'md-person',
                signType: ''
            },
            {
                title: '任务状态',
                path: 'project-setting-status',
                icon: 'md-stats',
                signType: ''
            },
            {
                title: '任务类型',
                path: 'project-setting-type',
                icon: 'md-barcode',
                signType: ''
            },
            {
                title: '任务优先级',
                path: 'project-setting-priority',
                icon: 'logo-buffer',
                signType: ''
            }
        ]
    }

];
export default {
    getContentStyle(state) {
        let marginLeft = 0;
        if (state.menuState) {
            marginLeft = 200;
        }
        let contentWidth = state.contentWidth - marginLeft;
        if (contentWidth < 800) {
            contentWidth = 800
        }
        return {
            width: contentWidth + 'px',
            marginLeft: marginLeft + 'px',
        };
    },
    getFullHeight() {
        return consts.contentHeight;
    },
    getMenuList(state) {
        if (state.activeName.includes('project-setting')) {
            return projectMenuList;
        } else {
            return defaultMenuList;
        }
    },
    getRecentProjects(state){
         return state.recentProjects.filter(item=>{
             return consts.stringIsEmptyWithTrim(state.projectKey)?true:item.projectName.indexOf(state.projectKey)>=0
         })
    },
    getProjectImg(state){
        if(state.projectInfo && state.projectInfo.icon){
            return require('../../../../assets/images/project/'+state.projectInfo.icon+'.png')
        }
        return '';
    }
}
