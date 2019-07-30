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
            path: '/project/:projectId',
            component: () => import('@/pages/project-detail-root/project-detail-root.vue'),
            props: true,
            children:[
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
