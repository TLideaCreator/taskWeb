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
            component: () => import('@/pages/dash-project-page/dash-project-page.vue')
        },
        {
            path: '/dash',
            redirect: '/dash/board',
            children: [
                {
                    path: 'board',
                    name: 'adminBoardPage',
                    component: () => import('@/pages/admin-dash-root/admin-board-page.vue'),
                },
                {
                    path: 'users',
                    name: 'adminBoardUsersPage',
                    component: () => import('@/pages/admin-dash-root/admin-board-users.vue'),
                },
                {
                    path: 'projects',
                    name: 'adminBoardProjectsPage',
                    component: () => import('@/pages/admin-dash-root/admin-board-project.vue'),
                },
                {
                    path: '/dash/templates',
                    name: 'adminBoardTemplatePage',
                    component: () => import('@/pages/admin-dash-root/admin-board-template.vue'),
                },
            ]
        },
        {
            path: '/dash/template/:templateId',
            redirect: '/dash/template/:templateId/detail',
            children: [
                {
                    path: 'detail',
                    name: 'systemTempDetailPage',
                    component: () => import('@/pages/admin-template-root/admin-template-detail.vue'),
                    props: true,
                },
                {
                    path: 'priorities',
                    name: 'systemTempPriorityPage',
                    component: () => import('@/pages/admin-template-root/admin-template-priorities.vue'),
                    props: true,
                },
                {
                    path: 'types',
                    name: 'systemTempTypePage',
                    component: () => import('@/pages/admin-template-root/admin-template-types.vue'),
                    props: true,
                },
                {
                    path: 'status',
                    name: 'templateStatus',
                    component: () => import('@/pages/admin-template-root/admin-template-status.vue'),
                    props: true,
                },
                {
                    path: 'roles',
                    name: 'systemTempRolePage',
                    component: () => import('@/pages/admin-template-root/admin-template-roles.vue'),
                    props: true,
                }
            ]
        },

        {
            path: '/project/:projectId',
            redirect: '/project/:projectId/block',
            children: [
                {
                    path: 'block',
                    name: 'projectDetailBlockPage',
                    component: () => import('@/pages/project-detail-root/project-detail-block.vue'),
                    props: true,
                },
                {
                    path: 'deploy',
                    name: 'projectDetailDeployPage',
                    component: () => import('@/pages/project-detail-root/project-detail-deploy.vue'),
                    props: true,
                },
                {
                    path: 'doc',
                    name: 'projectDetailDocPage',
                    component: () => import('@/pages/project-detail-root/project-detail-doc.vue'),
                    props: true,
                },
                {
                    path: 'report',
                    name: 'projectDetailReportPage',
                    component: () => import('@/pages/project-detail-root/project-detail-report.vue'),
                    props: true,
                },
                {
                    path: 'sprint',
                    name: 'projectDetailSprintPage',
                    component: () => import('@/pages/project-detail-root/project-detail-sprint.vue'),
                    props: true,
                },
                {
                    path: 'tasks',
                    name: 'projectDetailTaskPage',
                    component: () => import('@/pages/project-detail-root/project-detail-root.vue'),
                    props: true,
                }
            ]
        },
        {
            path: '/project/:projectId/settings',
            redirect: '/project/:projectId/settings/detail',
            children: [
                {
                    path: 'detail',
                    name: 'projectSettingsDetailPage',
                    component: () => import('@/pages/project-settings-root/project-setting-detail.vue'),
                    props: true,
                },
                {
                    path: 'members',
                    name: 'projectSettingsMembersPage',
                    component: () => import('@/pages/project-settings-root/project-setting-members.vue'),
                    props: true,
                },
                {
                    path: 'webhook',
                    name: 'projectSettingsWebHookPage',
                    component: () => import('@/pages/project-settings-root/project-setting-web-hook.vue'),
                    props: true,
                },
                {
                    path: 'priorities',
                    name: 'projectSettingsPriorityPage',
                    component: () => import('@/pages/project-settings-root/project-setting-priorities.vue'),
                    props: true,
                },
                {
                    path: 'roles',
                    name: 'projectSettingsRolePage',
                    component: () => import('@/pages/project-settings-root/project-setting-roles.vue'),
                    props: true,
                },
                {
                    path: 'status',
                    name: 'projectSettingsStatusPage',
                    component: () => import('@/pages/project-settings-root/project-setting-status.vue'),
                    props: true,
                },
                {
                    path: 'types',
                    name: 'projectSettingsTypePage',
                    component: () => import('@/pages/project-settings-root/project-setting-types.vue'),
                    props: true,
                }
            ]
        }
    ]
})
