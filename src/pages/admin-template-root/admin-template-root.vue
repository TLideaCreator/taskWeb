<template>
    <router-view></router-view>
</template>

<script>
    import api from '@/api';
    import {menus, router} from '@/utils';

    export default {
        name: "admin-template-root.vue",
        props: {
            templateId: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                drawer: false,
                mini: false,
                templateInfo: {},
                menus: menus.templateMenu,
                routerName: {}
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
                        text: '项目模板',
                        disabled: false,
                        href: '/dash/templates',
                    },
                    {
                        text: this.templateInfo.name,
                        disabled: true,
                        href: '',
                    },
                    {
                        text: val.meta.tag,
                        disable: true,
                        href: ''
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
                api.template.getDetail(this.templateId, template => {
                    this.templateInfo = template;
                    this.routerName =  router.currentRoute;
                })
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>
