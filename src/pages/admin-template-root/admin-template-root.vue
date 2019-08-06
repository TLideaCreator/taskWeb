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
                        text: '项目模板',
                        disabled: false,
                        href: '/dash/templates',
                    },
                    {
                        text: this.templateInfo.name,
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
                api.template.getDetail(this.templateId, template => {
                    this.templateInfo = template;
                    this.routerName =  router.currentRoute.name;
                })
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>
