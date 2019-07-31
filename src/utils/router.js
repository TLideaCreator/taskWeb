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
            name: 'login',
            component: () => import('@/pages/login-page/login-page.vue')
        },
        {
            path: '/projects',
            name: 'projectsList',
            component: () => import('@/pages/dash-project-page/dash-project-page.vue')
        },
        {
            path: '/dash',
            name: 'adminDash',
            component: () => import('@/pages/admin-dash-root/admin-board-page.vue'),
        },
        {
            path: '/dash/users',
            name: 'dashUsers',
            component: () => import('@/pages/admin-dash-root/admin-board-page.vue'),
        },
        {
            path: '/dash/projects',
            name: 'dashProjects',
            component: () => import('@/pages/admin-dash-root/admin-board-page.vue'),
        },
        {
            path: '/dash/templates',
            name: 'dashTemps',
            component: () => import('@/pages/admin-dash-root/admin-board-template.vue'),
        },
        {
            path: '/dash/template/:templateId',
            component: () => import('@/pages/admin-template-root/admin-template-root.vue'),
            props:true,
            children:[
                {
                    path: 'detail',
                    name: 'templateDetail',
                    component: () => import('@/pages/admin-template-root/admin-template-detail.vue'),
                    props:true,
                },
                {
                    path: 'priorities',
                    name: 'templatePriorities',
                    component: () => import('@/pages/admin-template-root/admin-template-priorities.vue'),
                    props:true,
                },
                {
                    path: 'types',
                    name: 'templateTypes',
                    component: () => import('@/pages/admin-template-root/admin-template-types.vue'),
                    props:true,
                },
                {
                    path: 'status',
                    name: 'templateStatus',
                    component: () => import('@/pages/admin-template-root/admin-template-status.vue'),
                    props:true,
                },
                {
                    path: 'roles',
                    name: 'templateRoles',
                    component: () => import('@/pages/admin-template-root/admin-template-roles.vue'),
                    props:true,
                }
            ]
        },
        {
            path: '/project/:projectId',
            component: () => import('@/pages/project-detail-root/project-detail-root.vue'),
            props: true,
            children: [
                {
                    path: 'block',
                    name: 'projectBlock',
                    component: () => import('@/pages/project-detail-root/project-detail-block.vue'),
                    props: true,
                },
                {
                    path: 'deploy',
                    name: 'projectDeploy',
                    component: () => import('@/pages/project-detail-root/project-detail-deploy.vue'),
                    props: true,
                },
                {
                    path: 'doc',
                    name: 'projectDoc',
                    component: () => import('@/pages/project-detail-root/project-detail-doc.vue'),
                    props: true,
                },
                {
                    path: 'report',
                    name: 'projectReport',
                    component: () => import('@/pages/project-detail-root/project-detail-report.vue'),
                    props: true,
                },
                {
                    path: 'sprint',
                    name: 'projectSprint',
                    component: () => import('@/pages/project-detail-root/project-detail-sprint.vue'),
                    props: true,
                },
                {
                    path: 'tasks',
                    name: 'projectTasks',
                    component: () => import('@/pages/project-detail-root/project-detail-root.vue'),
                    props: true,
                }
            ]
        },
        {
            path: '/project/:projectId/settings',
            name: 'projectSettings',
            component: () => import('@/pages/project-settings-root/project-settings-root.vue'),
            props: true,
            children: [
                {
                    path: 'detail',
                    name: 'projectSettingsDetail',
                    component: () => import('@/pages/project-settings-root/project-setting-detail.vue'),
                    props: true,
                },
                {
                    path: 'members',
                    name: 'projectSettingsMembers',
                    component: () => import('@/pages/project-settings-root/project-setting-members.vue'),
                    props: true,
                },
                {
                    path: 'webhook',
                    name: 'projectSettingsWebHook',
                    component: () => import('@/pages/project-settings-root/project-setting-web-hook.vue'),
                    props: true,
                },
                {
                    path: 'priorities',
                    name: 'projectSettingsPriorities',
                    component: () => import('@/pages/project-settings-root/project-setting-priorities.vue'),
                    props: true,
                },
                {
                    path: 'roles',
                    name: 'projectSettingsRoles',
                    component: () => import('@/pages/project-settings-root/project-setting-roles.vue'),
                    props: true,
                },
                {
                    path: 'status',
                    name: 'projectSettingsStatus',
                    component: () => import('@/pages/project-settings-root/project-setting-status.vue'),
                    props: true,
                },
                {
                    path: 'types',
                    name: 'projectSettingsTypes',
                    component: () => import('@/pages/project-settings-root/project-setting-types.vue'),
                    props: true,
                }
            ]
        }
    ]
})
