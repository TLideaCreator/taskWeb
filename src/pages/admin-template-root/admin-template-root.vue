<template>
    <v-layout fill-height>
        <v-navigation-drawer
                v-model="drawer"
                :mini-variant.sync="mini"
                permanent
        >
            <v-list shaped>
                <v-list-item
                        v-for="(menu, index) in menus"
                        :key="index"
                        :replace="true"
                        :to="{name:menu.path, params:{templateId:templateId}}"
                >
                    <v-list-item-icon>
                        <v-icon>{{menu.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{menu.title}}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <v-btn style="width: 100%" text @click="mini = !mini">
                    <v-icon>{{mini? 'keyboard_arrow_left': 'keyboard_arrow_right'}}</v-icon>
                    {{mini ? '': '收起'}}
                </v-btn>
            </template>
        </v-navigation-drawer>
        <v-content class="contentLayout">
            <v-breadcrumbs :items="items">
                <template v-slot:divider>
                    <v-icon>chevron_right</v-icon>
                </template>
            </v-breadcrumbs>
            <v-divider></v-divider>
            <router-view></router-view>
        </v-content>
    </v-layout>
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
                routerName: router.currentRoute.name
            }
        },
        beforeRouteUpdate(to, _, next){
            this.routerName = to.name;
            next()
        },
        computed: {
            items() {
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
                switch (this.routerName) {
                    case 'templateDetail':
                        items.push({
                            text: '详情',
                            disabled: true,
                            href: '',
                        });
                        break;
                    case 'templateRoles':
                        items.push({
                            text: '角色',
                            disabled: true,
                            href: '',
                        });
                        break;
                    case 'templateStatus':
                        items.push({
                            text: '状态',
                            disabled: true,
                            href: '',
                        });
                        break;
                    case 'templateTypes':
                        items.push({
                            text: '类型',
                            disabled: true,
                            href: '',
                        });
                        break;
                    case 'templatePriorities':
                        items.push({
                            text: '优先级',
                            disabled: true,
                            href: '',
                        });
                        break;
                }
                return items;
            }
        },
        created() {
            this.loadTemplateDetail();
        },
        methods: {
            loadTemplateDetail() {
                api.template.getTemplateDetail(this.templateId, template => {
                    this.templateInfo = template;
                })
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>
