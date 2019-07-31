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
                        :to="{name:menu.path}"
                >
                    <v-list-item-icon>
                        <v-icon>{{menu.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{menu.title}}
                        </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action v-show="menu.type === 'more'">
                        <v-icon>arrow_right</v-icon>
                    </v-list-item-action>
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
            <router-view></router-view>
        </v-content>
    </v-layout>
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
                menus: menus.menus,
                routerName: router.currentRoute.name
            }
        },
        created() {
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
                    this.projectInfo = project;
                    if (project.mgr.data.id === this.$store.state.userInfo.id) {
                        this.menus.push(menus.pMenuMgr)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>
