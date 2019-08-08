<template>
   <router-view></router-view>
</template>

<script>
    import api from '@/api';
    import {menus, router} from '@/utils';

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
            }
        },
        mounted() {
            this.loadProjectDetail()
        },
        computed:{
            items(){
                return [
                    {
                        text: '我的项目',
                        disabled: false,
                        href: '/projects',
                    },
                    {
                        text: this.projectInfo.name,
                        disabled: true,
                        href: '',
                    }
                ]
            }
        },
        methods: {
            loadProjectDetail() {
                api.project.getProjectDetailApi(this.projectId, project => {
                    if(project){
                        this.projectInfo = project;
                        let menuList = this.$store.getters['getMenuList'];
                        if (project.mgr.data.id === this.$store.state.userInfo.id) {
                            menuList.push(menus.pMenuMgr)
                        }
                        this.$store.commit('updateDrawerMenuList',menuList);
                        this.$store.commit('updatePathItems',this.items)
                    }else {
                        router.replace({name: 'userProjectPage'})
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>
