<template>
    <router-view></router-view>
</template>

<script>
    import api from '@/api';
    import {menus, router} from '@/utils';

    export default {
        name: "project-settings-root.vue",
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
                menus: menus.templateMenu,
                routerName:{}
            }
        },
        beforeRouteUpdate(to, _, next) {
            this.routerName = to;
            next()
        },
        watch:{
            routerName(val){
                let items = [
                    {
                        text: '我的项目',
                        disabled: false,
                        href: '/projects',
                    },
                    {
                        text: this.projectInfo.name,
                        disabled: false,
                        href: `/project/${this.projectId}/block`,
                    },
                    {
                        text: '项目设置',
                        disabled: true,
                        href: ''
                    },
                    {
                        text: val.meta.tag,
                        disabled: true,
                        href: '',
                    }
                ];
                this.$store.commit('updatePathItems', items);
            }
        },
        created() {
            this.loadTemplateDetail();
        },
        methods: {
            loadTemplateDetail() {
                this.$store.commit('updatePathItems', []);
                api.project.getProjectDetailApi(this.projectId, project => {
                    this.projectInfo = project;
                    this.routerName =  router.currentRoute;
                })
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>
