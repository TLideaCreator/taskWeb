<template>
    <router-view></router-view>
</template>

<script>
    import api from '@/api';
    import {menus, router,consts} from '@/utils';

    export default {
        name: "project-detail-root.vue",
        props: {
            projectId: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                drawer: false,
                mini: false,
                projectInfo: {},
                routerName: ''
            }
        },
        beforeRouteUpdate(to, _, next) {
            this.routerName = to.name;
            next()
        },
        mounted() {
            this.loadProjectDetail()
        },
        computed: {
            items() {
               return [
                    {
                        text: '我的项目',
                        disabled: false,
                        href: '/projects',
                    },
                    {
                        text: this.projectInfo.name,
                        disabled: true,
                        href: `/project/${this.projectId}/block`,
                    }
                ];
            }
        },
        watch:{
           routerName(val){
              let projectAble = val !== 'projectDetailTaskDetailPage';
              let items = consts.objectCopy(this.items);
              items[1].disabled = projectAble;
              if (!projectAble) {
                 items.push({
                    text: '任务详情',
                    disabled: true,
                    href: ''
                 })
              }
              this.$store.commit('updatePathItems', items)
           }
        },
        methods: {
            loadProjectDetail() {
                api.project.getProjectDetailApi(this.projectId, project => {
                    if (project) {
                        this.projectInfo = project;
                        let menuList = this.$store.getters['getMenuList'];
                        if (project.mgr.data.id === this.$store.state.userInfo.id) {
                            menuList.push(menus.pMenuMgr)
                        }
                        this.$store.commit('updateDrawerMenuList', menuList);
                        this.$store.commit('updatePathItems', this.items)
                    } else {
                        router.replace({name: 'userProjectPage'})
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>
