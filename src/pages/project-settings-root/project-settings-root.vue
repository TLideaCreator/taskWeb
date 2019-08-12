<template>
    <router-view></router-view>
</template>

<script>
    import api from '@/api';
    import {menus, router} from '@/utils';

    export default {
        name: "admin-template-root.vue",
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
                routerName:''
            }
        },
        beforeRouteUpdate(to, _, next) {
            this.routerName = to.name;
            next()
        },
        watch:{
            routerName(val){
                let items = [
                    {
                        text: '项目设置',
                        disabled: false,
                        href: '/project/:projectId/settings/detail',
                    },
                    {
                        text: this.projectInfo.name,
                        disabled: true,
                        href: '',
                    }
                ];
                switch (val) {
                    case 'systemTempDetailPage':
                        items.push({
                            text: '详情',
                            disabled: true,
                            href: '',
                        });
                        break;
                    case 'systemTempRolePage':
                        items.push({
                            text: '角色',
                            disabled: true,
                            href: '',
                        });
                        break;
                    case 'systemTempStatusPage':
                        items.push({
                            text: '状态',
                            disabled: true,
                            href: '',
                        });
                        break;
                    case 'systemTempTypePage':
                        items.push({
                            text: '类型',
                            disabled: true,
                            href: '',
                        });
                        break;
                    case 'systemTempPriorityPage':
                        items.push({
                            text: '优先级',
                            disabled: true,
                            href: '',
                        });
                        break;
                }
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
                    this.routerName =  router.currentRoute.name;
                })
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>
