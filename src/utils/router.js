import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            component: () => import('@/pages/not-found-page/not-found-page.vue')
        },
        {
            path: '/',
            name: 'userLoginPage',
            component: () => import('@/pages/login-page/login-page.vue')
        },
        {
            path: '/projects',
            name: 'userProjectPage',
            meta: {root: 'userProject'},
            component: () => import('@/pages/dash-project-page/dash-project-page.vue')
        },
        {
            path: '/dash',
            redirect: '/dash/board',
            component: () => import('@/pages/admin-dash-root/admin-dash-root.vue'),
            children: [
                {
                    path: 'board',
                    name: 'adminBoardPage',
                    meta: {root: 'adminBoard'},
                    component: () => import('@/pages/admin-dash-root/admin-board-page.vue'),
                },
                {
                    path: 'users',
                    name: 'adminBoardUsersPage',
                    meta: {root: 'adminBoard'},
                    component: () => import('@/pages/admin-dash-root/admin-board-users.vue'),
                },
                {
                    path: 'projects',
                    name: 'adminBoardProjectsPage',
                    meta: {root: 'adminBoard'},
                    component: () => import('@/pages/admin-dash-root/admin-board-project.vue'),
                },
                {
                    path: 'templates',
                    name: 'adminBoardTemplatePage',
                    meta: {root: 'adminBoard'},
                    component: () => import('@/pages/admin-dash-root/admin-board-template.vue'),
                },
            ]
        },
        {
            path: '/dash/template/:templateId',
            redirect: '/dash/template/:templateId/detail',
            component: () => import('@/pages/admin-template-root/admin-template-root.vue'),
            props: true,
            children: [
                {
                    path: 'detail',
                    name: 'systemTempDetailPage',
                    meta: {root: 'systemTemp'},
                    component: () => import('@/pages/admin-template-root/admin-template-detail.vue'),
                    props: true,
                },
                {
                    path: 'priorities',
                    name: 'systemTempPriorityPage',
                    meta: {root: 'systemTemp'},
                    component: () => import('@/pages/admin-template-root/admin-template-priorities.vue'),
                    props: true,
                },
                {
                    path: 'types',
                    name: 'systemTempTypePage',
                    meta: {root: 'systemTemp'},
                    component: () => import('@/pages/admin-template-root/admin-template-types.vue'),
                    props: true,
                },
                {
                    path: 'status',
                    name: 'systemTempStatusPage',
                    meta: {root: 'systemTemp'},
                    component: () => import('@/pages/admin-template-root/admin-template-status.vue'),
                    props: true,
                },
                {
                    path: 'roles',
                    name: 'systemTempRolePage',
                    meta: {root: 'systemTemp'},
                    component: () => import('@/pages/admin-template-root/admin-template-roles.vue'),
                    props: true,
                }
            ]
        },

        {
            path: '/project/:projectId',
            redirect: '/project/:projectId/block',
            component: () => import('@/pages/project-detail-root/project-detail-root.vue'),
            props: true,
            children: [
                {
                    path: 'block',
                    name: 'projectDetailBlockPage',
                    meta: {root: 'projectDetail'},
                    component: () => import('@/pages/project-detail-root/project-detail-block.vue'),
                    props: true,
                },
                {
                    path: 'deploy',
                    name: 'projectDetailDeployPage',
                    meta: {root: 'projectDetail'},
                    component: () => import('@/pages/project-detail-root/project-detail-deploy.vue'),
                    props: true,
                },
                {
                    path: 'doc',
                    name: 'projectDetailDocPage',
                    meta: {root: 'projectDetail'},
                    component: () => import('@/pages/project-detail-root/project-detail-doc.vue'),
                    props: true,
                },
                {
                    path: 'report',
                    name: 'projectDetailReportPage',
                    meta: {root: 'projectDetail'},
                    component: () => import('@/pages/project-detail-root/project-detail-report.vue'),
                    props: true,
                },
                {
                    path: 'sprint',
                    name: 'projectDetailSprintPage',
                    meta: {root: 'projectDetail'},
                    component: () => import('@/pages/project-detail-root/project-detail-sprint.vue'),
                    props: true,
                },
                {
                    path: 'tasks',
                    name: 'projectDetailTaskPage',
                    meta: {root: 'projectDetail'},
                    component: () => import('@/pages/project-detail-root/project-detail-root.vue'),
                    props: true,
                },
                {
                    path: 'tasks/:taskId',
                    name: 'projectDetailTaskDetailPage',
                    meta: {root: 'projectDetail'},
                    component: () => import('@/pages/project-detail-root/project-task-detail.vue'),
                    props: true,
                }
            ]
        },
        {
            path: '/project/:projectId/settings',
            redirect: '/project/:projectId/settings/detail',
            component: () => import('@/pages/project-settings-root/project-settings-root.vue'),
            props:true,
            children: [
                {
                    path: 'detail',
                    name: 'projectSettingsDetailPage',
                    meta: {root: 'projectSettings'},
                    component: () => import('@/pages/project-settings-root/project-setting-detail.vue'),
                    props: true,
                },
                {
                    path: 'members',
                    name: 'projectSettingsMembersPage',
                    meta: {root: 'projectSettings'},
                    component: () => import('@/pages/project-settings-root/project-setting-members.vue'),
                    props: true,
                },
                {
                    path: 'webhook',
                    name: 'projectSettingsWebHookPage',
                    meta: {root: 'projectSettings'},
                    component: () => import('@/pages/project-settings-root/project-setting-web-hook.vue'),
                    props: true,
                },
                {
                    path: 'priorities',
                    name: 'projectSettingsPriorityPage',
                    meta: {root: 'projectSettings'},
                    component: () => import('@/pages/project-settings-root/project-setting-priorities.vue'),
                    props: true,
                },
                {
                    path: 'roles',
                    name: 'projectSettingsRolePage',
                    meta: {root: 'projectSettings'},
                    component: () => import('@/pages/project-settings-root/project-setting-roles.vue'),
                    props: true,
                },
                {
                    path: 'status',
                    name: 'projectSettingsStatusPage',
                    meta: {root: 'projectSettings'},
                    component: () => import('@/pages/project-settings-root/project-setting-status.vue'),
                    props: true,
                },
                {
                    path: 'types',
                    name: 'projectSettingsTypePage',
                    meta: {root: 'projectSettings'},
                    component: () => import('@/pages/project-settings-root/project-setting-types.vue'),
                    props: true,
                }
            ]
        }
    ]
})
