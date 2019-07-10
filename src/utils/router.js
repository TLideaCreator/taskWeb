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
            path: '/dash',
            component: () => import('@/pages/dash-root-page/dash-root-page.vue'),
            children:[
                {
                    path: 'projects',
                    name: 'project',
                    component: () => import('@/pages/dash-group/dash-project-page/dash-project-page.vue')
                },
                {
                    path: 'users',
                    name: 'user',
                    component: () => import('@/pages/dash-group/dash-user-page/user-page.vue')
                },
            ]
        },
        {
            path: '/projects/create',
            name: 'project-create',
            component: () => import('@/pages/project-group/project-setting-page/project-setting-page.vue')
        },
        {
            path: '/projects/:id',
            name: 'project-group',
            component: () => import('@/pages/project-group/project-root-page/project-root-page.vue'),
            children: [
                {
                    path: 'settings',
                    name: 'project-setting',
                    component: () => import('@/pages/project-group/project-setting-page/project-setting-page.vue')
                },
                {
                    path: 'settings/members',
                    name: 'project-setting-member',
                    component: () => import('@/pages/project-group/project-setting-member-page/project-setting-member-page.vue')
                },
                {
                    path: 'settings/status',
                    name: 'project-setting-status',
                    component: () => import('@/pages/project-group/project-setting-status-page/project-setting-status-page.vue')
                },
                {
                    path: 'settings/types',
                    name: 'project-setting-type',
                    component: () => import('@/pages/project-group/project-setting-type-page/project-setting-type-page.vue')
                },
                {
                    path: 'settings/priorities',
                    name: 'project-setting-priority',
                    component: () => import('@/pages/project-group/project-setting-priority-page/project-setting-priority-page.vue')
                },
                {
                    path: 'documents',
                    name: 'project-doc',
                    component: () => import('@/pages/project-group/project-doc-page/project-doc-page.vue')
                },
                {
                    path: 'working',
                    name: 'project-working',
                    component: () => import('@/pages/project-group/project-working-page/project-working-page.vue')
                },
                {
                    path: 'stats',
                    name: 'project-stats',
                    component: () => import('@/pages/project-group/project-stats-page/project-stats-page.vue')
                },
                {
                    path: 'deploy',
                    name: 'project-deploy',
                    component: () => import('@/pages/project-group/project-deploy-page/project-deploy-page.vue')
                },
                {
                    path: 'backlog',
                    name: 'project-backlog',
                    component: () => import('@/pages/project-group/project-backlog-page/project-backlog-page.vue')
                },
                {
                    path: 'tasks',
                    name: 'project-tasks',
                    component: () => import('@/pages/project-group/project-task-page/project-task-page.vue')
                },
                {
                    path: 'tasks/:taskId',
                    name: 'project-task-detail',
                    component: () => import('@/pages/project-group/project-task-detail-page/project-task-detail-page.vue')
                },
                {
                    path: 'sprints',
                    name: 'project-sprints',
                    component: () => import('@/pages/project-group/project-sprint-page/project-sprint-page.vue')
                }
            ]
        }
    ]
})
