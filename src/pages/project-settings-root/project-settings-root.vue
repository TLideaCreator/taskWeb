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
                        :to="{name:menu.path, param:projectId}"
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
        <router-view></router-view>
    </v-layout>
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
                menus: menus.projectSettingMenu,
                routerName: router.currentRoute.name
            }
        },
        created() {
            this.loadProjectDetail()
        },
        methods: {
            loadProjectDetail() {
                api.project.getProjectDetailApi(this.projectId, project => {
                    this.projectInfo = project;
                    if (project.mgr.data.id !== this.$store.state.userInfo.id) {
                        router.replace({name: 'systemTempDetailPage'})
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>
